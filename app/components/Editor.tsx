import {
  Button,
  Center,
  ColorInput,
  Grid,
  Group,
  ScrollArea,
  Stack,
  Tabs,
  Text,
  Textarea,
  NumberInput,
  ActionIcon
} from '@mantine/core';
import Shape from '~/components/Shape';
import {Link, useOutletContext} from '@remix-run/react';
import {
  AdjustmentsAlt,
  ArrowBackUp,
  ArrowBigLeft,
  ArrowForwardUp,
  Braces,
  Download,
  FileText,
  Palette,
  LayoutBoardSplit,
} from 'tabler-icons-react';
import {downloadPNGFromServer, downloadTextFile, extractColors, getJSON} from "~/download_utils";
import {addRectBefore, getColors, prettifyXml, getSVGSize, svgWithSize, changeColorByIndex, changeAllColors} from '~/utils';
import SVG from './SVG';
import {useState} from 'react';
import {Dropzone} from '@mantine/dropzone';
import useHistoryState from '~/HistoryState';
import { Refresh } from 'tabler-icons-react';

const randomColor = () => {
  let rgba = [];
  for (let i = 0; i < 3; i++) {
    rgba.push(Math.floor(Math.random() * 255));
  }
  rgba.push(Math.random().toFixed(2));
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`
};

export default function Main() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState, undo, redo] = useHistoryState(covers.length ? {
    svg: prettifyXml(covers[selectedCover].svg),
    colors: getColors(covers[selectedCover].svg),
  } : {svg: '', colors: []});
  const [imageSizeToDownload, setImageSizeToDownload] = useState(getSVGSize(state.svg).w);

  const updateState = (s) => {
    setState({
      svg: s.svg,
      colors: s.colors
    })
  }

  const updCover = (svg) => {
    let prettified = prettifyXml(svg);
    let colors;
    if (prettified.includes('parsererror')) {
      prettified = svg;
      colors = state.colors;
    } else {
      colors = getColors(svg);
    }

    updateState({
      svg,
      colors,
    })
  }

  const updateColor = (oldColor) => (newColor) => {
    console.log("oldColor", oldColor, "newcolor", newColor)
    updateState({
      svg: state.svg.replace(oldColor, newColor),
      colors: state.colors.map(c => c === oldColor ? newColor : c),
    });
  }

  const updateColorByIndex = (ind) => (newColor) => {
    console.log("ind", ind, "newcolor", newColor)
    let newsvg = changeColorByIndex(state.svg, ind, newColor);
    updateState({
      svg: newsvg,
      colors: state.colors.map((c, i) => i === ind ? newColor : c),
    });
  }

  const shuffleColors = () => {
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    let newColors = state.colors;
    shuffle(newColors);
    let svg = changeAllColors(state.svg, newColors);
    updateState({
      svg,
      colors: newColors
    })
  }

  return (
    <>
      <Link to="/">
        <Button m='md' leftIcon={<ArrowBigLeft/>} style={{margin: 5, marginLeft: 16}}>
          Go back
        </Button>
      </Link>
      <Shape>
        <Grid justify='space-around' align="center" columns={2}>
          <Grid.Col span={1}>
            <Center>
              <SVG svg={state.svg}/>
            </Center>
            <Center>
              <Button m='md'
                      onClick={undo}
                      leftIcon={<ArrowBackUp/>}
              >
                Undo
              </Button>
              <Button m='md'
                      onClick={redo}
                      leftIcon={<ArrowForwardUp/>}
              >
                Redo
              </Button>
            </Center>
          </Grid.Col>
          <Grid.Col span={1}>
            <Tabs>
              <Tabs.Tab label="Edit Options" icon={<AdjustmentsAlt size={14}/>}>
                <Stack style={{height: '70vh'}}>
                  <ScrollArea>
                    {state.colors.map((color, index) =>
                      <Center key={index}>
                        <ColorInput
                          style={{margin: '10px', width: '50%'}}
                          value={color}
                          format='rgba'
                          // onChange={updateColor(color)}
                          onChange={updateColorByIndex(index)}
                          rightSection={
                            <ActionIcon onClick={() => updateColor(color)(randomColor())}>
                              <Refresh size={16} />
                            </ActionIcon>
                          }
                        />
                      </Center>
                    )}
                  </ScrollArea>
                  <Button
                    style={{ minHeight: '5vh' }}
                    onClick={shuffleColors}
                  >
                    Shuffle colors
                  </Button>
                  <Dropzone
                    multiple={false}
                    accept={["image/*"]}
                    loading={isLoading}
                    onDrop={(files) => {
                      setIsLoading(true)
                      let oldCover = state.svg + '';
                      extractColors(files[0], state.colors.length, newColors => {
                        state.colors.forEach((oldColor, index) => {
                          oldCover = oldCover.replace(oldColor, newColors[index]);
                        });
                        updateState({
                          svg: oldCover,
                          colors: newColors,
                        });
                        setIsLoading(false)
                      }, () => setIsLoading(false));
                    }}>
                    {() =>
                      <Group style={{pointerEvents: 'none'}}>
                        <Palette color='grey'/>
                        <Text color='grey'>Drop image to style transfer</Text>
                      </Group>
                    }
                  </Dropzone>
                  <Button
                    style={{minHeight: '5vh'}}
                    onClick={() => {
                      const {svg: newSVG, color: newColor} = addRectBefore(state.svg);
                      updCover(newSVG);
                      // updateState({
                      //   svg: newSVG,
                      //   colors: [...state.colors, newColor],
                      // })
                    }}>
                    Add filter
                  </Button>
                </Stack>
              </Tabs.Tab>
              <Tabs.Tab label="Edit Raw SVG" icon={<FileText size={14}/>}>
                <Textarea
                  placeholder='Write SVG . . .'
                  style={{minHeight: '70vh'}}
                  minRows={10}
                  maxRows={21}
                  autosize
                  value={state.svg}
                  onChange={event => updCover(event.currentTarget.value)}
                />
              </Tabs.Tab>
              <Tabs.Tab label="Download" icon={<Download size={14}/>}>
                <Stack style={{
                  padding: '0 25%',
                  justifyContent: 'center', minHeight: '70vh'
                }}>
                  <NumberInput
                    defaultValue={imageSizeToDownload}
                    onChange={(val) => setImageSizeToDownload(val)}
                    placeholder="Image size"
                    label="Image size"
                    required
                  />
                  <Button
                    leftIcon={<LayoutBoardSplit size={14}/>}
                    onClick={() => downloadTextFile(svgWithSize(state.svg, imageSizeToDownload), "edited.svg")}
                  >
                    Download SVG
                  </Button>
                  <Button
                    leftIcon={<Palette size={14}/>}
                    onClick={() => downloadPNGFromServer(svgWithSize(state.svg, imageSizeToDownload))}
                  >
                    Download PNG
                  </Button>
                  <Button
                    leftIcon={<Braces size={14}/>}
                    onClick={() => getJSON(svgWithSize(state.svg, imageSizeToDownload))}
                  >
                    Download JSON
                  </Button>
                </Stack>
              </Tabs.Tab>
            </Tabs>
          </Grid.Col>
        </Grid>
      </Shape>
    </>)
}
