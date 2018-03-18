import bcrypt from 'bcrypt';

const userDetails = {
  firstname: 'Damilola',
  lastname: 'Ajiboye',
  email: 'damilolaajiboye@live.com',
  password: bcrypt.hashSync('dammyro1000', bcrypt.genSaltSync(10)),
  telephoneNumber: '07066455523',
  homeNumber: '08043553081',
};

const userDetails1 = {
  firstname: 'Damilola',
  lastname: 'Ajiboye',
  email: 'damilolaajiboye@live.com',
  password: 'dammyro1000',
  telephoneNumber: '07066455523',
  homeNumber: '08043553081',
};

export default { userDetails, userDetails1 };
