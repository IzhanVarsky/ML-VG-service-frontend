import {
  ActionIcon,
  Button,
  Center,
  Checkbox,
  ColorInput,
  Grid,
  Group,
  Loader,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { BarrierBlock, Palette, Refresh, Shadow, } from 'tabler-icons-react';
import { extractColors } from "~/download_utils";
import { addRectBefore, addShadowFilter, changeAllColors, changeColorByIndex } from '~/utils';
import { Dropzone } from '@mantine/dropzone';
import { useState } from "react";
import { getSVGAndColorsState } from "~/svg_checkers_transformers";

const randomColor = () => {
  const rgba = [];
  for (let i = 0; i < 3; i++) {
    rgba.push(Math.floor(Math.random() * 255));
  }
  rgba.push(Math.random().toFixed(2));
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`
};

export default function EditOptionsTabPanel({
                                              state, setState,
                                              isColorFindingEnabled, setIsColorFindingEnabled
                                            }) {
  const [isDropZoneLoading, setIsDropZoneLoading] = useState(false);
  const [isColorsLoading, setIsColorsLoading] = useState(false);

  const updWithNewColors = (newColors) => {
    const newSVG = changeAllColors(state.svg, newColors);
    const newColorsState = newColors.map((el, i) => ({ attr: state.colors[i].attr, value: el }));
    setState({
      svg: newSVG,
      colors: newColorsState
    })
  }

  const updateSVGWithColors = async (svg, findColors = isColorFindingEnabled) => {
    console.log("isColorFindingEnabled:", findColors);
    setState(getSVGAndColorsState(svg, findColors));
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

  return (
    <Stack style={{ height: '70vh' }}>
      {isColorsLoading ?
        <Loader size="md"/>
        :
        <Checkbox checked={isColorFindingEnabled}
                  label="Find used colors"
                  size='md'
                  style={{
                    textAlign: 'right',
                    width: 'max-content',
                  }}
                  onChange={(event) => {
                    let checked = event.currentTarget.checked;
                    setIsColorFindingEnabled(checked);
                    if (checked) {
                      setIsColorsLoading(true);
                      setTimeout(() => {
                        updateSVGWithColors(state.svg, true).then(r =>
                          setIsColorsLoading(false)
                        )
                      }, 200);
                    }
                  }}/>
      }
      {isColorFindingEnabled ?
        state.colors.length !== 0 ?
          <>
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
              // TODO: NO SVGS! OR add SUPPORT!
              accept={["image/*"]}
              loading={isDropZoneLoading}
              onDrop={(files) => {
                setIsDropZoneLoading(true);
                extractColors(files[0], state.colors.length, newColors => {
                  updWithNewColors(newColors);
                  setIsDropZoneLoading(false)
                }, () => setIsDropZoneLoading(false));
              }}>
              <Group style={{ pointerEvents: 'none' }}>
                <Palette color='grey'/>
                <Text color='grey'>Drop image to style transfer</Text>
              </Group>
            </Dropzone>
          </>
          :
          <>
            <Center>
              <Text>--- No colors found on the image ---</Text>
            </Center>
          </>
        :
        <></>
      }
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