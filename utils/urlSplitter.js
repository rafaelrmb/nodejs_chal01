export const urlSplitter = (req, res) => {
  const urlParts = req.url.split('/').filter((el) => {
    return el !== '';
  });

  return urlParts;
};
