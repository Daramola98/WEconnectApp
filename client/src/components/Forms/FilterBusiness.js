import React, { Component } from 'react';
import PropTypes from 'prop-types';

// /**
//     * Takes a pageNumber and updates the state of the Business listing Component
//     * @param {number} searchValue number of the current page
//     * @param {string} propertyToUpdate property to update in state
//     *
//     * @return {func} function to update the state of the Business listing Component
//     */
// function setSearchValue(searchValue) {
//   return (previousState, currentProps) => ({ ...previousState, search: searchValue });
// }
/**
 * Class Representing React Component FilterBusiness
 *@class FilterBusiness
 *@classdesc creates a React component- FilterBusiness
 */
class FilterBusiness extends Component {
  /**
    * onChange Event handler callback for FilterBusiness form fields
    * @param {object} event the event object
    *
    * @return {null} updates the state of the FilterBusiness component
    * @memberof FilterBusiness Component
    */
  onChange = (event) => {
    this.props.onSearchChange(event.target.value);
  }
  /**
    * Renders the FilterBusiness Component
    * @return {jsx} jsx element to render
    * @memberof FilterBusiness Component
    */
  render() {
    return (
    <div>
      <form>
        <input type="text" name='search' placeholder="Filter Businesses By Name" value={this.props.search} onChange={this.onChange} autoFocus />
      </form>
    </div>
    );
  }
}

export default FilterBusiness;

FilterBusiness.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};
