import express from 'express';
import user from '../controllers/Users';
import userValidation from '../middlewares/userValidation';
import authorize from '../helpers/check-auth';
import checkRequiredFields from '../middlewares/checkRequiredFields';
import requiredFields from '../helpers/requiredFields';

const { userValidationRules } = requiredFields;
const { userNameValidation } = userValidation;
const { userEmailValidation } = userValidation;
const router = express.Router();

router.post('/signUp', checkRequiredFields(userValidationRules), userNameValidation, userEmailValidation, user.createUser);
router.post('/login', user.loginUser);
router.put('/updateProfile', authorize.checkAuthentication, user.updateUserDetails);

export default router;
