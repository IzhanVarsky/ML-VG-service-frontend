import {
  Stack,
  Grid,
  InputWrapper,
  ColorInput,
  Textarea,
  Tabs, Button,
  Text,
} from '@mantine/core';
import Shape from '~/components/Shape';
import { Link, useOutletContext } from '@remix-run/react';
import { AdjustmentsAlt, FileText, Palette, Braces } from 'tabler-icons-react';
import { getJSON, extractColors, downloadPNGFromServer } from "~/download_utils";
import { getColors, addRectBefore } from '~/utils';
import SVG from './SVG';
import { useEffect } from 'react';
import { Dropzone } from '@mantine/dropzone';
import useHistoryState from '~/HistoryState';

export default function Main() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();
  const [state, setState, undo, redo, history] = useHistoryState({
    svg: covers[selectedCover].svg,
    colors: [],
  });

  const setColors = (colors) => {
    setState({
      svg: state.svg,
      colors,
    })
  }

  const setCover = (svg) => {
    setState({
      svg,
      colors: state.colors,
    })
  }

  const updateColor = (oldColor) => (newColor) => {
    setState({
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
        <Button m='md'>
          Go back
        </Button>
      </Link>
      <Button m='md' onClick={() => { undo(); console.log(history) }}>
        Undo
      </Button>
      <Button m='md' onClick={() => { redo(); console.log(history) }}>
        Redo
      </Button>
      <Grid justify='space-around' columns={2}>
        <Grid.Col span={1}>
          <SVG svg={state.svg} />
        </Grid.Col>
        <Grid.Col span={1}>
          <Tabs>
            <Tabs.Tab label="Edit options" icon={<AdjustmentsAlt size={14} />}>
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
                    onDrop={(files) => {
                      let oldCover = state.svg + '';
                      extractColors(files[0], state.colors.length, newColors => {
                        state.colors.forEach((oldColor, index) => {
                          oldCover = oldCover.replace(oldColor, newColors[index]);
                        });
                        setState({
                          svg: oldCover,
                          colors: newColors,
                        });
                      });
                    }}>
                    {() => <Text color='grey'>Drop image to style transfer</Text>}
                  </Dropzone>
                  <Button onClick={() => {
                    const { svg: newSVG, color: newColor } = addRectBefore(state.svg);
                    setState({
                      svg: newSVG,
                      colors: [...state.colors, newColor],
                    })
                  }}>
                    Add filter
                  </Button>
                </Stack>
              </InputWrapper>
            </Tabs.Tab>
            <Tabs.Tab label="Edit raw svg" icon={<FileText size={14} />}>
              <Textarea
                minRows={30}
                minLength={50}
                value={state.svg}
                onChange={event => setCover(event.currentTarget.value)}
              />
            </Tabs.Tab>
            <Tabs.Tab label="PNG (rasterize)" icon={<Palette size={14} />}>
              <Button onClick={() => downloadPNGFromServer(state.svg)}>Download</Button>
            </Tabs.Tab>
            <Tabs.Tab label="To JSON" icon={<Braces size={14} />}>
              <Button onClick={() => getJSON(state.svg)}>Download JSON</Button>
            </Tabs.Tab>
          </Tabs>
        </Grid.Col>
      </Grid>
    </Shape >
  )
}
