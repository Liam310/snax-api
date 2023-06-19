exports.createLookup = (data, key, value) => {
  const lookup = {};
  data.forEach((element) => {
    lookup[element[key]] = element[value];
  });
  return lookup;
};
