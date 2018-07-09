/**
 * Removes white space in the request body
 * @param {object} value - The value to trim
 * @return {null} removes whitespaces
 * @memberof genericHelper
*/
export const checkForWhiteSpace = (value) => {
  if (!value || value === 'undefined') {
    return;
  }
  value = String(value).trim();
};

/**
   * Formats user input before sending it to the database
   * @param {object} req - The request object
   * @return {null} does not return anything
   * @memberof genericHelper
   */
export const handleInputFormat = (req) => {
  const reqBodyKeys = Object.keys(req.body);
  for (let i = 0; i < reqBodyKeys.length; i += 1) {
    const key = reqBodyKeys[i];
    if (key !== 'userId') {
      req.body[key] = req.body[key].replace(/ +/g, ' ').trim();
    }
    if (key === 'location' || key === 'category') {
      req.body[key] = req.body[key].toUpperCase();
    }
  }
};

export const handleValidationErrors = (errors, res) => {
  const validationErrors = [];
  if (!errors || errors.length < 1) {
    return;
  }
  for (let i = 0; i < errors.length; i += 1) {
    validationErrors.push(errors[i].message);
  }
  return res.status(400).json({ message: 'The following validation errors were found', validationErrors });
};

/**
   * Sets up offset for pagination
   * @param {number} pageNumber - pageNumber from the request
   * @param {number} offset - how many rows to skip
   *
   * @return {number} offset - The response to the client
   * @memberof BusinessHelper
   */
export const listByPages = (pageNumber = 0, offset = 0) => {
  const searchPageNumber = Math.round(Number(pageNumber));
  if (searchPageNumber <= 1) {
    offset = 0;
    return offset;
  }
  offset = (searchPageNumber - 1) * 9;
  return offset;
};
