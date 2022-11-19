import { Button, Grid, } from '@mantine/core';
import Shape from '~/components/Shape';
import EditorTabs from '~/components/editor/EditorTabs';
import { Link, useOutletContext } from '@remix-run/react';
import { ArrowBigLeft, } from 'tabler-icons-react';
import { getColors} from '~/utils';
import useHistoryState from '~/HistoryState';
import SVGViewer from "~/components/SVGViewer";
import SVGViewerControlButtons from "~/components/editor/SVGViewerControlButtons";
import { useState } from "react";

export default function Editor() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();
  const [isColorFindingEnabled, setIsColorFindingEnabled] = useState(false);
  const [state, setState, undo, redo, history, pointer] = useHistoryState(covers.length ? {
    svg: covers[selectedCover].svg,
    colors: isColorFindingEnabled ? getColors(covers[selectedCover].svg) : [],
  } : { svg: '', colors: [] });

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
            <SVGViewerControlButtons svg={state.svg}
                                     setState={setState}
                                     pointer={pointer}
                                     undo={undo}
                                     redo={redo}
                                     history={history}
                                     isColorFindingEnabled={isColorFindingEnabled}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <EditorTabs state={state} setState={setState}
                        isColorFindingEnabled={isColorFindingEnabled}
                        setIsColorFindingEnabled={setIsColorFindingEnabled}/>
          </Grid.Col>
        </Grid>
      </Shape>
    </>)
}
