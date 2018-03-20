# WEconnectApplication
<<<<<<< HEAD
[![Build Status](https://travis-ci.org/Daramola98/WEconnectApp.svg?branch=chore-write-tests)](https://travis-ci.org/Daramola98/WEconnectApp) [![Coverage Status](https://coveralls.io/repos/github/Daramola98/WEconnectApp/badge.svg?branch=chore-write-tests)](https://coveralls.io/github/Daramola98/WEconnectApp?branch=chore-write-tests) [![Maintainability](https://api.codeclimate.com/v1/badges/0d95425a0e5fa2106ac8/maintainability)](https://codeclimate.com/github/Daramola98/WEconnectApp/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/0d95425a0e5fa2106ac8/test_coverage)](https://codeclimate.com/github/Daramola98/WEconnectApp/test_coverage)
=======
[![Build Status](https://travis-ci.org/Daramola98/WEconnectApp.svg?branch=develop)](https://travis-ci.org/Daramola98/WEconnectApp) [![Coverage Status](https://coveralls.io/repos/github/Daramola98/WEconnectApp/badge.svg?branch=develop)](https://coveralls.io/github/Daramola98/WEconnectApp?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/0d95425a0e5fa2106ac8/maintainability)](https://codeclimate.com/github/Daramola98/WEconnectApp/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/0d95425a0e5fa2106ac8/test_coverage)](https://codeclimate.com/github/Daramola98/WEconnectApp/test_coverage)
>>>>>>> develop

**About WEconnect**
WeConnect provides a platform that brings businesses and individuals together. This platform
creates awareness for businesses and gives the users the ability to write reviews about the
businesses they have interacted with.

**To view pivotal tracker roadmap check out this link** => https://www.pivotaltracker.com/n/projects/2153557

**To View Weconnect source code switch to the gh-pages branch**

**To View Web Application check it out at https://daramola98.github.io/WEconnectApp/template**

## Contents
- [View live Template](#view-live-template)
- [Features](#features)
- [Technology Used](#technology-used)
- [How to Use Locally](#getting-started)
- [API Endpoints](#api-endpoints)
- [Hosted Endpoints on Heroku](#hosted-endpoints-on-heroku)
- [API documentation on Heroku](#api-documentation-on-heroku)

## View live Template
View the templates through this [link](https://daramola98.github.io/WEconnectApp/template)

## Features
* Users can register on the application
* Users can login to the application
* Users can register a business
* Users can update and delete businesses they registered
* Users can view a business
* Users can view all businesses
* Users can view businesses by their category or location
* Users can add reviews to a business
* Users can view all reviews for a business

## Technology Used
* HTML
* CSS
* Materialize CSS
* Express
* NodeJS

## Getting Started
Get the app running locally in the following way:
```
# Fork/Clone the Repo

# Install dependencies
npm install

# Run tests
npm test

# Run the application
npm start
```
The server would be live at `http://localhost:8080`,
Swagger API documentation at `http://localhost:8080/api-docs/`

## API Endpoints
<table>
  <tr>
      <th>HTTP REQUEST VERB</th>
      <th>End Point</th>
      <th>Action</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/signup</td>
      <td>Register a user</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/signin</td>
      <td>Login user</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/businesses</td>
      <td>Register a business</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/businesses/:businessId</td>
      <td>Update a business profile</td>
  </tr>
  <tr>
      <td>DELETE</td>
      <td>/api/v1/businesses/:businessId</td>
      <td>Delete a business</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses/:businessId</td>
      <td>Get a business</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses/</td>
      <td>Get all businesses</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/businesses/:businessId/reviews</td>
      <td>Add a review to a business</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses/:businessId/reviews</td>
      <td>Get all reviews for a business</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses?location=location</td>
      <td>Get businesses with a location</td>
  </tr>
  </tr>
      <td>GET</td>
      <td>/api/v1/businesses?category=category</td>
      <td>Get businesses with a category</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses?category=category&location=location</td>
      <td>Get businesses with a category and location</td>
  </tr>
</table>

## Hosted Endpoints on Heroku
View hosted endpoints on Heroku through this [link](https://weconnect-api.herokuapp.com/)

## API documentation on Heroku
View swagger API documentation of endpoints on Heroku through this [link](https://weconnect-api.herokuapp.com/api-docs/)