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
    const validationErrors = [];

    if (req.body.confirmPassword && req.body.password && req.body.password
      !== req.body.confirmPassword && !errors) {
      validationErrors.push('Passwords dont match');
      res.status(400)
        .json(validationErrors);
    }

    if (errors && validationErrors.length === 0) {
      errors.forEach((error) => {
        validationErrors.push(error.msg);
      });
      if (req.body.password && req.body.confirmPassword && req.body.password
        !== req.body.confirmPassword) {
        validationErrors.push('Passwords dont match');
      }
      res.status(400)
        .json(validationErrors);
    }
    if (!errors && validationErrors.length === 0) {
      next();
    }
  };
}

export default modelValidator;
