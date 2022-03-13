module.exports = (err, _req, res, _next) => {
  if (err.code && typeof err.code === 'number') {
    const { code, message } = err;

    return res.status(code).json({ message });
  }

  console.log(err);
  return res.status(500).json({ message: err.message });
};
