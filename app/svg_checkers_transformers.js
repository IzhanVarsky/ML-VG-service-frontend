import { getColors, prettifyXml } from "./utils";

export const updCoverNotPrettified = (state, svg) => {
  // For textarea only
  let colors;
  if (prettifyXml(svg).includes('parsererror')) {
    colors = state.colors;
  } else {
    try {
      colors = getColors(svg);
    } catch (e) {
      colors = state.colors;
    }
  }
  return { svg, colors };
}

export const getSVGAndColorsState = (svg, isColorFindingEnabled) => {
  if (isColorFindingEnabled) {
    return getStateWithNewSVGAndColors(svg)
  }
  return {
    svg: svg,
    colors: []
  }
}

export const getStateWithNewSVGAndColors = (svg) => ({ svg, colors: getColors(svg) })