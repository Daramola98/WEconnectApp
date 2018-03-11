import business from '../controllers/businesses';
import validate from '../helpers/validationHelper';

const baseEndpoint = '/api/v1/weconnect/businesses';

export default (app) => {
  app.post(`${baseEndpoint}/`, validate.businessRegisterInputCheck, business.create);
  app.get(`${baseEndpoint}/`, validate.businessQueryCheck, business.listBusinesses);

  app.get(`${baseEndpoint}/:businessId`, validate.businessIdCheck, business.retrieve);
  app.put(`${baseEndpoint}/:businessId`, validate.businessIdCheck, validate.businessUpdateInputCheck, business.update);
  app.delete(`${baseEndpoint}/:businessId`, validate.businessIdCheck, business.remove);

  app.post(`${baseEndpoint}/:businessId/reviews`, validate.businessIdCheck, validate.businessReviewInputCheck, business.addReview);
  app.get(`${baseEndpoint}/:businessId/reviews`, validate.businessIdCheck, business.getReview);
};
