import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import validator from 'express-validator';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import userRoutes from '../routes/user';
import businessRoutes from '../routes/businesses';
import swaggerDocument from '../../swagger.json';

dotenv.config();
const app = express();

// EXPRESS MIDDLEWARES
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// CORS
/*
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});
*/

// EXPRESS MIDDLEWARES
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
app.use('/api/v1/weconnect/auth', userRoutes);
app.use('/api/v1/weconnect/businesses', businessRoutes);

// CATCH ALL ENDPOINT THAT DO NOT EXIST AND RETURN ERROR MESSAGE
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint not Found' });
});
// LISTEN TO ACTIVITY ON PORT
const port = parseInt(process.env.PORT, 10) || 8080;
app.listen(port);

export default app;
