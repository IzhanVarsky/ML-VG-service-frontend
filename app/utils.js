const isIterable = (x) => {
    if (typeof x === 'object') {
        return true;
    }

    return false;
}

const getColors = (json) => {
    const result = [];

    for (let key in json) {
        if (key === "fill" || key === 'stroke') {
            result.push(json[key]);
        } else if (isIterable(json[key])) {
            result.push(...getColors(json[key]));
        }
    }

    return result.filter(color => color.startsWith('rgb'));
}

const getSVGDims = (svg) => {
    const parsed = $(svg)[0];
    const height = parsed.getAttribute("height");
    const width = parsed.getAttribute("width");

    console.log("W", width, "H", height);

    return {height, width}
}

const addRectBefore = (svg, color = 'rgb(230, 230, 230)') => {
    // TODO: change to RGBA (delete fill-opacity)
    let parsed = $(svg);
    let viewBox = parsed[0].getAttribute("viewBox").split(" ");
    const width = viewBox[2];
    const height = viewBox[3];

    const rect = `<rect x="0" y="0" width="${width}" height="${height}" fill="${color}" fill-opacity="0.5" />`;

    parsed.find("text:first").before(rect);
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
};