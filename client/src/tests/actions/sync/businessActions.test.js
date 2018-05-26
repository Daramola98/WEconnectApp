import { expect } from 'chai';
import * as businessActions from '../../../store/actions/businesses';
import * as actionTypes from '../../../store/actions/actionTypes';

const business = {
  name: 'Andela',
  location: 'Lagos',
  category: 'Technology'
};
const businessCount = 10;
const categories = ['Gaming'];
const result = ['Andela'];

describe('Business Actions', () => {
  describe('Register Business', () => {
    it('should register a business', () => {
      const expectedAction = {
        type: actionTypes.REGISTER_BUSINESS
      };
      expect(businessActions.registerBusiness()).to.be.eql(expectedAction);
    });
  });

  describe('Update Business', () => {
    it('should update a business', () => {
      const expectedAction = {
        type: actionTypes.UPDATE_BUSINESS
      };
      expect(businessActions.updatesBusiness()).to.be.eql(expectedAction);
    });
  });

  describe('Searches Business', () => {
    it('should search for a business', () => {
      const expectedAction = {
        type: actionTypes.SEARCH_BUSINESS,
        result,
        businessesCount: businessCount
      };
      expect(businessActions.searchesBusiness(result, businessCount)).to.be.eql(expectedAction);
    });
  });

  describe('Fetch Categories', () => {
    it('should fetch categories for businesses', () => {
      const expectedAction = {
        type: actionTypes.FETCH_CATEGORIES,
        categories
      };
      expect(businessActions.fetchesCategories(categories)).to.be.eql(expectedAction);
    });
  });

  describe('SearchBusinessFailed Action', () => {
    it('should return no businesses', () => {
      const expectedAction = {
        type: actionTypes.SEARCH_BUSINESS_FAILED
      };
      expect(businessActions.searchesBusinessFailed()).to.be.eql(expectedAction);
    });
  });

  describe('FetchBusinessesFailed Action', () => {
    it('should return no businesses', () => {
      const expectedAction = {
        type: actionTypes.FETCH_BUSINESSES_FAILED
      };
      expect(businessActions.fetchBusinessesFailed()).to.be.eql(expectedAction);
    });
  });

  describe('Delete Business Action', () => {
    it('should delete a business', () => {
      const expectedAction = {
        type: actionTypes.DELETE_BUSINESS
      };
      expect(businessActions.deletesBusiness()).to.be.eql(expectedAction);
    });
  });

  describe('Set Business Profile Action', () => {
    it('should set a business profile', () => {
      const expectedAction = {
        type: actionTypes.SET_BUSINESS_PROFILE,
        business
      };
      expect(businessActions.setBusinessProfile(business)).to.be.eql(expectedAction);
    });
  });
});

