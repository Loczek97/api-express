const accessLogger = (req, res, next) => {
  const dateToPrint = new Date().toISOString();
  console.log(`[${dateToPrint}] URL: ${req.url} method: ${req.method}}`);
  next();
};

module.exports = accessLogger;
