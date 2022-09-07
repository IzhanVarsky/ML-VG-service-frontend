const correct_color_regex =
  "^(#([\\da-f]{3}){1,2}|(rgb|hsl)a\\((\\d{1,3}%?,\\s?){3}(1|1\\.0+|0|0?\\.\\d+)\\)|(rgb|hsl)\\(\\d{1,3}%?(,\\s?\\d{1,3}%?){2}\\))$";
const re = new RegExp(correct_color_regex);

// TODO: use the `parseSvg` method from `node_modules/svgo/lib/parser.js`

function findColorByAttrName(obj, attr) {
  return obj
    .find(`[${attr}]`)
    .filter((i, x) => re.test(x.getAttribute(attr).trim().toLowerCase()))
    .map((i, x) => ({x, attr, value: x.getAttribute(attr)}));
}

function extractColors(parsed) {
  return ["fill", "stroke", "stop-color"]
    .map(name => findColorByAttrName(parsed, name))
    .reduce((flatten, arr) => [...flatten, ...arr]);
}

function getSVGTagFromFullSVG(full_parsed) {
  // TODO: add checks for errors
  for (let i = 0; i < full_parsed.length; i++) {
    if (full_parsed[i].tagName === "svg") {
      return $(full_parsed[i]);
    }
  }
  return full_parsed // TODO: should be error
}

function JQueryToHTML(full_parsed) {
  return $('<a></a>').append(full_parsed.clone()).html()
}

const getColors = (svg) =>
  extractColors(getSVGTagFromFullSVG($(svg))).map(obj => {
    return ({
      attr: `${obj.x.tagName.toLowerCase()}["${obj.attr}"]`,
      value: obj.value
    })
  })

const changeColorByIndex = (svg, ind, newColor) => {
  const full_parsed = $(svg);
  const res_objs = extractColors(getSVGTagFromFullSVG(full_parsed));
  if (ind < res_objs.length) {
    const obj = res_objs[ind];
    obj.x.setAttribute(obj.attr, newColor);
  }
  return JQueryToHTML(full_parsed);
}

const changeAllColors = (svg, newColors) => {
  const full_parsed = $(svg);
  const res_objs = extractColors(getSVGTagFromFullSVG(full_parsed));
  res_objs.forEach((el, i) => el.x.setAttribute(el.attr, newColors[i]))
  return JQueryToHTML(full_parsed);
}

const getSVGSize = (svg) => {
  try {
    const parsed = getSVGTagFromFullSVG($(svg))[0];
    let w = 512;
    let h = 512;
    if (!parsed.hasAttribute("width") || !parsed.hasAttribute("height")) {
      if (parsed.getAttribute("viewBox") !== undefined) {
        const viewBox = parsed.getAttribute("viewBox").split(" ");
        w = viewBox[2];
        h = viewBox[3];
      }
    } else {
      w = parsed.getAttribute("width");
      h = parsed.getAttribute("height");
    }
    w = parseInt(w.toString());
    h = parseInt(h.toString());
    return {w, h};
  } catch (e) {
    return {w: 0, h: 0}
  }
}

const svgWithSize = (svg, width, height, scale = 100.0) => {
  try {
    let full_parsed = $(svg);
    const parsed = getSVGTagFromFullSVG(full_parsed)[0];
    let {w, h} = getSVGSize(svg);
    if (!parsed.hasAttribute("viewBox")) {
      parsed.setAttribute("viewBox", `0 0 ${w} ${h}`)
    }
    if (width !== undefined && height !== undefined) {
      w = width;
      h = height;
    }
    if (scale !== 100.0) {
      w *= scale / 100.0;
      h *= scale / 100.0;
    }
    if (width !== "none") {
      parsed.setAttribute("width", w);
    } else {
      parsed.removeAttribute("width");
    }
    parsed.setAttribute("height", h);
    return JQueryToHTML(full_parsed);
  } catch (e) {
    console.log("Caught error!!!", e);
    return svg;
  }
}

