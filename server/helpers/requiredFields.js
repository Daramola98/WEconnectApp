const businessValidationRules = {
  name: {
    notEmpty: true,
    errorMessage: 'Your Business name is required'
  },
  description: {
    notEmpty: true,
    errorMessage: 'Business description is required'
  },
  location: {
    notEmpty: true,
    errorMessage: 'Business Location is required',
  },
  category: {
    notEmpty: true,
    errorMessage: 'Business Category is required'
  },
  email: {
    notEmpty: true,
    errorMessage: 'Email is required'
  },
  telephoneNumber: {
    notEmpty: true,
    errorMessage: 'Telephone Number is required'
  },
  homeNumber: {
    notEmpty: false,
    optional: true,
    errorMessage: 'Home Number is required'
  },
  address: {
    notEmpty: true,
    errorMessage: 'Address is required'
  }
};

const userValidationRules = {
  firstname: {
    notEmpty: true,
    errorMessage: 'Your first name is required',
    type: 'string'
  },
  lastname: {
    notEmpty: true,
    errorMessage: 'Your lastname name is required',
    type: 'string'
  },
  password: {
    notEmpty: true,
    errorMessage: 'Password is required',
    type: 'string'
  },
  email: {
    notEmpty: true,
    errorMessage: 'Email is required',
    type: 'string'
  },
  telephoneNumber: {
    notEmpty: true,
    errorMessage: 'Telephone Number is required',
    type: 'string'
  },
  homeNumber: {
    notEmpty: false,
    optional: true,
    errorMessage: 'Home Number is required',
    type: 'string'
  },
};

export default { businessValidationRules, userValidationRules };
