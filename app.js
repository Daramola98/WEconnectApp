import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import dotenv from 'dotenv';
import multer from 'multer';
import validator from 'express-validator';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './server/routes/user';
import businessRoutes from './server/routes/businesses';
import adminRoutes from './server/routes/admin';
import swaggerDocument from './swagger.json';
import config from './webpack.config';
import customValidations from './server/validations/customValidations';

dotenv.config();
const app = express();
const compiler = webpack(config);

// EXPRESS MIDDLEWARES
app.use('/images', express.static(path.join(__dirname, './client/public/images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(validator({
  customValidators: customValidations
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

// ROUTES
app.get('/api', (req, res) => {
  const apiRootMessage = {
    message: 'Welcome to the WEconnect API, Available endpoints are shown below',
    endpoints: {
      registerBusiness: 'POST /api/v1/businesses/',
      getBusinesses: 'GET /api/v1/businesses/',
      getBusiness: 'GET /api/v1/businesses/:businessId',
      updateBusiness: 'PUT /api/v1/businesses/:businessId',
      deleteBusiness: 'DELETE /api/v1/businesses/:businessId',
      getBusinessReview: 'GET /api/v1/businesses/:businessId/reviews',
      addBusinessReview: 'POST /api/v1/businesses/:businessId/review'
    }
  };
  res.status(200).json(apiRootMessage);
});
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/businesses', businessRoutes);
app.use('/api/v1/admin', adminRoutes);

// CATCH ALL ENDPOINT THAT DO NOT EXIST AND RETURN ERROR MESSAGE
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint not Found' });
});

// LISTEN TO ACTIVITY ON PORT
const port = parseInt(process.env.PORT, 10) || 8080;
app.listen(port);

export default app;
