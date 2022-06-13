function colorArrays(svg) {
    let parsed = $(svg);
    let fill_find = parsed.find("[fill^='rgb']");
    let stroke_find = parsed.find("[stroke^='rgb']");
    return {fill_find, stroke_find};
}

const getColors = (svg) => {
    let colors = [];
    let {fill_find, stroke_find} = colorArrays(svg);
    fill_find.each((i, el) => colors.push(el.getAttribute("fill")))
    stroke_find.each((i, el) => colors.push(el.getAttribute("stroke")))
    // return {colors, selectors:[fill_find, stroke_find]};
    return colors;
}

const changeColorByIndex = (svg, ind, newColor) => {
    let parsed = $(svg);
    let fill_find = parsed.find("[fill^='rgb']");
    let stroke_find = parsed.find("[stroke^='rgb']");
    if (ind < fill_find.length) {
        fill_find[ind].setAttribute("fill", newColor)
    } else if (ind < fill_find.length + stroke_find.length) {
        stroke_find[ind - fill_find.length].setAttribute("stroke", newColor)
    }
    return parsed[0].outerHTML;
}

const changeAllColors = (svg, newColors) => {
    let parsed = $(svg);
    console.log('Before', parsed[0].outerHTML);
    let fill_find = parsed.find("[fill^='rgb']");
    let stroke_find = parsed.find("[stroke^='rgb']");
    fill_find.each((i, el) => el.setAttribute("fill", newColors[i]));
    stroke_find.each((i, el) => el.setAttribute("stroke", newColors[i + fill_find.length]));
    console.log('After', parsed[0].outerHTML);
    return parsed[0].outerHTML;
}

const getSVGSize = (svg) => {
    try {
        const parsed = $(svg)[0];
        const w = parseInt(parsed.getAttribute("width"));
        const h = parseInt(parsed.getAttribute("height"));
        return {w, h};
    } catch (e) {
        return {w: 0, h: 0}
    }
}

const svgWithSize = (svg, size) => {
    try {
        const parsed = $(svg)[0];
        parsed.setAttribute("width", size);
        parsed.setAttribute("height", size);
        return parsed.outerHTML;
    } catch (e) {
        return svg;
    }
}

const addRectBefore = (svg, color = 'rgb(230, 230, 230)') => {
    // TODO: change to RGBA (delete fill-opacity)
    let parsed = $(svg);
    let viewBox = parsed[0].getAttribute("viewBox").split(" ");
    const width = viewBox[2];
    const height = viewBox[3];

    const rect = `<rect x="0" y="0" width="${width}" height="${height}" fill="${color}" fill-opacity="0.5" />`;

    let find = parsed.find("text:first");
    console.log('find', find);
    if (find.length) {
        find.before(rect);
    } else {
        parsed.append(rect);
    }
    return {
        svg: parsed[0].outerHTML,
        color,
    };
}

const prettifyXml = function (sourceXml) {
    const xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
    const xsltDoc = new DOMParser().parseFromString([
        // describes how we want to modify the XML - indent everything
        '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
        '  <xsl:strip-space elements="*"/>',
        '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
        '    <xsl:value-of select="normalize-space(.)"/>',
        '  </xsl:template>',
        '  <xsl:template match="node()|@*">',
        '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
        '  </xsl:template>',
        '  <xsl:output indent="yes"/>',
        '</xsl:stylesheet>',
    ].join('\n'), 'application/xml');

    const xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsltDoc);
    const resultDoc = xsltProcessor.transformToDocument(xmlDoc);
    return new XMLSerializer().serializeToString(resultDoc);
};

module.exports = {
    getColors: getColors,
    addRectBefore: addRectBefore,
    prettifyXml: prettifyXml,
    svgWithSize: svgWithSize,
    getSVGSize: getSVGSize,
    changeColorByIndex: changeColorByIndex,
    changeAllColors: changeAllColors,
};