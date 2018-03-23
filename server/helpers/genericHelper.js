// REMOVES WHITESPACES
/**
 * Removes white space in the request body
 * @param {object} req - The request object
 * @return {null} removes whitespaces
 * @memberof Business
*/
export default function checkForWhiteSpace(req) {
  const reqBody = Object.keys(req.body);
  if (reqBody && reqBody.length > 0) {
    for (let i = 0; i < reqBody.length; i += 1) {
      if (reqBody[i] !== 'UserId' && reqBody[i] !== 'password') {
        req.body[reqBody[i]] = req.body[reqBody[i]].trim();
      }
    }
  }
}
