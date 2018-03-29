/**
   * Checks if required fields are provided in the request body
   * @param {object} validationRules - The request object
   * @return {function} A middleware
   * @memberof checkRequiredFields
   */
function checkRequiredFields(validationRules) {
  return (req, res, next) => {
    req.checkBody(validationRules);
    const errors = [];
    errors.push(req.validationErrors());

    if (errors.length > 0) {
      const validationErrors = [];
      errors.forEach((error) => {
        validationErrors.push({
          error: error.msg
        });
      });
      res.status(400)
        .json(validationErrors);
    } else {
      return next();
    }
  };
}

export default checkRequiredFields;
