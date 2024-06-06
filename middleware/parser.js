export const jsonParse = async (req, res) => {
  const buffer = [];

  for await (const chunk of req) {
    buffer.push(chunk);
  }

  try {
    req.body = JSON.parse(buffer);
  } catch {
    req.body = null;
  }
};
