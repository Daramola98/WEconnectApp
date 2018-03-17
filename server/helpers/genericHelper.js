// REMOVES WHITESPACES
/**
 * Removes white space in the request body
 * @param {object} req - The request object
 * @return {object} Success message with the business deleted or error message
 * @memberof Business
*/
export default function checkForWhiteSpace(req) {
  const reqBody = Object.keys(req.body);
  for (let i = 0; i < reqBody.length; i += 1) {
    req.body[reqBody[i]] = req.body[reqBody[i]].trim();
  }
}
