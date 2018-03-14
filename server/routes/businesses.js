import express from 'express';
import business from '../controllers/businesses';
import validate from '../helpers/validationHelper';
import authorize from '../helpers/check-auth';

const router = express.Router();

router.post('/', authorize.checkAuthentication, validate.businessRegisterInputCheck, business.createBusiness);
router.get('/', validate.businessQueryCheck, business.listBusinesses);

router.get('/:businessId', validate.businessIdCheck, business.retrieveBusiness);
router.put('/:businessId', authorize.checkAuthentication, validate.businessIdCheck, validate.businessUpdateInputCheck, business.updateBusiness);
router.delete('/:businessId', authorize.checkAuthentication, validate.businessIdCheck, business.removeBusiness);

router.post('/:businessId/reviews', authorize.checkAuthentication, validate.businessIdCheck, validate.businessReviewInputCheck, business.addReview);
router.get('/:businessId/reviews', validate.businessIdCheck, business.getReview);

export default router;
