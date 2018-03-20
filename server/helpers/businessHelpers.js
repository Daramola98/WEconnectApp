import businesses from '../dummymodel/businessesDummy';

export default {
  // FIND BUSINESS BY GIVEN ID IN BUSINESSES ARRAY
  findBusinessById(id) {
    const businessId = Number(id);
    const result = businesses.find(business => business.id === businessId);
    return result;
  },
  // FIND INDEX OF BUSINESS IN BUSINESSES ARRAY BY  GIVEN ID
  findBusinessIndexById(id) {
    const businessId = Number(id);
    let result;
    businesses.forEach((business, index) => {
      if (business.id === businessId) {
        result = index;
      }
    });
    return result;
  }
};

