import business from '../controllers/businesses';

const baseEndpoint = '/api/v1/weconnect/businesses';

export default (app) => {
  app.post(`${baseEndpoint}/`, business.create);
  app.get(`${baseEndpoint}/`, business.list);
  app.get(`${baseEndpoint}/:businessId`, business.retrieve);
  app.put(`${baseEndpoint}/:businessId`, business.update);
  app.delete(`${baseEndpoint}/:businessId`, business.remove);
  app.post(`${baseEndpoint}/:businessId/reviews`, business.addReview);
  app.get(`${baseEndpoint}/:businessId/reviews`, business.getReview);
};
