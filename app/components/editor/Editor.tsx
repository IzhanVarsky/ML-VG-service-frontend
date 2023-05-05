import { Grid, } from '@mantine/core';
import Shape from '~/components/Shape';
import EditorTabs from '~/components/editor/EditorTabs';
import { getColors } from '~/utils';
import useHistoryState from '~/HistoryState';
import SVGViewer from "~/components/SVGViewer";
import SVGViewerControlButtons from "~/components/editor/SVGViewerControlButtons";
import { useState } from "react";

export const SVG_DATA_INPUT_KEY = "SVG_KEY";

export const addSVGToStorageAndOpenNewEditor = (svg: string) => {
  sessionStorage.setItem(SVG_DATA_INPUT_KEY, svg);
  let tab = window.open("/edit", '_blank');
  tab?.focus();
}

export default function Editor() {
  let possibleInputSVG = sessionStorage.getItem(SVG_DATA_INPUT_KEY);
  console.log("possibleInputSVG", possibleInputSVG);
  if (possibleInputSVG) {
    sessionStorage.removeItem(SVG_DATA_INPUT_KEY);
  }
  const [isColorFindingEnabled, setIsColorFindingEnabled] = useState(false);
  const [state, setState, undo, redo, history, pointer] =
    useHistoryState(possibleInputSVG ? {
      svg: possibleInputSVG,
      colors: isColorFindingEnabled ? getColors(possibleInputSVG) : [],
    } : { svg: '', colors: [] });

  return (
    <>
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
