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
  render() {
    return (
        <div class="row">
                <div class="col s12 m8 offset-m2 l8 offset-l2">
                    <div class="card">
                        <div class="card-action blue lighten-1 white-text center">
                            <h3>Sign Up to WEconnect</h3>
                        </div>
                        <div class="card-content">
                            <form action="">
                                <div class="row">
                                    <div class="input-field col s12 m12 l6">
                                        <i class="material-icons prefix">account_circle</i>
                                        <label for="firstName">First Name</label>

                                        <input type="text" id="firstName" class="validate" required/>
                                    </div>
                                    <div class="input-field col s12 m12 l6">
                                        <i class="material-icons prefix">account_circle</i>
                                        <label for="lastName">Last Name</label>

                                        <input type="text" id="lastName" class="validate" required/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12 m12 l6">
                                        <label for="password">Password</label>
                                        <input type="password" id="password" required />
                                    </div>
                                    <div class="input-field col s12 m12 l6">
                                        <label for="confirmPass">Confirm Password</label>
                                        <input type="password" id="confirmPass" class="validate" required />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12 m12 l12">
                                        <i class="material-icons prefix">email</i>
                                        <label for="user_mail">Email Address</label>
                                        <input type="email" placeholder="johndoe@gmail.com" id="user_mail" class="validate" required />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12 m12 l6">
                                        <i class="material-icons prefix">phone</i>
                                        <label for="telephone">Telephone Number</label>

                                        <input type="number" id="telephone" class="validate" required />
                                    </div>
                                    <div class="input-field col s12 m12 l6">
                                        <i class="material-icons prefix">phone</i>
                                        <label for="home_number">Home Number</label>

                                        <input type="number" id="home_number" class="validate" />
                                    </div>
                                </div>

                                <br/>
                                <div class="input-field">
                                    <button type="submit" class="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>CREATE ACCOUNT</button>
                                </div>
                                <br/>
                                <div class="row">
                                    <div class="col s12 m12 l6 offset-l3 center">
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
