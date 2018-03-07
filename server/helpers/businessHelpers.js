import businesses from '../models/businesses';

export default {
  // FIND BUSINESS BY GIVEN ID IN BUSINESS ARRAY
  findBusinessById(id) {
    const businessId = Number(id);
    let result;
    businesses.forEach((business) => {
      if (business.id === businessId) {
        result = business;
      }
    });
    return result;
  }
};

