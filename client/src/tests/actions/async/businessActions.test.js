import moxios from 'moxios';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as businessActions from '../../../actions/businesses';
import * as actionTypes from '../../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const businessDetails = {
  name: 'Andela',
  location: 'Lagos',
  category: 'Technology'
};
const businessId = 'b480cd56-7089-4210-939d-e89af667a1fc';

describe('Async Business Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Fetch Businesses', () => {
    it('should fetch all businesses', () => {
      moxios.stubRequest('/api/v1/businesses?pageNumber=1', {
        status: 200,
        response: {
          data: {
            businesses: ['Andela', 'Intellia', 'MTN'],
            businessesCount: 3
          }
        }
      });

      const expectedAction = [{
        type: actionTypes.FETCH_BUSINESSES,
        businessList: ['Andela', 'Intellia', 'MTN'],
        businessesCount: 3
      }];

      const store = mockStore({ businesses: [] });
      return store.dispatch(businessActions.fetchBusinesses(1))
        .then(() => {
          expect(store.getActions()[0].type).to.be.eql(expectedAction[0].type);
        });
    });

    it('should return no business when request fails', () => {
      moxios.stubRequest('/api/v1/businesses?pageNumber=1', {
        status: 404,
        response: {
          error: {
            msg: 'Resource not found'
          }
        }
      });

      const expectedAction = [{
        type: actionTypes.FETCH_BUSINESSES_FAILED,
      }];

      const store = mockStore({ businesses: {} });

      return store.dispatch(businessActions.fetchBusinesses(1))
        .then(() => {
          expect(store.getActions()).to.be.eql(expectedAction);
        });
    });
  });

  describe('Fetch Categories', () => {
    it('should fetch businesses categories', () => {
      moxios.stubRequest('/api/v1/admin/businessCategory', {
        status: 200,
        response: {
          data: ['Technology', 'Cooking']
        }
      });

      const expectedAction = [{
        type: actionTypes.FETCH_CATEGORIES,
        categories: ['Technolgy', 'Cooking']
      }];

      const store = mockStore({ businesses: [] });

      return store.dispatch(businessActions.fetchCategories())
        .then(() => {
          expect(store.getActions()[0].type).to.be.eql(expectedAction[0].type);
        });
    });
  });

  describe('Create Business', () => {
    it('should create a business', () => {
      moxios.stubRequest('/api/v1/businesses', {
        status: 201,
        response: {
          data: {
            businesses: ['Andela'],
          }
        }
      });

      const expectedAction = [{
        type: actionTypes.REGISTER_BUSINESS,
      }];

      const store = mockStore({ businesses: [] });

      return store.dispatch(businessActions.createBusiness(businessDetails))
        .then(() => {
          expect(store.getActions()).to.be.eql(expectedAction);
        });
    });
  });

  describe('Update Business', () => {
    it('should update a business', () => {
      moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
        status: 200,
        response: {
          data: {
            msg: 'Business Updated',
          }
        }
      });

      const expectedAction = [{
        type: actionTypes.UPDATE_BUSINESS,
      }];

      const store = mockStore({ businesses: [] });

      return store.dispatch(businessActions.updateBusiness(businessId, businessDetails))
        .then(() => {
          expect(store.getActions()).to.be.eql(expectedAction);
        });
    });
  });
  describe('Delete Business', () => {
    it('should delete a business', () => {
      moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
        status: 200,
        response: {
          data: {
            msg: 'Business Deleted',
          }
        }
      });

      const expectedAction = [{
        type: actionTypes.DELETE_BUSINESS,
      }];

      const store = mockStore({ businesses: [] });

      return store.dispatch(businessActions.deleteBusiness(businessId))
        .then(() => {
          expect(store.getActions()).to.be.eql(expectedAction);
        });
    });
  });

  describe('Fetch Business', () => {
    it('should fetch a business', () => {
      moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
        status: 200,
        response: {
          data: {
            business: ['Andela'],
          }
        }
      });

      const expectedAction = [{
        type: actionTypes.SET_BUSINESS_PROFILE,
      }];

      const store = mockStore({ businesses: [] });

      return store.dispatch(businessActions.fetchBusiness(businessId))
        .then(() => {
          expect(store.getActions()[0].type).to.be.eql(expectedAction[0].type);
        });
    });
  });

  describe('Search Business', () => {
    it('should search for a business', () => {
      moxios.stubRequest('/api/v1/businesses?location=lagos&pageNumber=1', {
        status: 200,
        response: {
          data: {
            businesses: ['Andela'],
            businessesCount: 1
          }
        }
      });

      const expectedAction = [{
        type: actionTypes.SEARCH_BUSINESS,
      }];

      const store = mockStore({ businesses: [] });

      return store.dispatch(businessActions.searchBusiness('location', 'lagos', 1))
        .then(() => {
          expect(store.getActions()[0].type).to.be.eql(expectedAction[0].type);
        });
    });

    it('should dispatch searchBusinessFailed action if the response is an error', () => {
      moxios.stubRequest('/api/v1/businesses?location=lagos&pageNumber=1', {
        status: 404,
        response: {
          error: {
            msg: 'Business Not Found'
          }
        }
      });

      const expectedAction = [{
        type: actionTypes.SEARCH_BUSINESS_FAILED,
      }];

      const store = mockStore({ businesses: [] });

      return store.dispatch(businessActions.searchBusiness('location', 'lagos', 1))
        .then(() => {
          expect(store.getActions()).to.be.eql(expectedAction);
        });
    });
  });
});
