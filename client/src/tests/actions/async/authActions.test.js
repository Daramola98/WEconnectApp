import moxios from 'moxios';
import jwtDecode from 'jwt-decode';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as authActions from '../../../store/actions/auth';
import * as actionTypes from '../../../store/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const credentials = { username: 'daramola', password: 'password' };
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndlY29ubmVjdEBhZG1pbi5jb20iLCJ1c2VySWQiOiIzZmU2OTMzMC1iNTAyLTQ1ZjAtYmMzYS0zZjg2MmNmZjVlMmQiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiQWRtaW4iLCJ1c2VybmFtZSI6IkFkbWluIiwidGVsZXBob25lTnVtYmVyIjoiMDcwMTEwMzE2MDkiLCJob21lTnVtYmVyIjpudWxsLCJpYXQiOjE1MjczMTI0NjMsImV4cCI6MTUyNzMzNDA2M30.yWlR2YsAHdMK_xJkOt_-g2CqAs-17pVJk5AFmx3ysRI';
const user2 = jwtDecode(token);

describe('Async AuthActions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('login', () => {
    it('should login a user', () => {
      moxios.stubRequest('/api/v1/auth/login', {
        status: 200,
        response: {
          data: {
            user: {
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
        user: undefined
      }];
      const store = mockStore({ user: {} });
      store.dispatch(authActions.login(credentials))
        .then(() => {
          expect(store.getActions()).to.be.eql(expectedAction);
        });
    });
  });

  describe('logout', () => {
    it('should dispatch userlogged out action', () => {
      const expectedAction = [{
        type: actionTypes.USER_LOGGED_OUT,
      }];
      const store = mockStore({ user: {} });
      store.dispatch(authActions.logout());
      expect(store.getActions()).to.be.eql(expectedAction);
    });
  });

  describe('isLoggedIn', () => {
    it('should dispatch isLoggedIn action', () => {
      const expectedAction = [{
        type: actionTypes.USER_LOGGED_IN,
        user: user2
      }];
      const store = mockStore({ user: {} });
      store.dispatch(authActions.isLoggedIn(token));
      expect(store.getActions()).to.be.eql(expectedAction);
    });
  });
});

