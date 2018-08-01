import React from 'react';
import { Tabs, Tab, Modal, Pagination } from 'react-materialize';
import moment from 'moment';
import ReactStars from 'react-stars';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';
import Review from '../../Review/presentational/Review.jsx';
import FormErrors from '../../Messages/presentational/FormErrors.jsx';
import BusinessReviewForm from '../../Forms/BusinessReviewForm.jsx';
import ReviewResponseForm from '../../Forms/ReviewResponseForm.jsx';
import getAverageRating from '../../../utils/getAverageRating';

/**
 * Class Representing React Component BusinessProfile
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
    info: true,
    reviews: false,
    reviewId: null,
    reviewResponses: [],
    currentPage: 1,
    disableBtn: false
  }

  /**
   * @description - Dispatches redux actions to fetch a business and the business reviews
   *
   * @return {void} no return or void
   */
  componentDidMount() {
    this.props.fetchBusiness(this.props.match.params.id);
    this.props.fetchReviews(this.props.match.params.id, this.state.currentPage);
  }

  /**
    * onSelect props callback for pagination component
    * @param {number} pageNumber the page number
    *
    * @return {null} updates the state of the BusinessProfile component
    * @memberof BusinessProfile Component
    */
    onPageChange = (pageNumber) => {
      this.props.fetchReviews(this.props.match.params.id, pageNumber)
        .then(() => this.setState({ currentPage: pageNumber, info: false, reviews: true }));
    }

  /**
    * onChange Event handler callback for review response input field
    * @param {object} event the event object
    *
    * @return {null} updates the state of the BusinessProfile component
    * @memberof BusinessProfile Component
    */
  onChange = event =>
    this.setState({
      ...this.state,
      response: { ...this.state.response, [event.target.name]: event.target.value }
    });

  /**
      * onSubmit Event handler callback for review form
      * @param {object} review The event object
      *
      * @return {null}  Review submitted or returns error message
      * @memberof BusinessProfile Component
      */
  onSubmitReview = (review) => {
    this.setState({ disableBtn: true });
    if (!this.props.user.authenticated) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.warning('You need to be logged in to post a review');
      setTimeout(() => this.props.history.push('/login'), 2000);
    }
    this.props.postReview(this.props.match.params.id, review)
      .then((response) => {
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Review Submitted');
        this.props.fetchReviews(this.props.match.params.id, this.state.currentPage)
          .then(() => {
            this.setState({
              reviews: true, info: false, disableBtn: false
            });
          });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alertify.set('notifier', 'position', 'top-right');
          alertify.warning('Session Expired Login again');
          this.props.logout();
          setTimeout(() => this.props.history.push('/login'), 1000);
          return;
        }
        if (error) {
          this.setState({
            errors:
             { ...this.state.errors, message: error.response.data.validationErrors },
            info: false,
            reviews: true,
            disableBtn: false
          });
        }
      });
  }

  /**
      * onSubmit Event handler callback for Edit review form
      * @param {object} review The event object
      *
      * @return {null}  Review submitted or returns error message
      * @memberof BusinessProfile Component
      */
  onEditReview = (review) => {
    this.setState({ disableBtn: true });
    if (!this.props.user.authenticated) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.warning('You need to be logged in to post a review');
      setTimeout(() => this.props.history.push('/login'), 2000);
    }
    this.props.updateReview(this.props.match.params.id, this.state.reviewId, review)
      .then((response) => {
        $('#editReview').modal('close');
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Review Submitted');
        this.props.fetchReviews(this.props.match.params.id, this.state.currentPage)
          .then(() => {
            this.setState({
              reviews: true, info: false, disableBtn: false
            });
          });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alertify.set('notifier', 'position', 'top-right');
          alertify.warning('Session Expired Login again');
          this.props.logout();
          setTimeout(() => this.props.history.push('/login'), 1000);
          return;
        }
        if (error) {
          this.setState({
            errors:
             { ...this.state.errors, message: error.response.data.validationErrors },
            info: false,
            reviews: true,
            disableBtn: false
          });
        }
      });
  }

  /**
      * onSubmit Event handler callback for review response form
      * @param {object} response The event object
      *
      * @return {null}  Response submitted or returns error message
      * @memberof BusinessProfile Component
      */
  onSubmitResponse = (response) => {
    const { user, history, match } = this.props;
    const { reviewId, currentPage } = this.state;
    if (!user.authenticated) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.warning('You need to be logged in to post a review');
      setTimeout(() => history.push('/login'), 2000);
    }
    this.props
      .postReviewResponse(
        match.params.id,
        reviewId, response
      )
      .then(() => {
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Response Submitted');
        $('#replyReview').modal('close');
        this.props.fetchReviews(match.params.id, currentPage)
          .then(() => {
            this.setState({
              reviews: true, info: false
            });
          });
      });
  }

  /**
    * Renders the BusinessProfile Component
    * @return {jsx} jsx element to render
    * @memberof BusinessProfile Component
    */
  render() {
    const { business, reviews, reviewsCount } = this.props.businessProfile;
    const {
      errors, info,
      disableBtn, currentPage, reviewResponses
    } = this.state;
    const {
      name, businessImage,
      businessOwner, email, telephoneNumber, homeNumber, address, description, category, location
    } = business;
    const { user } = this.props.user;
    const setReviewId = reviewId => this.setState({ reviewId, info: false, reviews: true });
    return <div className="row formcontainer container">
        <div className="col s12 m8 offset-m2 l8 offset-l2">
          <div className="card">
            <div className="card-action blue-grey darken-2 white-text center">
              <h3>Business Profile</h3>
            </div>
          <div className="card-image">
            <img className="responsive" src={businessImage} alt="business" />
            <span className="card-title"></span>
          </div>
            <div className="card-content">
              <div className="row">
                <Tabs key={`tabs${Date.now()}`} className="tab-demo z-depth-1">
                  <Tab title="Information" active={info} className=" blue-grey-text lighten-1">
                    <div id="businessInfo" className="col s12 m12 l12 ">
                      <ul className="collection">
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue-grey darken-2">
                            business_center
                          </i>
                          <span className="title">
                            <h5>Business Name</h5>
                          </span>
                          <p>
                            <strong>{name}</strong>
                          </p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue-grey darken-2">
                            email
                          </i>
                          <span className="title">
                            <h5>Contact Email</h5>
                          </span>
                          <p>
                            <strong>{email}</strong>
                          </p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue-grey darken-2">
                            phone
                          </i>
                          <span className="title">
                            <h5>Telephone Number</h5>
                          </span>
                          <p>
                            <strong> {telephoneNumber}</strong>
                          </p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue-grey darken-2">
                            phone
                          </i>
                          <span className="title">
                            <h5>Office Phone</h5>
                          </span>
                          <p>
                            <strong>{homeNumber || 'Nil'}</strong>
                          </p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue-grey darken-2">
                            business
                          </i>
                          <span className="title">
                            <h5>Business Category</h5>
                          </span>
                          <p>
                            <strong>{category}</strong>
                          </p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue-grey darken-2">
                            location_on
                          </i>
                          <span className="title">
                            <h5>Location</h5>
                          </span>
                          <p>
                            <strong>{location}</strong>
                          </p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue-grey darken-2">
                            directions
                          </i>
                          <span className="title">
                            <h5>Business Address</h5>
                          </span>
                          <p>
                            <strong>{address}</strong>
                          </p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue-grey darken-2">
                            business_center
                          </i>
                          <span className="title">
                            <h5>Business Description</h5>
                          </span>
                          <p>{description}</p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue-grey darken-2">
                            business_center
                          </i>
                          <span className="title">
                            <h5>Business Owner</h5>
                          </span>
                          <p>
                            <a className="waves-effect waves-light btn blue-grey darken-2">
                              {businessOwner ? businessOwner.username : null}
                            </a>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </Tab>
                  <Tab title="Reviews" active={this.state.reviews} className="blue-grey-text darken-1">
                    <div id="businessReviews" className="col s12 m12 l12">
                      <div className="card">
                        <div className="card-content">
                          <FormErrors errors={errors} />
                          <BusinessReviewForm
                           submit={this.onSubmitReview} disableBtn={disableBtn} />
                        </div>
                        <div className="card">
                          <div className="card-content">
                            <div>
                              <h5 style={{ display: 'inline-block' }}>
                                <span className="blue-grey-text darken-2">
                                  Previous Reviews
                                </span>
                              </h5>
                              <span style={{ float: 'right', fontWeight: 'bold' }}>
                                {reviews && getAverageRating(reviews)}
                                <ReactStars
                                className="review-stars"
                                count={5}
                                size={15}
                                half={true}
                                edit={false}
                                color2={'#ffd700'}
                                value={reviews && Number(getAverageRating(reviews))}
                              />
                              </span>
                            </div>
                            <div>
                              <ul className="collection">
                                {reviews.length > 0 ?
                                 reviews.map((review, i) => (
                                <Review key={review.id}
                                 userId={user.userId} setReviewId={setReviewId} review={review}>
                                          <div className="align-right">
                                            <a
                                              className="blue-grey-text darken-2"
                                              onClick={() => {
                                                this.setState({
                                                  reviewResponses:
                                                    review.responses,
                                                  info: false,
                                                  reviews: true
                                                });
                                                $('#prevReplies').modal('open');
                                              }}
                                            >
                                              <span className="new badge blue-grey darken-2" data-badge-caption="new response(s)">
                                               {review.responses.length}
                                              </span>
                                              {/* <u>View Previous Replies</u> */}
                                            </a>
                                          </div>
                                          <div className="align-right">
                                            <a
                                              className="blue-grey-text darken-2"
                                              onClick={() => {
                                                this.setState({
                                                  reviewId: review.id,
                                                  info: false,
                                                  reviews: true
                                                });
                                                $('#replyReview').modal('open');
                                              }}
                                            >
                                              <u>Reply</u>
                                            </a>
                                          </div>
                                        </Review>
                                    )) : <li className="collection-item center blue-grey-text darken-2">
                                    <h3>NO REVIEWS</h3>
                                  </li>}
                              </ul>
                              <br />
                              <Pagination
                               className="center"
                               key={Date.now()} items={Math.ceil(reviewsCount / 9) || 0}
                               activePage={currentPage}
                               maxButtons={5} onSelect={this.onPageChange} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>

                {/* Review Reply Modal */}
                <Modal id="replyReview" header={'REPLY TO REVIEW'}>
                  <ReviewResponseForm submit={this.onSubmitResponse} />
                </Modal>

                {/* Delete Review Modal */}
                <Modal id="deleteReview" header={'DELETE REVIEW'}
                actions={
                      <div>
                        <button className="confirmDelete"
                        onClick={() => {
                          const { reviewId } = this.state;
                          const { match, history } = this.props;
                          this.props.deleteReview(match.params.id, reviewId)
                            .then(() => {
                              alertify.set('notifier', 'position', 'top-right');
                              alertify.success('Review Deleted');
                              $('#deleteReview').modal('close');
                              this.props
                              .fetchReviews(match.params.id, currentPage)
                              .then(() => this.setState({ info: false, reviews: true }));
                            })
                            .catch((error) => {
                              if (error.response.status === 401) {
                                alertify.set('notifier', 'position', 'top-right');
                                alertify.warning('Session Expired Login again');
                                this.props.logout();
                                setTimeout(() => history.push('/login'), 1000);
                              }
                            });
                        }}
                        >
                        DELETE
                        </button>
                        <button onClick={() => $('#deleteReview').modal('close')}>CLOSE</button>
                      </div>
                    }
                      >
                        <strong>DO YOU WANT TO DELETE THIS REVIEW</strong>
                </Modal>

                {/* Edit Review Modal */}
                <Modal id="editReview" header={'EDIT REVIEW'}>
                <BusinessReviewForm
                  submit={this.onEditReview} disableBtn={disableBtn} />
                </Modal>

                {/* Previous Replies Modal */}
                <Modal id="prevReplies" header={<span className="blue-grey-text darken-2">PREVIOUS REPLIES</span>}>
                  <ul className="collection">
                    {reviewResponses.length > 0 ?
                     reviewResponses.map((response, i) => (
                          <li key={response.id} className="collection-item">
                            <span className="blue-grey-text darken-2">{response.reviewer.username}</span>
                            <p>{response.message}</p>
                            <p><span className="timestamp align-right">{moment(response.createdAt).calendar()}</span></p>
                            <br/>
                          </li>
                        )) : <li className="collection-item center">
                        <h3 className="blue-grey-text">NO REPLIES</h3>
                        </li>}
                  </ul>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}

BusinessProfile.propTypes = {
  fetchBusiness: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  businessProfile: PropTypes.object.isRequired,
  postReview: PropTypes.func.isRequired,
  postReviewResponse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

