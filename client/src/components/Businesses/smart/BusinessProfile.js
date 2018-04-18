import React from 'react';
import { Tabs, Tab, Modal } from 'react-materialize';
import alertify from 'alertifyjs';
import Review from '../../Review/presentational/Review';
import Errors from '../../Messages/presentational/Errors';

/**
 *
 *@class BusinessProfile
 *@classdesc creates a React component- BusinessProfile
 *@param {object} e event object
 */
export default class BusinessProfile extends React.Component {
  state = {
    response: {
      message: ''
    },
    errors: {
      message: null
    },
    reviewId: null,
    reviewResponses: []
  }
  /**
    * Creates a React Component
    * @param {object} props the business profile page
    * @return {jsx} renders the business profile page
    * @memberof React Component
    */
  componentWillMount() {
    this.props.fetchBusiness(this.props.match.params.id);
    this.props.fetchReviews(this.props.match.params.id);
  }

  /**
  * Creates a React Component
  * @param {object} e the register business page
  * @return {jsx} renders the register business page
  * @memberof React Component
  */
  onChange = e =>
    this.setState({
      ...this.state,
      response: { ...this.state.response, [e.target.name]: e.target.value }
    });

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.props.user.authenticated) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.warning('You need to be logged in to post a review');
      setTimeout(() => this.props.history.push('/login'), 2000);
    }
    const review = this.refs.review.value;
    this.props.postReview(this.props.match.params.id, { review })
      .then((response) => {
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Review Submitted');
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch((error) => {
        if (error) {
          this.setState({
            errors:
             { ...this.state.errors, message: error.response.data.validationErrors }
          });
        }
      });
  }
  /**
    * Creates a React Component
    * @return {jsx} renders the business profile page
    * @memberof React Component
    */
  render() {
    const { business } = this.props.businessProfile;
    const { errors } = this.state;
    return <div className="row container">
        <div className="col s12 m8 offset-m2 l8 offset-l2">
          <div className="card">
            <div className="card-action blue lighten-1 white-text center">
              <h3>Business Profile</h3>
            </div>
            <div className="card-content">
              <div className="row">
                <Tabs className="tab-demo z-depth-1">
                  <Tab title="Information" active className="blue-text lighten-1">
                    <div id="businessInfo" className="col s12 m12 l12 ">
                      <ul className="collection">
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue lighten-1">
                            business_center
                          </i>
                          <span className="title">
                            <h5>Business Name</h5>
                          </span>
                          <p>
                            <strong>{business.name}</strong>
                          </p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue lighten-1">
                            email
                          </i>
                          <span className="title">
                            <h5>Contact Email</h5>
                          </span>
                          <p>
                            <strong>{business.email}</strong>
                          </p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue lighten-1">
                            phone
                          </i>
                          <span className="title">
                            <h5>Telephone Number</h5>
                          </span>
                          <p>
                            <strong> {business.telephoneNumber}</strong>
                          </p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue lighten-1">
                            phone
                          </i>
                          <span className="title">
                            <h5>Office Phone</h5>
                          </span>
                          <p>
                            <strong>{business.homeNumber || 'Nil'}</strong>
                          </p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue lighten-1">
                            business
                          </i>
                          <span className="title">
                            <h5>Business Category</h5>
                          </span>
                          <p>
                            <strong>{business.category}</strong>
                          </p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue lighten-1">
                            location_on
                          </i>
                          <span className="title">
                            <h5>Location</h5>
                          </span>
                          <p>
                            <strong>{business.location}</strong>
                          </p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue lighten-1">
                            directions
                          </i>
                          <span className="title">
                            <h5>Business Address</h5>
                          </span>
                          <p>
                            <strong>{business.address}</strong>
                          </p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue lighten-1">
                            business_center
                          </i>
                          <span className="title">
                            <h5>Business Description</h5>
                          </span>
                          <p>{business.description}</p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue lighten-1">
                            business_center
                          </i>
                          <span className="title">
                            <h5>Business Owner</h5>
                          </span>
                          <p>
                            <a href="" className="waves-effect waves-light btn blue lighten-1">
                              {business.userId}
                            </a>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </Tab>
                  <Tab title="Reviews" className="blue-text lighten-1">
                    <div id="businessReviews" className="col s12 m12 l12">
                      <div className="card">
                        <div className="card-content">
                          {errors.message ? <ul className="collection with-header">
                              <li key="header" className="collection-header">
                                <h4 className="red-text">
                                  Something Went Wrong
                                </h4>
                              </li>
                              {errors.message.map((error, i) => (
                                <Errors
                                  key={`error${i}`}
                                  message={error}
                                  index={i}
                                />
                              ))}
                            </ul> : null}
                          <form onSubmit={this.onSubmit}>
                            <div className="row">
                              <div className="input-field col s12 m12 l12">
                                <i className="material-icons prefix">
                                  feedback
                                </i>
                                <textarea ref="review" className="materialize-textarea" id="review" />
                                <label htmlFor="review">
                                  Give Feedback about Business
                                </label>
                              </div>
                            </div>
                            <div className="form-field">
                              <button type="submit" className="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>
                                POST REVIEW
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-content">
                          <div>
                            <h5>
                              <span className="blue-text text-lighten-1">
                                Previous Reviews
                              </span>
                            </h5>
                          </div>
                          <div>
                            <ul>
                              {this.props.businessProfile.reviews.length > 0 ?
                               this.props.businessProfile.reviews.map((review, i) => (
                                    <Review key={review.id} review={review}>
                                      <div className="align-right">
                                        <a
                                          className="blue-text"
                                          onClick={() => {
                                            this.setState({ reviewResponses: review.responses });
                                            $('#prevReplies').modal('open');
                                          }}
                                        >
                                          <span className="new badge blue">
                                            {review.responses.length}
                                          </span>
                                          <u>View Previous Replies</u>
                                        </a>
                                      </div>
                                      <div className="align-right">
                                        <a
                                          className="blue-text"
                                          onClick={() => {
                                            this.setState({ reviewId: review.id });
                                            $('#replyReview').modal('open');
                                          }}
                                        >
                                          <u>Reply</u>
                                        </a>
                                      </div>
                                    </Review>
                                  )) : <li className="blue-text">
                                  NO REVIEWS
                                </li>}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
                <Modal id="replyReview" header={'REPLY TO REVIEW'}>
                  <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!this.props.user.authenticated) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.warning('You need to be logged in to post a review');
                        setTimeout(() => this.props.history.push('/login'), 2000);
                      }
                      this.props
                      .postReviewResponse(
                        this.props.match.params.id,
                         this.state.reviewId, this.state.response
                        )
                      .then(() => {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success('Response Submitted');
                        setTimeout(() => window.location.reload(), 2000);
                      });
                      }}>
                    <input type="text" name="message" minLength="2" value={this.state.response.message} onChange={this.onChange} required />
                    <button type="submit">SUBMIT</button>
                  </form>
                </Modal>
                <Modal id="prevReplies" header={'PREVIOUS REPLIES'}>
                  <ul className="collection">
                    {this.state.reviewResponses.length > 0 ? this.state.reviewResponses.map((response, i) => <li key={response.id} className="collection-item">
                    <span>{response.userId}</span>
                    <p>
                      {response.message}
                    </p>
                    </li>) : <li>NO REPLIES</li>}
                  </ul>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}