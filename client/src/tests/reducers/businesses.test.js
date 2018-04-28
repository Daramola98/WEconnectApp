import businessesReducer from '../../store/reducers/businesses';
import * as actionTypes from '../../store/actions/actionTypes';

describe('businesses reducer', () => {
  let initialState;
  let expectedState;
  beforeEach(() => {
    initialState = {
      businesses: [],
      businessesCount: 0,
      loading: false,
      noOfBusinessesCreated: 0,
      categories: [],
      businessUpdated: false,
      businessDeleted: false
    };
  });

  it('should return the initial state', () => {
    expect(businessesReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle the FETCH_BUSINESSES action', () => {
    expectedState = {
      businesses: [
        {
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
      ],
      businessesCount: 1,
      loading: false,
      noOfBusinessesCreated: 0,
      categories: [],
      businessUpdated: false,
      businessDeleted: false
    };

    expect(businessesReducer(initialState, {
      type: actionTypes.FETCH_BUSINESSES,
      businessList: [{
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
      }],
      businessesCount: 1
    })).toEqual(expectedState);
  });

  it('should handle the FETCH_BUSINESSES_FAILED action', () => {
    expectedState = {
      businesses: [],
      businessesCount: 0,
      loading: false,
      noOfBusinessesCreated: 0,
      categories: [],
      businessUpdated: false,
      businessDeleted: false
    };

    expect(businessesReducer(initialState, {
      type: actionTypes.FETCH_BUSINESSES_FAILED,
    })).toEqual(expectedState);
  });

  it('should handle the SEARCH_BUSINESS action', () => {
    expectedState = {
      businesses: [
        {
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
      ],
      businessesCount: 1,
      loading: false,
      noOfBusinessesCreated: 0,
      categories: [],
      businessUpdated: false,
      businessDeleted: false
    };

    expect(businessesReducer(initialState, {
      type: actionTypes.SEARCH_BUSINESS,
      result: [{
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
      }],
      businessesCount: 1
    })).toEqual(expectedState);
  });

  it('should handle the SEARCH_BUSINESS_FAILED action', () => {
    expectedState = {
      businesses: [],
      businessesCount: 0,
      loading: false,
      noOfBusinessesCreated: 0,
      categories: [],
      businessUpdated: false,
      businessDeleted: false
    };

    expect(businessesReducer(initialState, {
      type: actionTypes.SEARCH_BUSINESS_FAILED,
    })).toEqual(expectedState);
  });

  it('should handle the FETCH_CATEGORIES action', () => {
    expectedState = {
      businesses: [],
      businessesCount: 0,
      loading: false,
      noOfBusinessesCreated: 0,
      categories: ['GAMING', 'TECHNOLOGY'],
      businessUpdated: false,
      businessDeleted: false
    };

    expect(businessesReducer(initialState, {
      type: actionTypes.FETCH_CATEGORIES,
      categories: ['GAMING', 'TECHNOLOGY']
    })).toEqual(expectedState);
  });

  it('should handle the REGISTER_BUSINESS action', () => {
    expectedState = {
      businesses: [],
      businessesCount: 0,
      loading: false,
      noOfBusinessesCreated: 1,
      categories: [],
      businessUpdated: false,
      businessDeleted: false
    };

    expect(businessesReducer(initialState, {
      type: actionTypes.REGISTER_BUSINESS,
    })).toEqual(expectedState);
  });

  it('should handle the UPDATE_BUSINESS action', () => {
    expectedState = {
      businesses: [],
      businessesCount: 0,
      loading: false,
      noOfBusinessesCreated: 0,
      categories: [],
      businessUpdated: true,
      businessDeleted: false
    };

    expect(businessesReducer(initialState, {
      type: actionTypes.UPDATE_BUSINESS,
    })).toEqual(expectedState);
  });

  it('should handle the DELETE_BUSINESS action', () => {
    expectedState = {
      businesses: [],
      businessesCount: 0,
      loading: false,
      noOfBusinessesCreated: 0,
      categories: [],
      businessUpdated: false,
      businessDeleted: true
    };

    expect(businessesReducer(initialState, {
      type: actionTypes.DELETE_BUSINESS,
    })).toEqual(expectedState);
  });
});

