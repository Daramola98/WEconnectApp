import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import businessesRoutes from '../routes/businesses';
import authRoutes from '../routes/auth';

const app = express();

// EXPRESS MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

const baseEndpoint = 'api/v1/weconnect';

// ROUTES
app.use(`${baseEndpoint}/businesses}`, authRoutes);
app.use(`${baseEndpoint}/businesses}`, businessesRoutes);

// LISTEN TO ACTIVITY ON PORT
const port = process.env.PORT || 5000;

app.listen(port);
