import React from 'react';
import { shallow } from 'enzyme';
import RegisterBusinessForm from '../../../components/Forms/RegisterBusinessForm';

describe('<RegisterBusinessForm />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RegisterBusinessForm
         submit={() => wrapper.setState({ submitted: true })}
         categories={['Technology', 'Gaming']} />);
  });

  describe('Business Name input', () => {
    it('should respond to change event and change the state of the RegisterBusinessForm Component', () => {
      wrapper.setState({
        business: {
          name: '',
          location: 'null',
          category: 'null',
          description: '',
          email: '',
          address: '',
          telephoneNumber: '',
          homeNumber: ''
        }
      });
      wrapper.find('#name').simulate('change', { target: { name: 'name', value: 'Andela' } });
      expect(wrapper.state().business.name).toEqual('Andela');
    });
  });

  describe('Location input', () => {
    it('should respond to change event and change the state of the RegisterBusinessForm Component', () => {
      wrapper.setState({
        business: {
          name: '',
          location: 'null',
          category: 'null',
          description: '',
          email: '',
          address: '',
          telephoneNumber: '',
          homeNumber: ''
        }
      });
      wrapper.find('#location').simulate('change', { target: { name: 'location', value: 'Lagos' } });
      expect(wrapper.state().business.location).toEqual('Lagos');
    });
  });

  describe('Category input', () => {
    it('should respond to change event and change the state of the RegisterBusinessForm Component', () => {
      wrapper.setState({
        business: {
          name: '',
          location: 'null',
          category: 'null',
          description: '',
          email: '',
          address: '',
          telephoneNumber: '',
          homeNumber: ''
        }
      });
      wrapper.find('#category').simulate('change', { target: { name: 'category', value: 'Technology' } });
      expect(wrapper.state().business.category).toEqual('Technology');
    });
  });

  describe('Description input', () => {
    it('should respond to change event and change the state of the RegisterBusinessForm Component', () => {
      wrapper.setState({
        business: {
          name: '',
          location: '',
          category: '',
          description: '',
          email: '',
          address: '',
          telephoneNumber: '',
          homeNumber: ''
        }
      });
      wrapper.find('#description').simulate('change', { target: { name: 'description', value: 'Very Nice Business' } });
      expect(wrapper.state().business.description).toEqual('Very Nice Business');
    });
  });

  describe('Email input', () => {
    it('should respond to change event and change the state of the RegisterBusinessForm Component', () => {
      wrapper.setState({
        business: {
          name: '',
          location: 'null',
          category: 'null',
          description: '',
          email: '',
          address: '',
          telephoneNumber: '',
          homeNumber: ''
        }
      });
      wrapper.find('#email').simulate('change', { target: { name: 'email', value: 'andela@gmail.com' } });
      expect(wrapper.state().business.email).toEqual('andela@gmail.com');
    });
  });

  describe('TelephoneNumber input', () => {
    it('should respond to change event and change the state of the RegisterBusinessForm Component', () => {
      wrapper.setState({
        business: {
          name: '',
          location: 'null',
          category: 'null',
          description: '',
          email: '',
          address: '',
          telephoneNumber: '',
          homeNumber: ''
        }
      });
      wrapper.find('#telephoneNumber').simulate('change', { target: { name: 'telephoneNumber', value: '08023112081' } });
      expect(wrapper.state().business.telephoneNumber).toEqual('08023112081');
    });
  });

  describe('HomeNumber input', () => {
    it('should respond to change event and change the state of the RegisterBusinessForm Component', () => {
      wrapper.setState({
        business: {
          name: '',
          location: 'null',
          category: 'null',
          description: '',
          email: '',
          address: '',
          telephoneNumber: '',
          homeNumber: ''
        }
      });
      wrapper.find('#homeNumber').simulate('change', { target: { name: 'homeNumber', value: '08022235913' } });
      expect(wrapper.state().business.homeNumber).toEqual('08022235913');
    });
  });

  describe('Address input', () => {
    it('should respond to change event and change the state of the RegisterBusinessForm Component', () => {
      wrapper.setState({
        business: {
          name: '',
          location: 'null',
          category: 'null',
          description: '',
          email: '',
          address: '',
          telephoneNumber: '',
          homeNumber: ''
        }
      });
      wrapper.find('#address').simulate('change', { target: { name: 'address', value: 'Jakande Lagos' } });
      expect(wrapper.state().business.address).toEqual('Jakande Lagos');
    });
  });

  describe('RegisterBusinessForm Form Submit', () => {
    it('should respond to submit event and change the state of the RegisterBusinessForm Component', () => {
      const fakeEvent = { preventDefault: () => ({}) };
      wrapper.setState({
        business: {
          name: '',
          location: 'Lagos',
          category: 'Gaming',
          description: '',
          email: '',
          address: '',
          telephoneNumber: '',
          homeNumber: '08022235913'
        },
        submitted: false
      });
      wrapper.find('form').simulate('submit', fakeEvent);
      expect(wrapper.state().submitted).toEqual(true);
    });
  });
});
