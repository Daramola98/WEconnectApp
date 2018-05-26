import { expect } from 'chai';
import * as userActions from '../../../store/actions/users';
import * as actionTypes from '../../../store/actions/actionTypes';

const user = {
  firstname: 'daramola',
  lastname: 'ajiboye',
  email: 'daramola@gmail.com',
  password: 'password'
};
const businesses = ['Andela', 'Intellia'];
const businessesCount = 10;

describe('User Actions', () => {
  describe('Register User', () => {
    it('should register a user', () => {
      const expectedAction = {
        type: actionTypes.REGISTER_USER,
        user
      };
      expect(userActions.registerUser(user)).to.be.eql(expectedAction);
    });
  });

  describe('Post ContactUs', () => {
    it('should post a contactUs message', () => {
      const expectedAction = {
        type: actionTypes.POST_CONTACTUS
      };
      expect(userActions.postsContactUs()).to.be.eql(expectedAction);
    });
  });

  describe('Update User', () => {
    it('should update a user details', () => {
      const expectedAction = {
        type: actionTypes.UPDATE_USER,
        user
      };
      expect(userActions.updatesUser(user)).to.be.eql(expectedAction);
    });
  });

  describe('fetch User Businesses', () => {
    it('should fetch a user\'s businesses', () => {
      const expectedAction = {
        type: actionTypes.FETCH_USER_BUSINESSES,
        businesses,
        businessesCount
      };
      expect(userActions.fetchUserBusinesses(businesses, businessesCount))
        .to.be.eql(expectedAction);
    });
  });

  describe('fetch User Businesses Failed', () => {
    it('should return no businesses', () => {
      const expectedAction = {
        type: actionTypes.FETCH_USER_BUSINESSES_FAILED,
      };
      expect(userActions.fetchUserBusinessesFailed())
        .to.be.eql(expectedAction);
    });
  });
});
