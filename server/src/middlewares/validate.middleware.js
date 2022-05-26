exports.validate = (schema) => (req, res, next) => {
  const {
    error
  } = schema.validate(req.body, {abortEarly: false});
  if (error) {
    res.status(422).json(error);
  } else {
    next();
  }
};
