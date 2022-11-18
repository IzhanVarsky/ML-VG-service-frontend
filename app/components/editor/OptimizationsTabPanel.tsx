import { Button, Center, Stack, } from '@mantine/core';
import { updCoverNotPrettified } from "~/svg_checkers_transformers";
import { flattenedGroups, optimize_svg_pipeline } from "~/flatten_groups";
import { applyTransformsFromStr } from "~/flatten_transforms";
import { optimize } from 'svgo';
import { diffvg_optimize } from "~/download_utils";
import { useState } from "react";

export default function OptimizationsTabPanel({ state, setState }) {
  const [diffvgRunning, setDiffvgRunning] = useState(false);

  const optimizeSVG = function () {
    const result = optimize(state.svg);
    let res_state = updCoverNotPrettified(state, result.data);
    setState(res_state);
  }

  const flattenGroups = function () {
    let res_state = updCoverNotPrettified(state, flattenedGroups(state.svg));
    setState(res_state);
  }

  const applyTransforms = function () {
    let res_state = updCoverNotPrettified(state, applyTransformsFromStr(state.svg));
    setState(res_state);
  }

  const removeGroupsApplyTransformsOptimize = () => {
    let res_state = updCoverNotPrettified(state, optimize_svg_pipeline(state.svg));
    setState(res_state);
  }

  return (
    <Stack style={{
      padding: '0 25%',
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
        }}>Optimize (SVGO)</Center>
      </Button>
      <Button component="span" variant="outline"
              style={{ pointerEvents: 'all' }}
              onClick={() => flattenGroups()}>
        <Center style={{
          height: "inherit",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>Flatten Transforms from groups + remove groups</Center>
      </Button>
      <Button component="span" variant="outline"
              style={{ pointerEvents: 'all' }}
              onClick={() => applyTransforms()}>
        <Center style={{
          height: "inherit",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>Apply Transformations</Center>
      </Button>
      <Button component="span" variant="outline"
              style={{ pointerEvents: 'all' }}
              onClick={() => removeGroupsApplyTransformsOptimize()}>
        <Center style={{
          height: "inherit",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>Remove groups, apply transforms, optimize</Center>
      </Button>
      <Button component="span" variant="outline"
              loading={diffvgRunning}
              style={{ pointerEvents: 'all' }}
              onClick={() => {
                setDiffvgRunning(true);
                diffvg_optimize(state.svg, (svg) => {
                    setState(updCoverNotPrettified(state, svg));
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
        }}>DiffVG Optimization</Center>
      </Button>
    </Stack>
  )
}