import express from 'express';
import Businesses from '../controllers/Businesses';
import validate from '../helpers/validationHelper';
import authorize from '../helpers/check-auth';
import businessValidate from '../helpers/businessHelpers';
import checkRequiredFields from '../middlewares/checkRequiredFields';
import requiredFields from '../helpers/requiredFields';

const { businessRequiredFields } = requiredFields;


const router = express.Router();

router.post('/', authorize.checkAuthentication, checkRequiredFields(businessRequiredFields), businessValidate.businessValidation, Businesses.createBusiness);
router.get('/', validate.businessQueryCheck, Businesses.listBusinesses);
router.get('/user', authorize.checkAuthentication, Businesses.retrieveUserBusinesses);

router.get('/:businessId', validate.businessIdCheck, Businesses.retrieveBusiness);
router.put('/:businessId', authorize.checkAuthentication, validate.businessIdCheck, businessValidate.checkIfBusinessWithIdExists, businessValidate.businessValidation, Businesses.updateBusiness);
router.delete('/:businessId', authorize.checkAuthentication, validate.businessIdCheck, Businesses.removeBusiness);

router.post('/:businessId/reviews', authorize.checkAuthentication, validate.businessIdCheck, Businesses.addReview);
router.post('/:businessId/reviews/:reviewId', authorize.checkAuthentication, validate.businessIdCheck, Businesses.addReviewResponse);
router.get('/:businessId/reviews', validate.businessIdCheck, Businesses.getReview);

export default router;
