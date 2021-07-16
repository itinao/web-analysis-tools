const replaceHyphen = (baseObj: {}) => {
  return Object.entries(baseObj).reduce(
    (obj, [key, value]) => {
      key = key.replace(/\-/g, '_');
      return Object.assign({}, obj, { [key]: value });
    }, {},
  );
};

export { replaceHyphen };
