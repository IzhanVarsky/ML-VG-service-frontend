import { Button, Center, Grid, Group, Text, } from '@mantine/core';
import Shape from '~/components/Shape';
import EditorTabs from '~/components/EditorTabs';
import { Link, useOutletContext } from '@remix-run/react';
import { ArrowBackUp, ArrowBigLeft, ArrowForwardUp, LayoutBoardSplit, Trash, } from 'tabler-icons-react';
import { getColors, prettifyXml } from '~/utils';
import { Dropzone } from '@mantine/dropzone';
import useHistoryState from '~/HistoryState';
import SVGViewer from "~/components/SVGViewer";

export default function Editor() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();
  const [state, setState, undo, redo, history, pointer] = useHistoryState(covers.length ? {
    svg: prettifyXml(covers[selectedCover].svg),
    colors: getColors(covers[selectedCover].svg),
  } : { svg: '', colors: [] });

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

  return (
    <>
      <Link to="/">
        <Button m='md' leftIcon={<ArrowBigLeft/>} style={{ margin: 5, marginLeft: 16 }}>
          Go back to Main
        </Button>
      </Link>
      <Shape>
        <Grid justify='space-around' align="center" columns={2}>
          <Grid.Col span={1}>
            <SVGViewer svg={state.svg} boxHeight={'45vh'}/>
            <Center>
              <Button m='md'
                      color={state.svg == "" ? 'gray' : ''}
                      onClick={() => setState({ svg: '', colors: [] })}
                      leftIcon={<Trash/>}
              >
                Delete
              </Button>
              <Button m='md'
                      color={pointer == 0 ? 'gray' : ''}
                      onClick={undo}
                      leftIcon={<ArrowBackUp/>}
              >
                Undo
              </Button>
              <Button m='md'
                      color={pointer + 1 == history.length ? 'gray' : ''}
                      onClick={redo}
                      leftIcon={<ArrowForwardUp/>}
              >
                Redo
              </Button>
            </Center>
            <Dropzone
              accept={['image/svg+xml']}
              onDrop={async (files) => {
                const x = await files[0].text();
                updCoverNotPrettified(x);
              }}
            >
              <Group position="center" spacing="xl" style={{ pointerEvents: 'none' }}>
                <LayoutBoardSplit color='grey' size={60}/>
                <div>
                  <Text color='grey' size="xl" inline>
                    Drag SVG image here or click to select file
                  </Text>
                  <Text color='dimmed' size="sm" inline mt={7}>
                    You can edit it after uploading!
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </Grid.Col>
          <Grid.Col span={1}>
            <EditorTabs state={state} setState={setState}/>
          </Grid.Col>
        </Grid>
      </Shape>
    </>)
}
