import businesses from '../models/businesses';

export default {
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

