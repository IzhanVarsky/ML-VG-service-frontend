import { Button, Center, Tabs, } from '@mantine/core';
import { AdjustmentsAlt, Axe, Download, FileText, } from 'tabler-icons-react';
import { getSVGSize, prettifyXml } from '~/utils';
import { useState } from 'react';
import { getSVGAndColorsState } from "~/svg_checkers_transformers";
import EditOptionsTabPanel from "~/components/editor/EditOptionsTabPanel";
import DownloadTabPanel from "~/components/editor/DownloadTabPanel";
import OptimizationsTabPanel from "~/components/editor/OptimizationsTabPanel";
import CodeMirrorEditorTabPanel from "~/components/editor/CodeMirrorEditorTabPanel";
import { useTranslation } from "react-i18next"; // добавил импорт

export default function EditorTabs({
                                     state, setState,
                                     isColorFindingEnabled, setIsColorFindingEnabled
                                   }) {
  const [activeTab, setActiveTab] = useState(state.svg === "" ? "Edit Raw SVG" : "Edit Options");
  const [imageWidthToDownload, setImageWidthToDownload] = useState(getSVGSize(state.svg).w);
  const [imageHeightToDownload, setImageHeightToDownload] = useState(getSVGSize(state.svg).h);
  const { t } = useTranslation(); // добавил хук

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
          {t("edit-options")}
        </Tabs.Tab>
        <Tabs.Tab value={"Edit Raw SVG"}
                  style={{ color: activeTab == 'Edit Raw SVG' ? '#228be6' : '' }}
                  icon={<FileText size={14}/>}>{t("edit-raw-svg")}</Tabs.Tab>
        <Tabs.Tab value={"Download"}
                  disabled={state.svg === ""}
                  style={{ color: activeTab == 'Download' ? '#228be6' : '' }}
                  icon={<Download size={14}/>}>{t("download")}</Tabs.Tab>
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
                      }}>{t("prettify-svg")}</Center>
                    </Button>
                  }
        />
        <Tabs.Tab value={"Optimizations"}
                  disabled={state.svg === ""}
                  style={{ color: activeTab == 'Optimizations' ? '#228be6' : '' }}
                  icon={<Axe size={14}/>}>{t("optimizations")}</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Edit Options">
        <EditOptionsTabPanel state={state} setState={setState}
                             isColorFindingEnabled={isColorFindingEnabled}
                             setIsColorFindingEnabled={setIsColorFindingEnabled}/>
      </Tabs.Panel>
      <Tabs.Panel value="Edit Raw SVG">
        <CodeMirrorEditorTabPanel state={state} setState={setState} isColorFindingEnabled={isColorFindingEnabled}/>
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
