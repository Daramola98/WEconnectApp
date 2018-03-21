import express from 'express';
import business from '../controllers/businesses';
import validate from '../helpers/validationHelper';
import authorize from '../helpers/check-auth';
import businessValidate from '../helpers/businessHelpers';

const router = express.Router();

router.post('/', authorize.checkAuthentication, businessValidate.businessValidation, business.createBusiness);
router.get('/', validate.businessQueryCheck, business.listBusinesses);

router.get('/:businessId', validate.businessIdCheck, business.retrieveBusiness);
router.put('/:businessId', authorize.checkAuthentication, validate.businessIdCheck, businessValidate.checkIfBusinessWithIdExists, businessValidate.businessValidation, business.updateBusiness);
router.delete('/:businessId', authorize.checkAuthentication, validate.businessIdCheck, business.removeBusiness);

router.post('/:businessId/reviews', authorize.checkAuthentication, validate.businessIdCheck, business.addReview);
router.post('/:businessId/reviews/:reviewId', authorize.checkAuthentication, validate.businessIdCheck, business.addReviewResponse);
router.get('/:businessId/reviews', validate.businessIdCheck, business.getReview);

export default router;
