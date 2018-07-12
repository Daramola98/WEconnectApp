import usersReducer from '../../reducers/users';
import * as actionTypes from '../../actions/actionTypes';

describe('users reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      user: {},
      businesses: [],
      businessesCount: 0,
      authenticated: false,
      contactUsSubmitted: false
    };
  });

  it('should return the initial state', () => {
    expect(usersReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle the USER_LOGGED_IN action', () => {
    const expectedState = {
      user: {
        firstname: 'Daramola',
        lastname: 'Ajiboye',
        username: 'Daramola98',
        token: 'user-token'
      },
      businesses: [],
      businessesCount: 0,
      authenticated: true,
      contactUsSubmitted: false
    };
    expect(usersReducer(initialState, {
      type: actionTypes.USER_LOGGED_IN,
      user: {
        firstname: 'Daramola',
        lastname: 'Ajiboye',
        username: 'Daramola98',
        token: 'user-token'
      }
    })).toEqual(expectedState);
  });

  it('should handle USER_LOGGED_OUT action', () => {
    const expectedState = {
      user: {},
      businesses: [],
      businessesCount: 0,
      authenticated: false,
      contactUsSubmitted: false
    };
    expect(usersReducer(initialState, {
      type: actionTypes.USER_LOGGED_OUT
    })).toEqual(expectedState);
  });

  it('should handle POST_CONTACTUS action', () => {
    const expectedState = {
      user: {},
      businesses: [],
      businessesCount: 0,
      authenticated: false,
      contactUsSubmitted: true
    };
    expect(usersReducer(initialState, {
      type: actionTypes.POST_CONTACTUS
    })).toEqual(expectedState);
  });

  it('should handle the UPDATE_USER action', () => {
    initialState = {
      user: {
        firstname: 'Daramola',
        lastname: 'Ajiboye',
        username: 'Daramola98',
        token: 'user-token'
      },
      businesses: [],
      businessesCount: 0,
      authenticated: true,
      contactUsSubmitted: false
    };

    const expectedState = {
      user: {
        firstname: 'Daramola',
        lastname: 'Ajiboye',
        username: 'Daramola89',
        token: 'user-token'
      },
      businesses: [],
      businessesCount: 0,
      authenticated: true,
      contactUsSubmitted: false
    };

    expect(usersReducer(initialState, {
      type: actionTypes.UPDATE_USER,
      user: {
        firstname: 'Daramola',
        lastname: 'Ajiboye',
        username: 'Daramola89',
        token: 'user-token'
      }
    })).toEqual(expectedState);
  });

  it('should handle the FETCH_USER_BUSINESSES action', () => {
    initialState = {
      user: {
        firstname: 'Daramola',
        lastname: 'Ajiboye',
        username: 'Daramola98',
        token: 'user-token'
      },
      businesses: [],
      businessesCount: 0,
      authenticated: true,
      contactUsSubmitted: false
    };

    const expectedState = {
      user: {
        firstname: 'Daramola',
        lastname: 'Ajiboye',
        username: 'Daramola98',
        token: 'user-token'
      },
      businesses: [{
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
      businessesCount: 1,
      authenticated: true,
      contactUsSubmitted: false
    };

    expect(usersReducer(initialState, {
      type: actionTypes.FETCH_USER_BUSINESSES,
      businesses: [{
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

  it('should handle the FETCH_USER_BUSINESSES_FAILED action', () => {
    initialState = {
      user: {
        firstname: 'Daramola',
        lastname: 'Ajiboye',
        username: 'Daramola98',
        token: 'user-token'
      },
      businesses: [{
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
      businessesCount: 1,
      authenticated: true,
      contactUsSubmitted: false
    };

    const expectedState = {
      user: {
        firstname: 'Daramola',
        lastname: 'Ajiboye',
        username: 'Daramola98',
        token: 'user-token'
      },
      businesses: [],
      businessesCount: 0,
      authenticated: true,
      contactUsSubmitted: false
    };

    expect(usersReducer(initialState, {
      type: actionTypes.FETCH_USER_BUSINESSES_FAILED,
    })).toEqual(expectedState);
  });

  it('should handle POST_CONTACTUS action', () => {
    const expectedState = {
      user: {},
      businesses: [],
      businessesCount: 0,
      authenticated: false,
      contactUsSubmitted: true
    };
    expect(usersReducer(initialState, {
      type: actionTypes.POST_CONTACTUS
    })).toEqual(expectedState);
  });
});

