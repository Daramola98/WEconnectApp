import React from 'react';

/**
 *
 *@class SignUp
 *@classdesc creates a React component- SignUp
 */
export default class SignUp extends React.Component {
  /**
    * Creates a React Component
    * @return {jsx} renders the signup page
    * @memberof React Component
    */
  handleSignUpSubmit() {

  }
  /**
    * Creates a React Component
    * @return {jsx} renders the signup page
    * @memberof React Component
    */
  render() {
    return (
        <div className="row container">
                <div className="col s12 m8 offset-m2 l8 offset-l2">
                    <div className="card">
                        <div className="card-action blue lighten-1 white-text center">
                            <h3>Sign Up to WEconnect</h3>
                        </div>
                        <div className="card-content">
                            <form onSubmit={this.handleSignUpSubmit.bind(this)}>
                                <div className="row">
                                    <div className="input-field col s12 m12 l6">
                                        <i className="material-icons prefix">account_circle</i>
                                        <label htmlFor="firstname">First Name</label>

                                        <input type="text" ref="firstname" className="validate" required/>
                                    </div>
                                    <div className="input-field col s12 m12 l6">
                                        <i className="material-icons prefix">account_circle</i>
                                        <label htmlFor="lastname">Last Name</label>

                                        <input type="text" ref="lastname" className="validate" required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l6">
                                        <i className="material-icons prefix">lock</i>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" ref="password" required />
                                    </div>
                                    <div className="input-field col s12 m12 l6">
                                        <i className="material-icons prefix">lock</i>
                                        <label htmlFor="confirmPass">Confirm Password</label>
                                        <input type="password" ref="confirmPass" className="validate" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <i className="material-icons prefix">email</i>
                                        <label htmlFor="email">Email Address</label>
                                        <input type="email" placeholder="johndoe@gmail.com" ref="email" className="validate" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l6">
                                        <i className="material-icons prefix">phone</i>
                                        <label htmlFor="telephoneNumber">Telephone Number</label>

                                        <input type="number" ref="telephoneNumber" className="validate" required />
                                    </div>
                                    <div className="input-field col s12 m12 l6">
                                        <i className="material-icons prefix">phone</i>
                                        <label htmlFor="homeNumber">Home Number</label>

                                        <input type="number" ref="homeNumber" className="validate" />
                                    </div>
                                </div>

                                <br/>
                                <div className="input-field">
                                    <button type="submit" className="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>CREATE ACCOUNT</button>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col s12 m12 l6 offset-l3 center">
                                        <h6><a href="login.html">Already have an Account? Login here</a></h6>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
  }
}
