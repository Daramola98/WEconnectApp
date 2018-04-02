/**
   * Checks if required fields are provided in the request body
   * @param {object} validationRules - The request object
   * @return {function} A middleware
   * @memberof ModelValidator
   */
function modelValidator(validationRules) {
  return (req, res, next) => {
    req.checkBody(validationRules);
    const errors = req.validationErrors();

    if (errors) {
      const validationErrors = [];
      errors.forEach((error) => {
        validationErrors.push(error.msg);
      });
      res.status(400)
        .json(validationErrors);
    } else {
      next();
    }
  };
}

export default modelValidator;
