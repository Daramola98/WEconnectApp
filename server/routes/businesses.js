import business from '../controllers/businesses';
import validate from '../helpers/validationHelper';

const baseEndpoint = '/api/v1/weconnect/businesses';

export default (app) => {
  app.post(`${baseEndpoint}/`, validate.businessRegisterInputCheck, business.createBusiness);
  app.get(`${baseEndpoint}/`, validate.businessQueryCheck, business.listBusinesses);

  app.get(`${baseEndpoint}/:businessId`, validate.businessIdCheck, business.retrieveBusiness);
  app.put(`${baseEndpoint}/:businessId`, validate.businessIdCheck, validate.businessUpdateInputCheck, business.updateBusiness);
  app.delete(`${baseEndpoint}/:businessId`, validate.businessIdCheck, business.removeBusiness);

  app.post(`${baseEndpoint}/:businessId/reviews`, validate.businessIdCheck, validate.businessReviewInputCheck, business.addReview);
  app.get(`${baseEndpoint}/:businessId/reviews`, validate.businessIdCheck, business.getReview);
};
