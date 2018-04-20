import React from 'react';
import { Tabs, Tab, Modal } from 'react-materialize';
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs';
import Business from '../../Businesses/presentational/Business';

/**
 *
 *@class Header
 *@classdesc creates a React component- Header
 */
export default class UserProfile extends React.Component {
  /**
    * Creates a React Component
    * @param {object} props message with the business created or error message
    * @return {null} Success message with the business created or error message
    * @memberof React Component
    */
  constructor(props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.state = {
      search: '',
      info: true,
      businesses: false,
      searchFocus: ''
    };
  }

  /**
   * @description - redirect registered user to all-budiness page
   *
   * @return {void} no return or void
   */
  componentWillMount() {
    if (this.props.usersReducer.authenticated !== true) {
      this.props.history.push('/login');
    }
  }

  /**
   * @description - redirect registered user to all-budiness page
   *
   * @return {void} no return or void
   */
  componentDidMount() {
    this.props.fetchUserBusinesses()
      .catch((error) => {
        if (error.response.status === 401) {
          alertify.set('notifier', 'position', 'top-right');
          alertify.warning('Session Expired Login again');
          this.props.logout();
          setTimeout(() => this.props.history.push('/login'), 1000);
        } else {
          this.props.fetchUserBusinessesFailed();
        }
      });
  }

  // /**
  //   * Creates a React Component
  //   * @param {object} e the register business page
  //   * @param {string} searchValue the register business page
  //   * @return {jsx} renders the register business page
  //   * @memberof React Component
  //   */
  //    onSearchSubmit = (e) => {
  //      e.preventDefault();
  //      this.setState({ search: this.refs.search.value });
  //    };

  /**
    * Creates a React Component
    * @param {object} e the register business page
    * @param {string} searchValue the register business page
    * @return {jsx} renders the register business page
    * @memberof React Component
    */
     onSearchSubmit = (e) => {
       e.preventDefault();
       this.setState({
         search: e.target.value, info: false, businesses: true, searchFocus: true
       });
     };
  /**
       * Creates a React Component
       * @return {jsx} Success message with the business created or error message
       * @memberof React Component
       */
     render() {
       const {
         firstname, lastname, email, telephoneNumber, homeNumber
       } = this.props.usersReducer.user;

       let businessId;
       let searchValue;

       const filterBusinesses = this.props.usersReducer.businesses.filter(business =>
         business.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);

       return <div className="row container">
        <div className="col s12 m8 offset-m2 l8 offset-l2">
          <div className="card">
            <div className="card-action blue lighten-1 white-text center">
              <h3>My Profile</h3>
            </div>
            <div className="card-content">
              <div className="row">
                <Tabs key={`tabs${Date.now()}`} className="tab-demo z-depth-1">
                  <Tab title="Information" active={this.state.info}>
                    <div id="personal_info" className="col s12 m12 l12 ">
                      <ul className="collection">
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue lighten-1">
                            account_circle
                          </i>
                          <span className="title">
                            <h5>Full Name</h5>
                          </span>
                          <p>{`${firstname} ${lastname}`}</p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue lighten-1">
                            email
                          </i>
                          <span className="title">
                            <h5>Email</h5>
                          </span>
                          <p>{email}</p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue lighten-1">
                            phone
                          </i>
                          <span className="title">
                            <h5>Telephone Number</h5>
                          </span>
                          <p>{telephoneNumber}</p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue lighten-1">
                            phone
                          </i>
                          <span className="title">
                            <h5>Home Number</h5>
                          </span>
                          <p>{homeNumber || 'Nil'} </p>
                        </li>
                      </ul>
                    </div>
                  </Tab>
                  <Tab title="Businesses" active={this.state.businesses}>
                    <form className="col s8 l8">
                      <input
                       type="text" ref="search" placeholder="Filter Businesses By Name" value={this.state.search} autoFocus={this.state.searchFocus} onChange={this.onSearchSubmit} required/>
                    </form>
                    <div id="businesses" className="col s12 m12 l12 ">
                      <table className="bordered highlight responsive-table centered center">
                        <thead>
                          <tr>
                            <th>Business Name</th>
                            <th>Category</th>
                            <th>Location</th>
                          </tr>
                        </thead>

                        <tbody>
                          {filterBusinesses.length > 0 ?
                           filterBusinesses.map((business, i) => (
                                <Business business={business} key={i}>
                                  <td key={'update'}>
                                    <Link
                                      to={`/updateBusiness${business.id}`}
                                    >
                                      UPDATE
                                    </Link>
                                  </td>
                                  <td key={'delete'}>
                                    <a className="waves-effect waves-light btn-small" onClick={() => {
                                      businessId = business.id;
                                      $('#deleteBusiness').modal('open');
                                    }}>
                                      DELETE
                                    </a>
                                  </td>
                                </Business>
                              )) : <tr>
                              <td colSpan="3">No Businesses !!</td>
                            </tr>}
                        </tbody>
                      </table>
                      <ul className="pagination">
                        <li className="disabled">
                          <a href="#!">
                            <i className="material-icons">chevron_left</i>
                          </a>
                        </li>
                        <li className="active">
                          <a href="#!">1</a>
                        </li>
                        <li className="waves-effect">
                          <a href="#!">2</a>
                        </li>
                        <li className="waves-effect">
                          <a href="#!">3</a>
                        </li>
                        <li className="waves-effect">
                          <a href="#!">4</a>
                        </li>
                        <li className="waves-effect">
                          <a href="#!">5</a>
                        </li>
                        <li className="waves-effect">
                          <a href="#!">
                            <i className="material-icons">chevron_right</i>
                          </a>
                        </li>
                      </ul>
                      <Modal
                      id="deleteBusiness"
                      header="Confirm Business Deletion"
                      actions={
                      <div>
                        <button className="confirmDelete"
                        onClick={() => {
                          this.props.deleteBusiness(businessId)
                            .then(() => {
                              alertify.set('notifier', 'position', 'top-right');
                              alertify.success('Business Deleted');
                              setTimeout(() => window.location.reload(), 2000);
                            })
                            .catch((error) => {
                              if (error.response.status === 401) {
                                alertify.set('notifier', 'position', 'top-right');
                                alertify.warning('Session Expired Login again');
                                this.props.logout();
                                setTimeout(() => this.props.history.push('/login'), 1000);
                              }
                            });
                        }}
                        >
                        DELETE
                        </button>
                        <button onClick={() => $('#deleteBusiness').modal('close')}>CLOSE</button>
                      </div>
                    }
                      >
                        <strong>DO YOU WANT TO DELETE THIS BUSINESS</strong>
                      </Modal>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>;
     }
}
