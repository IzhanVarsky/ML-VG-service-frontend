import {
  ActionIcon,
  Button,
  Center,
  ColorInput,
  Grid,
  Group,
  NumberInput,
  ScrollArea,
  Stack,
  Tabs,
  Text,
  Textarea,
} from '@mantine/core';
import { optimize } from 'svgo';
import {
  AdjustmentsAlt,
  Axe,
  BarrierBlock,
  Braces,
  Download,
  FileText,
  LayoutBoardSplit,
  Palette,
  Refresh,
  Shadow,
} from 'tabler-icons-react';
import { downloadPNGFromServer, downloadTextFile, extractColors, getJSON } from "~/download_utils";
import { applyTransformsFromStr } from "~/flatten_transforms";
import { flattenedGroups } from "~/flatten_groups";
import {
  addRectBefore,
  addShadowFilter,
  changeAllColors,
  changeColorByIndex,
  getColors,
  getSVGSize,
  prettifyXml,
  svgWithSize
} from '~/utils';
import { useState } from 'react';
import { Dropzone } from '@mantine/dropzone';

const randomColor = () => {
  const rgba = [];
  for (let i = 0; i < 3; i++) {
    rgba.push(Math.floor(Math.random() * 255));
  }
  rgba.push(Math.random().toFixed(2));
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`
};

export default function EditorTabs({ state, setState }) {
  const [activeTab, setActiveTab] = useState("Edit Options");
  const [imageWidthToDownload, setImageWidthToDownload] = useState(getSVGSize(state.svg).w);
  const [imageHeightToDownload, setImageHeightToDownload] = useState(getSVGSize(state.svg).h);
  const [isLoading, setIsLoading] = useState(false);

  const updCoverNotPrettified = (svg) => {
    // For textarea only
    let colors;
    if (prettifyXml(svg).includes('parsererror')) {
      colors = state.colors;
    } else {
      try {
        colors = getColors(svg);
      } catch (e) {
        colors = state.colors
      }
    }
    setState({
      svg,
      colors,
    })
  }

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

  const tryUpdateStateWithPrettified = () => {
    let p = prettifyXml(state.svg);
    // TODO: no parsererror!
    if (p.includes('parsererror')) {
      return
    }
    setState({
      svg: p,
      colors: state.colors
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

  const optimizeSVG = function () {
    const result = optimize(state.svg);
    updCoverNotPrettified(result.data);
  }

  const flattenGroups = function () {
    let res = flattenedGroups(state.svg);
    updCoverNotPrettified(res);
  }

  const applyTransforms = function () {
    updCoverNotPrettified(applyTransformsFromStr(state.svg));
  }

  const removeGroupsApplyTransformsOptimize = () => {
    let res1 = flattenedGroups(state.svg);
    let res2 = applyTransformsFromStr(res1);
    let res3 = optimize(res2);
    updCoverNotPrettified(res3.data);
  }

  return (
    <Tabs value={activeTab}
          onTabChange={(active: string) => {
            if (active == 'Download') {
              let svgSize = getSVGSize(state.svg);
              setImageWidthToDownload(svgSize.w);
              setImageHeightToDownload(svgSize.h);
            }
            if (active != 'Prettify SVG') {
              setActiveTab(active);
            }
          }}
    >
      <Tabs.List grow style={{ marginBottom: '12px' }}>
        <Tabs.Tab value={"Edit Options"}
                  icon={<AdjustmentsAlt size={14}/>}
                  style={{ color: activeTab == 'Edit Options' ? '#228be6' : '' }}
        >
          Edit Options
        </Tabs.Tab>
        <Tabs.Tab value={"Edit Raw SVG"}
                  style={{ color: activeTab == 'Edit Raw SVG' ? '#228be6' : '' }}
                  icon={<FileText size={14}/>}>Edit Raw SVG</Tabs.Tab>
        <Tabs.Tab value={"Download"}
                  style={{ color: activeTab == 'Download' ? '#228be6' : '' }}
                  icon={<Download size={14}/>}>Download</Tabs.Tab>
        <Tabs.Tab value={"Prettify SVG"}
                  style={{ pointerEvents: 'none' }} icon={
          <Button component="span" variant="outline"
                  style={{ pointerEvents: 'all' }}
                  onClick={() => tryUpdateStateWithPrettified()}>
            <Center style={{
              height: "inherit",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>Prettify SVG</Center>
          </Button>
        }/>
        <Tabs.Tab value={"Optimizations"}
                  style={{ color: activeTab == 'Optimizations' ? '#228be6' : '' }}
                  icon={<Axe size={14}/>}>Optimizations</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Edit Options">
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
      </Tabs.Panel>
      <Tabs.Panel value="Edit Raw SVG">
        <Textarea
          autoFocus={true}
          placeholder='Write SVG . . .'
          style={{ minHeight: '70vh' }}
          minRows={10}
          maxRows={21}
          autosize
          value={state.svg}
          onChange={event => updCoverNotPrettified(event.currentTarget.value)}
        />
      </Tabs.Panel>
      <Tabs.Panel value="Download">
        <Stack style={{
          padding: '0 25%',
          justifyContent: 'flex-start', minHeight: '70vh'
        }}>
          <Grid justify="space-around" align="center">
            <NumberInput
              value={imageWidthToDownload}
              onChange={(val) => setImageWidthToDownload(val)}
              min={0}
              max={10000}
              placeholder="Image width"
              label="Image width"
              style={{ width: '40%' }}
              required
            />
            <NumberInput
              value={imageHeightToDownload}
              onChange={(val) => setImageHeightToDownload(val)}
              min={0}
              max={10000}
              placeholder="Image height"
              label="Image height"
              style={{ width: '40%' }}
              required
            />
          </Grid>
          <Button
            leftIcon={<LayoutBoardSplit size={14}/>}
            onClick={() =>
              downloadTextFile(svgWithSize(state.svg, imageWidthToDownload, imageHeightToDownload),
                "edited.svg")}
          >
            Download SVG
          </Button>
          <Button
            leftIcon={<Palette size={14}/>}
            onClick={() =>
              downloadPNGFromServer(svgWithSize(state.svg, imageWidthToDownload, imageHeightToDownload))}
          >
            Download PNG
          </Button>
          <Button
            leftIcon={<Braces size={14}/>}
            onClick={() => getJSON(svgWithSize(state.svg, imageWidthToDownload))}
          >
            Download JSON
          </Button>
        </Stack>
      </Tabs.Panel>
      <Tabs.Panel value="Optimizations">
        <Stack style={{
          padding: '0 25%',
          justifyContent: 'flex-start', minHeight: '70vh'
        }}>
          <Button component="span" variant="outline"
                  style={{ pointerEvents: 'all' }}
                  onClick={() => optimizeSVG()}>
            <Center style={{
              height: "inherit",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>Optimize (SVGO)</Center>
          </Button>
          <Button component="span" variant="outline"
                  style={{ pointerEvents: 'all' }}
                  onClick={() => flattenGroups()}>
            <Center style={{
              height: "inherit",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>Flatten Transforms from groups + remove groups</Center>
          </Button>
          <Button component="span" variant="outline"
                  style={{ pointerEvents: 'all' }}
                  onClick={() => applyTransforms()}>
            <Center style={{
              height: "inherit",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>Apply Transformations</Center>
          </Button>
          <Button component="span" variant="outline"
                  style={{ pointerEvents: 'all' }}
                  onClick={() => removeGroupsApplyTransformsOptimize()}>
            <Center style={{
              height: "inherit",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>Remove groups, apply transforms, optimize</Center>
          </Button>
        </Stack>
      </Tabs.Panel>
    </Tabs>
  )
}