import React from 'react';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';
import FormErrors from '../../Messages/presentational/FormErrors';
import ContactUsForm from '../../Forms/ContactUsForm';

/**
 * Class Representing React Component ContactUs
 *@class ContactUs
 *@classdesc creates a React component- ContactUs
 */
export default class ContactUs extends React.Component {
    state = {
      errors: {
        message: null
      }
    }

    /**
      * onSubmit Event handler callback for ContactUs form
      * @param {object} contactInfo The event object
      *
      * @return {null}  Message Submitted message or returns error message
      * @memberof ContactUs Component
      */
    onSubmit = (contactInfo) => {
      this.props.postContactUs(contactInfo)
        .then(() => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.success('Message Submitted');
          setTimeout(() => this.props.history.push('/'), 1000);
        })
        .catch((error) => {
          window.scroll(0, 0);
          if (error && error.response.data.validationErrors) {
            return this.setState({
              errors:
                { ...this.state.errors, message: error.response.data.validationErrors }
            });
          }
        });
    }

  /**
    * Renders the ContactUs Component
    * @return {jsx} jsx element to render
    * @memberof ContactUs Component
    */
    render() {
      const { errors } = this.state;
      return <div className="row container">
          <div className="col s12 m8 offset-m2 l8 offset-l2">
            <div className="card">
              <div className="card-action blue lighten-1 white-text center">
                <h3>Contact Us</h3>
              </div>
              <div className="card-content">
                <FormErrors errors={errors} />
                <ContactUsForm submit={this.onSubmit}/>
              </div>
            </div>
          </div>
        </div>;
    }
}

ContactUs.propTypes = {
  postContactUs: PropTypes.func.isRequired,
};

