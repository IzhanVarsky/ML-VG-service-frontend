import { ActionIcon, Button, Center, ColorInput, Grid, Group, ScrollArea, Stack, Text, } from '@mantine/core';
import { BarrierBlock, Palette, Refresh, Shadow, } from 'tabler-icons-react';
import { extractColors } from "~/download_utils";
import { addRectBefore, addShadowFilter, changeAllColors, changeColorByIndex, getColors, prettifyXml } from '~/utils';
import { Dropzone } from '@mantine/dropzone';
import { useState } from "react";

const randomColor = () => {
  const rgba = [];
  for (let i = 0; i < 3; i++) {
    rgba.push(Math.floor(Math.random() * 255));
  }
  rgba.push(Math.random().toFixed(2));
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`
};

export default function EditOptionsTabPanel({ state, setState }) {
  const [isLoading, setIsLoading] = useState(false);

  const updWithNewColors = (newColors) => {
    const newSVG = changeAllColors(state.svg, newColors);
    const newColorsState = newColors.map((el, i) => ({ attr: state.colors[i].attr, value: el }));
    setState({
      svg: newSVG,
      colors: newColorsState
    })
  }

  const updateStatePrettified = (newState) => {
    setState({
      svg: prettifyXml(newState.svg),
      colors: newState.colors
    })
  }

  const updateSVGWithColors = (svg) => {
    setState({
      svg,
      colors: getColors(svg)
    })
  }

  const updateColorByIndex = (ind) => (newColor) => {
    setState({
      svg: changeColorByIndex(state.svg, ind, newColor),
      colors: state.colors.map((el, i) => i === ind ? { attr: el.attr, value: newColor } : el),
    });
  }

  const shuffleColors = () => {
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    const newColors = state.colors.map((el, i) => el.value);
    shuffle(newColors);
    updWithNewColors(newColors);
  }

  const preprocessSVGToRender = (svg) => {
    if (svg.trim() == "") {
      return "Error: SVG is empty"
    }
    try {
      let parsed = $(svg);
      if (parsed.prop("tagName") == "svg") {
        return svg
      }
      return "Error: Incorrect SVG"
    } catch (e) {
      return "Error: Couldn't parse SVG"
    }
  }

  return (
    <Stack style={{ height: '70vh' }}>
      <ScrollArea>
        {state.colors.map((color, index) =>
          <Center key={index}>
            <Text>{color.attr}:</Text>
            <ColorInput
              style={{ margin: '10px', width: '50%' }}
              value={color.value}
              format='rgba'
              onChange={updateColorByIndex(index)}
              rightSection={
                <ActionIcon onClick={() => updateColorByIndex(index)(randomColor())}>
                  <Refresh size={16}/>
                </ActionIcon>
              }
            />
          </Center>
        )}
      </ScrollArea>
      <Grid>
        <Grid.Col>
          <Button leftIcon={<Refresh size={20}/>} onClick={shuffleColors} style={{ width: '100%' }}>
            Shuffle All Colors
          </Button>
        </Grid.Col>
      </Grid>
      <Dropzone
        multiple={false}
        accept={["image/*"]}
        loading={isLoading}
        onDrop={(files) => {
          setIsLoading(true)
          extractColors(files[0], state.colors.length, newColors => {
            updWithNewColors(newColors);
            setIsLoading(false)
          }, () => setIsLoading(false));
        }}>
        <Group style={{ pointerEvents: 'none' }}>
          <Palette color='grey'/>
          <Text color='grey'>Drop image to style transfer</Text>
        </Group>
      </Dropzone>
      <Grid justify={'center'} align={'center'}>
        <Grid.Col span={4}>
          <Center>
            <Button
              leftIcon={<Shadow size={20}/>}
              onClick={() => updateSVGWithColors(addShadowFilter(state.svg))}>
              Add Shadow Filter
            </Button>
          </Center>
        </Grid.Col>
        <Grid.Col span={4}>
          <Center>
            <Button
              leftIcon={<BarrierBlock size={20}/>}
              onClick={() => updateSVGWithColors(addRectBefore(state.svg))}>
              Add Color Filter
            </Button>
          </Center>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}