import React from 'react';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import BusinessListingContainer from '../../containers/businessList';
import BusinessListing from '../../components/Businesses/smart/BusinessListing.jsx';
import Business from '../../components/Businesses/presentational/Business.jsx';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let props;
const setup = () => {
  props = {
    locations: ['lagos', 'abuja'],
    history: { push: jest.fn() },
    searchBusiness: jest.fn(() => Promise.resolve()),
    fetchCategories: jest.fn(() => Promise.resolve()),
    fetchBusinesses: jest.fn(() => Promise.resolve()),
    businessList: {
      businesses: [{
        name: 'Andela',
        location: 'Lagos',
        category: 'Technology',
        description: 'Nice Business'
      },
      {
        name: 'Andela Kenya',
        location: 'Bayelsa',
        category: 'Technology',
        description: 'Nice Business'
      }],
      categories: ['Technology', 'Gaming'],
      businessesCount: 5
    },
    handleSearchSubmit: jest.fn(() => Promise.resolve())
  };
  return shallow(<BusinessListing { ...props } />);
};

let wrapper = setup();
const action = wrapper.instance();
describe('Component: BusinessListing', () => {
  it('it should render review business form', () => {
    expect(wrapper.exists(<h3 className="black-text">Search Businesses</h3>)).toBe(true);
  });
});

describe('componentDidMount()', () => {
  it('should call componentDidMount()', () => {
    action.componentDidMount();
  });
});

describe('Submit function', () => {
  it('should submit business information', () => {
    const fakeEvent = { preventDefault: () => ({}) };
    const SearchBusinessForm = wrapper.find('form');
    wrapper.setState({
      searchBy: 'location',
      advancedSearch: 'Andela',
      searchCurrentPage: 1
    });

    SearchBusinessForm.simulate('submit', fakeEvent);
  });
});

describe('onSearchChangePage()', () => {
  it('should call onSearchChangePage', () => {
    const onSearchChangePage = jest.spyOn(wrapper.instance(), 'onSearchChangePage');
    action.onSearchChangePage(1);
    expect(onSearchChangePage).toBeCalled();
  });
});

describe('onChangePage()', () => {
  it('should call onChangePage', () => {
    const onChangePage = jest.spyOn(wrapper.instance(), 'onChangePage');
    action.onChangePage(1);
    expect(onChangePage).toBeCalled();
  });
});

describe('onAdvancedSearchChange()', () => {
  it('should call onAdvancedSearchChange', () => {
    const onAdvancedSearchChange = jest.spyOn(wrapper.instance(), 'onAdvancedSearchChange');
    action.onAdvancedSearchChange({
      target: 'search',
      value: 'Andela'
    });
    expect(onAdvancedSearchChange).toBeCalled();
  });
});

describe('onSearchChange()', () => {
  it('should call onSearchChange', () => {
    const onSearchChange = jest.spyOn(wrapper.instance(), 'onSearchChange');
    action.onSearchChange({
      target: 'search',
      value: 'Andela'
    });
    expect(onSearchChange).toBeCalled();
  });
});

describe('onSearchByChange()', () => {
  it('should call onSearchByChange', () => {
    const onSearchByChange = jest.spyOn(wrapper.instance(), 'onSearchByChange');
    action.onSearchByChange({
      target: 'search',
      value: 'Andela'
    });
    expect(onSearchByChange).toBeCalled();
  });
});

describe('onLocationChange()', () => {
  it('should call onLocationChange', () => {
    const onLocationChange = jest.spyOn(wrapper.instance(), 'onLocationChange');
    action.onLocationChange({
      target: 'search',
      value: 'Andela'
    });
    expect(onLocationChange).toBeCalled();
  });
});

describe('onCategoryChange()', () => {
  it('should call onCategoryChange', () => {
    const onCategoryChange = jest.spyOn(wrapper.instance(), 'onCategoryChange');
    action.onCategoryChange({
      target: 'search',
      value: 'Andela'
    });
    expect(onCategoryChange).toBeCalled();
  });
});


describe('componentDidMount()', () => {
  it('should call componentDidMount', () => {
    const componentDidMount = jest.spyOn(wrapper.instance(), 'componentDidMount');
    action.componentDidMount();
    expect(componentDidMount).toBeCalled();
  });
});

describe('BusinessListingContainer', () => {
  it('it should render the component successfully', () => {
    const store = mockStore({
      usersReducers: {
        user: {
          firstname: 'Admin'
        },
        authenticated: false
      },
      businessesReducer: {
        businessList: [{
          name: 'Andela',
          location: 'Lagos',
          category: 'Technology',
          description: 'Nice Business'
        },
        {
          name: 'Andela Kenya',
          location: 'Bayelsa',
          category: 'Technology',
          description: 'Nice Business'
        }],
        categories: ['Technology', 'Gaming']
      }
    });
    wrapper = shallow(<BusinessListingContainer store={ store } />);
    expect(wrapper.length).toBe(1);
  });
});

