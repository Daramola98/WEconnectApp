import express from 'express';
import path from 'path';
import validator from 'express-validator';
import bodyParser from 'body-parser';
import routes from '../routes/index';

const app = express();

// EXPRESS MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

// ROUTES
app.get('/', (req, res) => {
  const apiRootMessage = {
    message: 'Welcome to the WEconnect API, Available endpoints are shown below',
    endpoints: {
      registerBusiness: 'POST /api/v1/weconnect/businesses/',
      getBusinesses: 'GET /api/v1/weconnect/businesses/',
      getBusiness: 'GET /api/v1/weconnect/businesses/:businessId',
      updateBusiness: 'PUT /api/v1/weconnect/businesses/:businessId',
      deleteBusiness: 'DELETE /api/v1/weconnect/businesses/:businessId',
      getBusinessReview: 'GET /api/v1/weconnect/businesses/:businessId/reviews',
      addBusinessReview: 'POST /api/v1/weconnect/businesses/:businessId/review'
    }
  };
  res.status(200).json(apiRootMessage);
});
routes.businesses(app);
// CATCH ALL ENDPOINT THAT DO NOT EXIST AND RETURN ERROR MESSAGE
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint not Found' });
});
// LISTEN TO ACTIVITY ON PORT
const port = parseInt(process.env.PORT, 10) || 8080;
app.listen(port);

export default app;
