/**
 * Check for Invalid Data input before sending it to the database
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} next - The next callback object
 * @return {null} does not return anything
 */
function isInvalidData(req, res, next) {
  const reqBodyKeys = Object.keys(req.body);
  for (let i = 0; i < reqBodyKeys.length; i += 1) {
    const key = reqBodyKeys[i];
    if (typeof req.body[key] !== 'string') {
      return res.status(400).json({ message: `${key} is of invalid datatype use strings` });
    }
    return next();
  }
}

export default isInvalidData;
