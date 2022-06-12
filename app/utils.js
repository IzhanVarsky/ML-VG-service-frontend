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

module.exports = {
  getColors: getColors,
};