import businessProfileReducer from '../../reducers/businessProfile';
import * as actionTypes from '../../actions/actionTypes';

describe('businessProfile reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      business: {},
      reviews: [],
      reviewsCount: 0,
      reviewSubmitted: false,
      reviewDeleted: false,
      reviewUpdated: false
    };
  });

  it('should return the initial state', () => {
    expect(businessProfileReducer(undefined, {})).toEqual(initialState);
  });

  it('should set the current business when the SET_BUSINESS_PROFILE action is called', () => {
    const expectedState = {
      business: {
        id: '62ae7f5b-2d23-4052-a84e-f1305033b801',
        name: 'Andela',
        businessOwner: 'Admin',
        location: 'LAGOS',
        category: 'TECHNOLOGY',
        email: 'andela@gmail.com',
        address: '235, Ikorodu Road Lagos',
        telephoneNumber: '07011031709',
        homeNumber: '07011031609',
        description: 'Andela is raising a new generation of world class leaders',
        createdAt: '2018-04-20T22:26:53.513Z',
        updatedAt: '2018-04-20T22:26:53.513Z',
        userId: '01866693-a2bb-4c4c-8b0d-a6427f49301f'
      },
      reviews: [],
      reviewsCount: 0,
      reviewSubmitted: false,
      reviewDeleted: false,
      reviewUpdated: false
    };
    expect(businessProfileReducer(
      initialState,
      {
        type: actionTypes.SET_BUSINESS_PROFILE,
        business: {
          id: '62ae7f5b-2d23-4052-a84e-f1305033b801',
          name: 'Andela',
          businessOwner: 'Admin',
          location: 'LAGOS',
          category: 'TECHNOLOGY',
          email: 'andela@gmail.com',
          address: '235, Ikorodu Road Lagos',
          telephoneNumber: '07011031709',
          homeNumber: '07011031609',
          description: 'Andela is raising a new generation of world class leaders',
          createdAt: '2018-04-20T22:26:53.513Z',
          updatedAt: '2018-04-20T22:26:53.513Z',
          userId: '01866693-a2bb-4c4c-8b0d-a6427f49301f'
        }
      }
    )).toEqual(expectedState);
  });

  it('should fetch business reviews when the FETCH_BUSINESS_REVIEWS action is called', () => {
    const expectedState = {
      business: {},
      reviews: [{
        id: 'ee7ddbd7-3b59-4dea-8da2-6712ddda62fa',
        reviewerId: '01866693-a2bb-4c4c-8b0d-a6427f49301f',
        reviewer: 'Admin',
        review: 'Lol',
        createdAt: '2018-04-23T05:46:18.164Z',
        updatedAt: '2018-04-23T05:46:18.164Z',
        businessId: '62ae7f5b-2d23-4052-a84e-f1305033b801',
        responses: []
      }],
      reviewsCount: 1,
      reviewSubmitted: false,
      reviewDeleted: false,
      reviewUpdated: false
    };
    expect(businessProfileReducer(
      initialState,
      {
        type: actionTypes.FETCH_BUSINESS_REVIEWS,
        reviews: [{
          id: 'ee7ddbd7-3b59-4dea-8da2-6712ddda62fa',
          reviewerId: '01866693-a2bb-4c4c-8b0d-a6427f49301f',
          reviewer: 'Admin',
          review: 'Lol',
          createdAt: '2018-04-23T05:46:18.164Z',
          updatedAt: '2018-04-23T05:46:18.164Z',
          businessId: '62ae7f5b-2d23-4052-a84e-f1305033b801',
          responses: []
        }],
        reviewsCount: 1
      }
    )).toEqual(expectedState);
  });

  it('should return an empty reviews array if no business reviews where found', () => {
    const expectedState = {
      business: {},
      reviews: [],
      reviewsCount: 0,
      reviewSubmitted: false,
      reviewDeleted: false,
      reviewUpdated: false
    };
    expect(businessProfileReducer(
      initialState,
      {
        type: actionTypes.FETCH_BUSINESS_REVIEWS_FAILED,
      }
    )).toEqual(expectedState);
  });

  it('should handle the POST_REVIEW action ', () => {
    const expectedState = {
      business: {},
      reviews: [],
      reviewsCount: 0,
      reviewSubmitted: true,
      reviewDeleted: false,
      reviewUpdated: false
    };
    expect(businessProfileReducer(
      initialState,
      {
        type: actionTypes.POST_REVIEW,
      }
    )).toEqual(expectedState);
  });

  it('should handle the UPDATE_REVIEW action ', () => {
    const expectedState = {
      business: {},
      reviews: [],
      reviewsCount: 0,
      reviewSubmitted: false,
      reviewDeleted: false,
      reviewUpdated: true
    };
    expect(businessProfileReducer(
      initialState,
      {
        type: actionTypes.UPDATE_REVIEW,
      }
    )).toEqual(expectedState);
  });

  it('should handle the DELETE_REVIEW action ', () => {
    const expectedState = {
      business: {},
      reviews: [],
      reviewsCount: 0,
      reviewSubmitted: false,
      reviewDeleted: true,
      reviewUpdated: false
    };
    expect(businessProfileReducer(
      initialState,
      {
        type: actionTypes.DELETE_REVIEW,
      }
    )).toEqual(expectedState);
  });
});