function getSVGViewBoxSize(thisSVG) {
  let width;
  let height;
  if (thisSVG.hasAttribute("viewBox")) {
    const viewBox = thisSVG.getAttribute("viewBox").split(" ");
    width = viewBox[2];
    height = viewBox[3];
  } else {
    width = thisSVG.getAttribute("width");
    height = thisSVG.getAttribute("height");
  }
  return {width, height};
}

function addBeforeText(parsed, rect) {
  const find = parsed.find("text:first");
  if (find.length) {
    find.before(rect);
  } else {
    parsed.append(rect);
  }
}

const addShadowFilter = (svg) => {
  const full_parsed = $(svg);
  const parsed = getSVGTagFromFullSVG(full_parsed);
  let newIdNum = 0;
  let id;
  while (true) {
    id = `id${newIdNum}`;
    if (parsed.find(`[id^=${id}]`).length > 0) {
      newIdNum++;
      continue;
    }
    break;
  }
  const {width, height} = getSVGViewBoxSize(parsed[0]);
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.ceil(width / Math.sqrt(2));
  const radGrad = `
    <radialGradient cx="${cx}" cy="${cy}" r="${r}" 
        gradientUnits="userSpaceOnUse" spreadMethod="pad" id="${id}">
        <stop offset="0" stop-color="rgba(0, 0, 0, 0)"></stop>
        <stop offset="0.7" stop-color="rgba(0, 0, 0, 0)"></stop>
        <stop offset="1" stop-color="rgba(0, 0, 0, 0.6)"></stop>
    </radialGradient>`;
  let findDefs = parsed.find("defs:first");
  if (findDefs.length > 0) {
    findDefs.append(radGrad);
  } else {
    parsed.prepend(`<defs>${radGrad}</defs>`);
  }
  const rect = `<rect x="0" y="0" width="${width}" height="${height}" fill="url(#${id})" />`;
  addBeforeText(parsed, rect);
  return JQueryToHTML(full_parsed);
}

const addRectBefore = (svg, color = 'rgba(230, 230, 230, 0.5)') => {
  const full_parsed = $(svg);
  const parsed = getSVGTagFromFullSVG(full_parsed);
  let {width, height} = getSVGViewBoxSize(parsed[0]);

  const rect = `<rect x="0" y="0" width="${width}" height="${height}" fill="${color}" />`;
  addBeforeText(parsed, rect);
  return JQueryToHTML(full_parsed);
}

// TODO: try use http://www.eslinstructor.net/vkbeautify/
const prettifyXmlLib = require('prettify-xml')
const prettifyXml = (input) => prettifyXmlLib(input, {indent: 2, newline: '\n'})

// const prettifyXml = function (sourceXml) {
//   const xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
//   const xsltDoc = new DOMParser().parseFromString([
//     // describes how we want to modify the XML - indent everything
//     '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
//     '  <xsl:strip-space elements="*"/>',
//     '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
//     '    <xsl:value-of select="normalize-space(.)"/>',
//     '  </xsl:template>',
//     '  <xsl:template match="node()|@*">',
//     '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
//     '  </xsl:template>',
//     '  <xsl:output indent="yes"/>',
//     '</xsl:stylesheet>',
//   ].join('\n'), 'application/xml');
//
//   var resultDoc;
//   if (window.ActiveXObject) {
//     // IE method
//     resultDoc = new ActiveXObject("MSXML2.DOMDocument");
//     xmlDoc.transformNodeToObject(xsltDoc, resultDoc);
//   } else {
//     // Other browsers
//     const xsltProcessor = new XSLTProcessor();
//     xsltProcessor.importStylesheet(xsltDoc);
//     resultDoc = xsltProcessor.transformToDocument(xmlDoc);
//   }
//   let res = new XMLSerializer().serializeToString(resultDoc);
//   return res;
// };

module.exports = {
  getColors: getColors,
  addRectBefore: addRectBefore,
  addShadowFilter: addShadowFilter,
  prettifyXml: prettifyXml,
  svgWithSize: svgWithSize,
  getSVGSize: getSVGSize,
  changeColorByIndex: changeColorByIndex,
  changeAllColors: changeAllColors,
};