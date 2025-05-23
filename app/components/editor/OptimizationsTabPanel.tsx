import { Button, Center, Stack, } from '@mantine/core';
import { getSVGAndColorsState} from "~/svg_checkers_transformers";
import { flattenedGroups, optimize_svg_pipeline } from "~/flatten_groups";
import { applyTransformsFromStr } from "~/flatten_transforms";
import { optimize } from 'svgo';
import { diffvg_optimize } from "~/download_utils";
import { useState } from "react";
import { useTranslation } from "react-i18next"; // добавил импорт

export default function OptimizationsTabPanel({ stateSVG, setState, isColorFindingEnabled }) {
  const [diffvgRunning, setDiffvgRunning] = useState(false);
  const { t } = useTranslation(); // добавил хук

  const getNewState = (svg) => getSVGAndColorsState(svg, isColorFindingEnabled)

  const optimizeSVG = function () {
    const result = optimize(stateSVG);
    let res_state = getNewState(result.data);
    setState(res_state);
  }

  const flattenGroups = function () {
    let res_state = getNewState(flattenedGroups(stateSVG));
    setState(res_state);
  }

  const applyTransforms = function () {
    let res_state = getNewState(applyTransformsFromStr(stateSVG));
    setState(res_state);
  }

  const removeGroupsApplyTransformsOptimize = () => {
    let res_state = getNewState(optimize_svg_pipeline(stateSVG));
    setState(res_state);
  }

  return (
    <Stack style={{
      padding: '0 10%',
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
        }}>{t("optimize-svgo")}</Center>
      </Button>
      <Button component="span" variant="outline"
              style={{ pointerEvents: 'all' }}
              onClick={() => flattenGroups()}>
        <Center style={{
          height: "inherit",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>{t("flatten-groups")}</Center>
      </Button>
      <Button component="span" variant="outline"
              style={{ pointerEvents: 'all' }}
              onClick={() => applyTransforms()}>
        <Center style={{
          height: "inherit",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>{t("apply-transformations")}</Center>
      </Button>
      <Button component="span" variant="outline"
              style={{ pointerEvents: 'all' }}
              onClick={() => removeGroupsApplyTransformsOptimize()}>
        <Center style={{
          height: "inherit",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>{t("remove-groups-pipeline")}</Center>
      </Button>
      <Button component="span" variant="outline"
              loading={diffvgRunning}
              style={{ pointerEvents: 'all' }}
              onClick={() => {
                setDiffvgRunning(true);
                diffvg_optimize(stateSVG, (svg) => {
                    setState(getNewState(svg));
                    setDiffvgRunning(false);
                  },
                  () => setDiffvgRunning(false)
                )
              }}>
        <Center style={{
          height: "inherit",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>{t("diffvg-optimization")}</Center>
      </Button>
    </Stack>
  )
}
