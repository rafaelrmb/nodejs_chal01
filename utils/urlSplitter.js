export const urlSplitter = (url) => {
  const urlParts = url.split('/').filter((el) => {
    return el !== '';
  });

  return urlParts;
};
