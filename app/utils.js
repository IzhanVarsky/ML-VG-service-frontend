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
  const widthStart = svg.indexOf('width="') + 7;
  const widthEnd = svg.indexOf('"', widthStart);

  const heightStart = svg.indexOf('height="') + 8;
  const heightEnd = svg.indexOf('"', heightStart);

  const width = svg.slice(widthStart, widthEnd);
  const height = svg.slice(heightStart, heightEnd);

  return { height, width }
}

const addRectBefore = (svg, color = 'rgb(230, 230, 230)') => {
  // TODO: change to RGBA (delete fill-opacity)
  const pos = svg.indexOf('<text');
  const { height, width } = getSVGDims(svg);

  const rect = `<rect x="0" y="0" width="${width}" height="${height}" fill="${color}" fill-opacity="0.5" />`;

  return {
    svg: svg.slice(0, pos) + rect + svg.slice(pos),
    color,
  };
}

module.exports = {
  getColors: getColors,
  addRectBefore: addRectBefore,
};