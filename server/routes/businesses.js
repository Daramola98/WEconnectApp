import express from 'express';
import business from '../controllers/businesses';
import validate from '../helpers/validationHelper';
import authorize from '../helpers/check-auth';
import businessValidate from '../helpers/businessHelpers';
import isInvalidData from '../middlewares/isInvalidData';

const router = express.Router();

router.post('/', authorize.checkAuthentication, isInvalidData, businessValidate.businessValidation, business.createBusiness);
router.get('/', validate.businessQueryCheck, business.listBusinesses);
router.get('/user', authorize.checkAuthentication, business.retrieveUserBusinesses);

router.get('/:businessId', validate.businessIdCheck, business.retrieveBusiness);
router.put('/:businessId', authorize.checkAuthentication, validate.businessIdCheck, businessValidate.checkIfBusinessWithIdExists, businessValidate.businessValidation, business.updateBusiness);
router.delete('/:businessId', authorize.checkAuthentication, validate.businessIdCheck, business.removeBusiness);

router.post('/:businessId/reviews', authorize.checkAuthentication, isInvalidData, validate.businessIdCheck, business.addReview);
router.post('/:businessId/reviews/:reviewId', authorize.checkAuthentication, validate.businessIdCheck, isInvalidData, business.addReviewResponse);
router.get('/:businessId/reviews', validate.businessIdCheck, business.getReview);

export default router;
