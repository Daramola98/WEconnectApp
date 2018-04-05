import express from 'express';
import Businesses from '../controllers/Businesses';
import { businessIdCheck, businessQueryCheck } from '../middlewares/validationHelper';
import isAuthorized from '../middlewares/isAuthorized';
import modelValidator from '../helpers/modelValidator';
import { businessValidation, businessExists, businessUpdateValidation } from '../validations/businessValidation';
import reviewValidation from '../validations/reviewValidation';
import reviewResponseValidation from '../validations/reviewResponseValidation';

const router = express.Router();

router.post('/', isAuthorized, modelValidator(businessValidation), businessExists, Businesses.createBusiness);

router.get('/', businessQueryCheck, Businesses.listBusinesses);

router.get('/user', isAuthorized, Businesses.retrieveUserBusinesses);

router.get('/:businessId', businessIdCheck, Businesses.retrieveBusiness);

router.put(
  '/:businessId',
  isAuthorized,
  businessIdCheck,
  modelValidator(businessUpdateValidation),
  businessExists, Businesses.updateBusiness
);

router.delete('/:businessId', isAuthorized, businessIdCheck, Businesses.removeBusiness);

router.post('/:businessId/reviews', isAuthorized, businessIdCheck, modelValidator(reviewValidation), Businesses.addReview);

router.post(
  '/:businessId/reviews/:reviewId',
  isAuthorized, businessIdCheck,
  modelValidator(reviewResponseValidation),
  Businesses.addReviewResponse
);

router.get('/:businessId/reviews', businessIdCheck, Businesses.getReview);

export default router;
