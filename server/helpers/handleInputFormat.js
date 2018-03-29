
/**
   * Formats user input before sending it to the database
   * @param {object} req - The request object
   * @return {null} does not return anything
   * @memberof BusinessHelper
   */
export default function handleInputFormat(req) {
  const reqBodyKeys = Object.keys(req.body);
  for (let i = 0; i < reqBodyKeys.length; i += 1) {
    const key = reqBodyKeys[i];
    if (key !== 'UserId') {
      req.body[key] = req.body[key].replace(/ +/g, ' ').trim();
    }
  }
}
