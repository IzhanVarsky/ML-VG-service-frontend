import { Button, Center, Tabs, Textarea, } from '@mantine/core';
import { AdjustmentsAlt, Axe, Download, FileText, } from 'tabler-icons-react';
import { getSVGSize, prettifyXml } from '~/utils';
import { useState } from 'react';
import { updCoverNotPrettified } from "~/svg_checkers_transformers";
import EditOptionsTabPanel from "~/components/EditOptionsTabPanel";
import DownloadTabPanel from "~/components/DownloadTabPanel";
import OptimizationsTabPanel from "~/components/OptimizationsTabPanel";

export default function EditorTabs({ state, setState }) {
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
                            onClick={() => setState({
                              svg: prettifyXml(state.svg),
                              colors: state.colors
                            })}>
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
        <EditOptionsTabPanel state={state} setState={setState}/>
      </Tabs.Panel>
      <Tabs.Panel value="Edit Raw SVG">
        <Textarea
          autoFocus={true} // TODO: doesn't work
          placeholder='Write SVG . . .'
          style={{ minHeight: '70vh' }}
          minRows={10}
          maxRows={21}
          autosize
          value={state.svg}
          onChange={event => setState(updCoverNotPrettified(state, event.currentTarget.value))}
        />
      </Tabs.Panel>
      <Tabs.Panel value="Download">
        <DownloadTabPanel state={state}
                          imageWidthToDownload={imageWidthToDownload}
                          setImageWidthToDownload={setImageWidthToDownload}
                          imageHeightToDownload={imageHeightToDownload}
                          setImageHeightToDownload={setImageHeightToDownload}/>
      </Tabs.Panel>
      <Tabs.Panel value="Optimizations">
        <OptimizationsTabPanel state={state} setState={setState}/>
      </Tabs.Panel>
    </Tabs>
  )
}