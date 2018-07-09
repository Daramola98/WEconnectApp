import moxios from 'moxios';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as userActions from '../../../store/actions/users';
import * as actionTypes from '../../../store/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndlY29ubmVjdEBhZG1pbi5jb20iLCJ1c2VySWQiOiIzZmU2OTMzMC1iNTAyLTQ1ZjAtYmMzYS0zZjg2MmNmZjVlMmQiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiQWRtaW4iLCJ1c2VybmFtZSI6IkFkbWluIiwidGVsZXBob25lTnVtYmVyIjoiMDcwMTEwMzE2MDkiLCJob21lTnVtYmVyIjpudWxsLCJpYXQiOjE1MjczMTI0NjMsImV4cCI6MTUyNzMzNDA2M30.yWlR2YsAHdMK_xJkOt_-g2CqAs-17pVJk5AFmx3ysRI';
const userDetails = {
  firstname: 'daramola',
  lastname: 'ajiboye',
  password: 'password',
  email: 'daramola@gmail.com'
};

describe('Async UserActions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('SignUp', () => {
    it('should register a user', () => {
      moxios.stubRequest('/api/v1/auth/signUp', {
        status: 201,
        response: {
          data: {
            createdUser: {
              firstname: 'daramola',
              lastname: 'ajiboye',
              email: 'daramola@gmail.com'
            },
            token
          }
        }
      });
      const expectedAction = [{
        type: actionTypes.USER_LOGGED_IN,
        user: {
          firstname: 'daramola',
          lastname: 'ajiboye',
          email: 'daramola@gmail.com'
        }
      }];
      const store = mockStore({ user: {} });

      return store.dispatch(userActions.signUp(userDetails))
        .then(() => {
          expect(store.getActions()[0].type).to.be.eql(expectedAction[0].type);
        });
    });
  });

  describe('Update User', () => {
    it('should update a user details', () => {
      moxios.stubRequest('/api/v1/auth/user', {
        status: 200,
        response: {
          data: {
            updatedUserDetails: {
              firstname: 'daramola',
              lastname: 'ajiboye',
              email: 'daramola@gmail.com'
            },
            token
          }
        }
      });
      const expectedAction = [{
        type: actionTypes.UPDATE_USER,
        user: {
          firstname: 'daramola',
          lastname: 'ajiboye',
          email: 'daramola@gmail.com'
        }
      }];
      const store = mockStore({ user: {} });

      return store.dispatch(userActions.updateUser(userDetails))
        .then(() => {
          expect(store.getActions()[0].type).to.be.eql(expectedAction[0].type);
        });
    });
  });

  describe('Fetch User Businesses', () => {
    it('should get a user\'s businesses', () => {
      moxios.stubRequest('/api/v1/businesses/user?pageNumber=1', {
        status: 200,
        response: {
          data: {
            businesses: ['Andela', 'Intellia', 'MTN'],
            businessesCount: 3
          }
        }
      });
      const expectedAction = [{
        type: actionTypes.FETCH_USER_BUSINESSES,
        businesses: ['Andela', 'Intellia', 'MTN'],
        businessesCount: 3
      }];

      const store = mockStore({ user: {} });

      return store.dispatch(userActions.getUserBusinesses(1))
        .then(() => {
          expect(store.getActions()[0].type).to.be.eql(expectedAction[0].type);
        });
    });
  });

  describe('Submit Contact Us Message', () => {
    it('should submit contact us message', () => {
      moxios.stubRequest('/api/v1/admin/contactUs', {
        status: 201,
        response: {
          data: {
            message: 'Thanks'
          }
        }
      });
      const expectedAction = [{
        type: actionTypes.POST_CONTACTUS,
      }];
      const store = mockStore({ user: {} });

      return store.dispatch(userActions.postContactUs())
        .then(() => {
          expect(store.getActions()).to.be.eql(expectedAction);
        });
    });
  });
});

