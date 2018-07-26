import { expect } from 'chai';
import * as authActions from '../../../actions/auth';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../../../actions/actionTypes';

const user = {
  firstname: 'Daramola',
  lastname: 'Ajiboye',
  email: 'daramola@gmail.com',
  password: 'password'
};

describe('Authentication actions', () => {
  describe('userLoggedIn', () => {
    it('should check if a user is logged in', () => {
      const expectedAction = {
        type: USER_LOGGED_IN,
        user: {
          firstname: 'Daramola',
          lastname: 'Ajiboye',
          email: 'daramola@gmail.com',
          password: 'password'
        }
      };
      expect(authActions.userLoggedIn(user))
        .to.eql(expectedAction);
    });
  });

  describe('userLoggedOut', () => {
    it('should log out a user', () => {
      const expectedAction = {
        type: USER_LOGGED_OUT,
      };

      expect(authActions.userLoggedOut())
        .to.eql(expectedAction);
    });
  });
});

