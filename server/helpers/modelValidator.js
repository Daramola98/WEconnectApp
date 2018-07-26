/**
   * Checks if required fields are provided in the request body
   * @param {object} validationRules - The request object
   * @return {function} A middleware
   * @memberof ModelValidator
   */
function modelValidator(validationRules) {
  return (req, res, next) => {
    const { password, confirmPassword } = req.body;
    req.checkBody(validationRules);
    const errors = req.validationErrors();
    const validationErrors = [];

    if (confirmPassword && password && password
      !== confirmPassword && !errors) {
      validationErrors.push('Passwords dont match');
      return res.status(400)
        .json({ validationErrors });
    }

    if (errors && validationErrors.length === 0) {
      errors.forEach((error) => {
        validationErrors.push(error.msg);
      });
      if (password && confirmPassword && password
        !== confirmPassword) {
        validationErrors.push('Passwords dont match');
      }
      return res.status(400)
        .json({ validationErrors });
    }
    if (!errors && validationErrors.length === 0) {
      next();
    }
  };
}

export default modelValidator;
