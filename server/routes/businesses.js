import express from 'express';
import Businesses from '../controllers/Businesses';
import { businessIdCheck, reviewIdCheck, businessQueryCheck } from '../middlewares/validationHelper';
import isAuthorized from '../middlewares/isAuthorized';
import upload from '../middlewares/fileUpload';
import isValidFile from '../middlewares/isValidFile';
import modelValidator from '../helpers/modelValidator';
import { businessValidation, businessExists, businessUpdateValidation } from '../validations/businessValidation';
import reviewValidation from '../validations/reviewValidation';
import reviewResponseValidation from '../validations/reviewResponseValidation';

const router = express.Router();

router.post('/', isAuthorized, isValidFile, modelValidator(businessValidation), businessExists, Businesses.createBusiness);

router.get('/', businessQueryCheck, Businesses.listBusinesses);

router.get('/user', isAuthorized, businessQueryCheck, Businesses.retrieveUserBusinesses);

router.get('/:businessId', businessIdCheck, Businesses.retrieveBusiness);

router.put(
  '/:businessId',
  isAuthorized,
  businessIdCheck,
  isValidFile,
  modelValidator(businessUpdateValidation),
  // businessExists,
  Businesses.updateBusiness
);

router.delete('/:businessId', isAuthorized, businessIdCheck, Businesses.removeBusiness);

router.post('/:businessId/reviews', isAuthorized, businessIdCheck, modelValidator(reviewValidation), Businesses.addReview);
router.put('/:businessId/reviews/:reviewId', isAuthorized, businessIdCheck, reviewIdCheck, modelValidator(reviewValidation), Businesses.updateReview);
router.delete('/:businessId/reviews/:reviewId', isAuthorized, businessIdCheck, reviewIdCheck, Businesses.deleteReview);

router.post(
  '/:businessId/reviews/:reviewId',
  isAuthorized, businessIdCheck,
  reviewIdCheck,
  modelValidator(reviewResponseValidation),
  Businesses.addReviewResponse
);

router.get('/:businessId/reviews', businessIdCheck, businessQueryCheck, Businesses.getReview);

export default router;
