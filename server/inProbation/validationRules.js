export const businessValidationRules = {
  name: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Business name is required',
  },
  description: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Business description is required'
  },
  location: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Business Location is required',
  },
  category: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Business Category is required'
  },
  email: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Email is required'
  },
  telephoneNumber: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Telephone Number is required'
  },
  homeNumber: {
    trim: true,
    notEmpty: false,
    optional: true,
    errorMessage: 'Home Number is required'
  },
  address: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Address is required'
  }
};
export const businessUpdateValidationRules = {
  name: {
    notEmpty: true,
    errorMessage: 'Business name is required',
    optional: true
  },
  description: {
    optional: true,
    notEmpty: true,
    errorMessage: 'Business description is required'
  },
  location: {
    optional: true,
    notEmpty: true,
    errorMessage: 'Business Location is required',
  },
  category: {
    optional: true,
    notEmpty: true,
    errorMessage: 'Business Category is required'
  },
  email: {
    optional: true,
    notEmpty: true,
    errorMessage: 'Email is required'
  },
  telephoneNumber: {
    optional: true,
    notEmpty: true,
    errorMessage: 'Telephone Number is required'
  },
  homeNumber: {
    notEmpty: false,
    optional: true,
    errorMessage: 'Home Number is required'
  },
  address: {
    optional: true,
    notEmpty: true,
    errorMessage: 'Address is required'
  }
};

export const userValidationRules = {
  firstname: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Firstname is required'
  },
  lastname: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Lastname name is required',
  },
  password: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Password is required',
  },
  email: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Email is required',
  },
  telephoneNumber: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Telephone Number is required',
  },
  homeNumber: {
    trim: true,
    notEmpty: false,
    optional: true,
    errorMessage: 'Home Number is required',
  },
};
export const userUpdateValidationRules = {
  firstname: {
    trim: true,
    optional: true,
    notEmpty: true,
    errorMessage: 'Firstname is required'
  },
  lastname: {
    trim: true,
    optional: true,
    notEmpty: true,
    errorMessage: 'Lastname name is required',
  },
  password: {
    trim: true,
    optional: true,
    notEmpty: true,
    errorMessage: 'Password is required',
  },
  email: {
    trim: true,
    optional: true,
    notEmpty: true,
    errorMessage: 'Email is required',
  },
  telephoneNumber: {
    trim: true,
    optional: true,
    notEmpty: true,
    errorMessage: 'Telephone Number is required',
  },
  homeNumber: {
    trim: true,
    notEmpty: false,
    optional: true,
    errorMessage: 'Home Number is required',
  },
};

