import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import routes from '../routes/index';

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

// ROUTES
routes.businesses(app);

// LISTEN TO ACTIVITY ON PORT
const port = process.env.PORT || 5000;

app.listen(port);

export default app;
