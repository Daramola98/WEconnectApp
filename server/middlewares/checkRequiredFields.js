// /**
//    * Checks if fields provided in the request body have their correct types
//    * @param {object} model - The model to be validated
//    * @param {object} validationRules - The validation rules
//    * @return {array} A list of validation errors
//    * @memberof checkRequiredFields
//    */
// function validateDataTypes(model, validationRules) {
//   const modelKeys = Object.keys(model);
//   const errors = [];

//   for (let i = 0; i < modelKeys; i += 1) {
//     const field = modelKeys[i];
//     if (validationRules[field]) {
//       const fieldType = validationRules[field].type;
//       const fieldValue = model[field];
//       let typeValid = true;
//       switch (fieldType) {
//         case 'string':
//           typeValid = (typeof fieldValue) === 'string';
//           break;
//         case 'number':
//           typeValid = (typeof fieldValue) === 'number';
//           break;
//         default:
//       }

//       if (!typeValid) {
//         errors.push({ message: `${field} is not of type ${fieldType}` });
//       }
//     }
//   }

//   return errors;
// }

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
    errors.concat(req.validationErrors(), validateDataTypes(req.body, validationRules));

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
