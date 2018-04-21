const contactUsValidation = {
  firstname: {
    trim: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Firstname should be a valid string'
    },
    errorMessage: 'Firstname is required'
  },
  lastname: {
    trim: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Lastname should be a valid string'
    },
    errorMessage: 'Lastname is required',
  },
  email: {
    trim: true,
    notEmpty: {
      errorMessage: 'Email is required',
    },
    isString: {
      errorMessage: 'Email should be a valid string'
    },
    isEmail: {
      errorMessage: 'Enter a Valid Email Address'
    },
  },
  message: {
    trim: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Message should be a valid string'
    },
    errorMessage: 'message is required'
  },
};

export default contactUsValidation;
