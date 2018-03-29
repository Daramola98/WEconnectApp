import express from 'express';
import user from '../controllers/user';
import userValidate from '../helpers/userHelper';
import authorize from '../helpers/check-auth';
import isInvalidData from '../middlewares/isInvalidData';

const router = express.Router();

router.post('/signUp', isInvalidData, userValidate.userNameValidation, userValidate.userEmailValidation, user.createUser);
router.post('/login', user.loginUser);
router.put('/updateProfile', authorize.checkAuthentication, isInvalidData, user.updateUserDetails);

export default router;
