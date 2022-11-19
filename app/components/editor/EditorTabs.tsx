import { Button, Center, Tabs, } from '@mantine/core';
import { AdjustmentsAlt, Axe, Download, FileText, } from 'tabler-icons-react';
import { getSVGSize, prettifyXml } from '~/utils';
import { useState } from 'react';
import { getSVGAndColorsState } from "~/svg_checkers_transformers";
import EditOptionsTabPanel from "~/components/editor/EditOptionsTabPanel";
import DownloadTabPanel from "~/components/editor/DownloadTabPanel";
import OptimizationsTabPanel from "~/components/editor/OptimizationsTabPanel";
import CodeMirror from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';
import { bbedit } from '@uiw/codemirror-theme-bbedit';

export default function EditorTabs({
                                     state, setState,
                                     isColorFindingEnabled, setIsColorFindingEnabled
                                   }) {
  const [activeTab, setActiveTab] = useState(state.svg === "" ? "Edit Raw SVG" : "Edit Options");
  const [imageWidthToDownload, setImageWidthToDownload] = useState(getSVGSize(state.svg).w);
  const [imageHeightToDownload, setImageHeightToDownload] = useState(getSVGSize(state.svg).h);

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
                  disabled={state.svg === ""}
                  icon={<AdjustmentsAlt size={14}/>}
                  style={{ color: activeTab == 'Edit Options' ? '#228be6' : '' }}
        >
          Edit Options
        </Tabs.Tab>
        <Tabs.Tab value={"Edit Raw SVG"}
                  style={{ color: activeTab == 'Edit Raw SVG' ? '#228be6' : '' }}
                  icon={<FileText size={14}/>}>Edit Raw SVG</Tabs.Tab>
        <Tabs.Tab value={"Download"}
                  disabled={state.svg === ""}
                  style={{ color: activeTab == 'Download' ? '#228be6' : '' }}
                  icon={<Download size={14}/>}>Download</Tabs.Tab>
        <Tabs.Tab value={"Prettify SVG"}
                  disabled={state.svg === ""}
                  style={{ pointerEvents: 'none' }}
                  icon={
                    <Button component="span" variant="outline"
                            style={{ pointerEvents: 'all' }}
                            onClick={() => {
                              // TODO: prettifying doesn't change colors -> optimization!
                              setState(
                                getSVGAndColorsState(prettifyXml(state.svg), isColorFindingEnabled)
                              )
                            }}>
                      <Center style={{
                        height: "inherit",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>Prettify SVG</Center>
                    </Button>
                  }
        />
        <Tabs.Tab value={"Optimizations"}
                  disabled={state.svg === ""}
                  style={{ color: activeTab == 'Optimizations' ? '#228be6' : '' }}
                  icon={<Axe size={14}/>}>Optimizations</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Edit Options">
        <EditOptionsTabPanel state={state} setState={setState}
                             isColorFindingEnabled={isColorFindingEnabled}
                             setIsColorFindingEnabled={setIsColorFindingEnabled}/>
      </Tabs.Panel>
      <Tabs.Panel value="Edit Raw SVG">
        <CodeMirror
          autoFocus={true} // TODO: doesn't work
          placeholder='Write SVG...'
          height={'70vh'}
          width={'45vw'}
          extensions={[xml()]}
          value={state.svg}
          onChange={(value, viewUpdate) => {
            // TODO: updates SVG with /r/n -> /n. Causes new history pointer!
            if (viewUpdate.flags !== 0) {
              setState(getSVGAndColorsState(value, isColorFindingEnabled))
            }
          }}
          theme={bbedit}
        />
      </Tabs.Panel>
      <Tabs.Panel value="Download">
        <DownloadTabPanel svg={state.svg}
                          imageWidthToDownload={imageWidthToDownload}
                          setImageWidthToDownload={setImageWidthToDownload}
                          imageHeightToDownload={imageHeightToDownload}
                          setImageHeightToDownload={setImageHeightToDownload}/>
      </Tabs.Panel>
      <Tabs.Panel value="Optimizations">
        <OptimizationsTabPanel stateSVG={state.svg} setState={setState}
                               isColorFindingEnabled={isColorFindingEnabled}
        />
      </Tabs.Panel>
    </Tabs>
  )
}