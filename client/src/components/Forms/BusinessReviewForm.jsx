import React from 'react';
import ReactStars from 'react-stars';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';


/**
 * Class Representing React Component BusinessReviewForm
 *@class BusinessReviewForm
 *@classdesc creates a React component- BusinessReviewForm
 */
export default class BusinessReviewForm extends React.Component {
  state = {
    reviewDetails: {
      review: '',
      rating: 0
    },
  }

  /**
    * onChange Event handler callback for review response input field
    * @param {object} event the event object
    *
    * @return {null} updates the state of the BusinessReviewForm component
    * @memberof BusinessReviewForm Component
    */
  onChange = event =>
    this.setState({
      ...this.state,
      reviewDetails: { ...this.state.reviewDetails, [event.target.name]: event.target.value }
    });

    /**
      * onRatingChange Event handler callback for star rating
      * @param {object} newRating The selected rating
      *
      * @return {null}  Value of star ratings
      * @memberof BusinessReviewForm Component
      */
  onRatingChange = (newRating) => {
    this.setState({ reviewDetails: { ...this.state.reviewDetails, rating: newRating } });
  }

  /**
      * onSubmit Event handler callback for review form
      * @param {object} event The event object
      *
      * @return {null}  Review submitted or returns error message
      * @memberof BusinessReviewForm Component
      */
  onSubmit = (event) => {
    event.preventDefault();
    this.props.submit(this.state.reviewDetails);
    this.setState({
      reviewDetails: {
        review: '',
        rating: 0
      }
    });
  }

  /**
    * Renders the BusinessReviewForm Component
    * @return {jsx} jsx element to render
    * @memberof BusinessReviewForm Component
    */
  render() {
    const { review, rating } = this.state.reviewDetails;
    return (<div className="row">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12 m12 l12">
                <i className="material-icons prefix">feedback</i>
                <textarea value={review} className="materialize-textarea" id="review" name="review" onChange={this.onChange} required />
                <label htmlFor="review">Give Feedback about Business</label>
              </div>
            </div>
            <div className="form-field">
            <div id="rating">
            <span>Rate Business : </span>
              <ReactStars
                count={5}
                size={25}
                half={true}
                onChange={this.onRatingChange}
                color2={'#ffd700'}
                value={rating}
              />
            </div>
              <button type="submit" className="btn-large waves-effect waves-dark blue-grey darken-2" disabled={this.props.disableBtn} style={{ width: `${100}%` }}>
                POST REVIEW
              </button>
            </div>
          </form>
</div>);
  }
}

BusinessReviewForm.propTypes = {
  submit: PropTypes.func.isRequired,
};
