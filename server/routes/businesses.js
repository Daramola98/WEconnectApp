import business from '../controllers/businesses';

const baseEndpoint = '/api/v1/weconnect/businesses';

export default (app) => {
  app.post(`${baseEndpoint}/`, business.create);
};
