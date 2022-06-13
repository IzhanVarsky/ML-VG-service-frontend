import {Button, ColorInput, Grid, Group, InputWrapper, Stack, Tabs, Text, Textarea,} from '@mantine/core';
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
  Palette
} from 'tabler-icons-react';
import {downloadPNGFromServer, downloadTextFile, extractColors, getJSON} from "~/download_utils";
import {addRectBefore, getColors, prettifyXml} from '~/utils';
import SVG from './SVG';
import {useEffect, useState} from 'react';
import {Dropzone} from '@mantine/dropzone';
import useHistoryState from '~/HistoryState';

export default function Main() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState, undo, redo, history] = useHistoryState({
    svg: prettifyXml(covers[selectedCover].svg),
    colors: [],
  });

  const updateState = (value) => {
    setState({
      svg: prettifyXml(value.svg),
      colors: value.colors
    })
  }

  const setColors = (colors) => {
    updateState({
      svg: state.svg,
      colors,
    })
  }

  const setCover = (svg) => {
    updateState({
      svg,
      colors: state.colors,
    })
  }

  const updateColor = (oldColor) => (newColor) => {
    updateState({
      svg: state.svg.replace(oldColor, newColor),
      colors: state.colors.map(c => c === oldColor ? newColor : c),
    });
  }

  useEffect(() => {
    getJSON(state.svg, (svg) => setColors(getColors(svg)));
  }, []);

  return (
    <Shape>
      <Link to="/">
        <Button m='md' leftIcon={<ArrowBigLeft/>}>
          Go back
        </Button>
      </Link>
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
      <Button m='md'
              onClick={() => downloadTextFile(state.svg, "edited.svg")}
              leftIcon={<Download/>}
      >
        Download SVG
      </Button>
      <Grid justify='space-around' columns={2}>
        <Grid.Col span={1}>
          <SVG svg={state.svg}/>
        </Grid.Col>
        <Grid.Col span={1}>
          <Tabs>
            <Tabs.Tab label="Edit Options" icon={<AdjustmentsAlt size={14}/>}>
              <InputWrapper label="Colors">
                <Stack>
                  {state.colors.map((color, index) =>
                    <ColorInput
                      key={index}
                      value={color}
                      format='rgb' // TODO: change to rgba
                      onChange={updateColor(color)}
                    />
                  )
                  }
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
                  <Button onClick={() => {
                    const {svg: newSVG, color: newColor} = addRectBefore(state.svg);
                    updateState({
                      svg: newSVG,
                      colors: [...state.colors, newColor],
                    })
                  }}>
                    Add filter
                  </Button>
                </Stack>
              </InputWrapper>
            </Tabs.Tab>
            <Tabs.Tab label="Edit Raw SVG" icon={<FileText size={14}/>}>
              <Textarea
                minRows={30}
                minLength={50}
                value={state.svg}
                onChange={event => setCover(event.currentTarget.value)}
              />
            </Tabs.Tab>
            <Tabs.Tab label="PNG (rasterize)" icon={<Palette size={14}/>}>
              <Button onClick={() => downloadPNGFromServer(state.svg)}>Download</Button>
            </Tabs.Tab>
            <Tabs.Tab label="To JSON" icon={<Braces size={14}/>}>
              <Button onClick={() => getJSON(state.svg)}>Download JSON</Button>
            </Tabs.Tab>
          </Tabs>
        </Grid.Col>
      </Grid>
    </Shape>
  )
}
