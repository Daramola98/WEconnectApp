import express from 'express';
import user from '../controllers/user';
import userValidate from '../helpers/userHelper';
import authorize from '../helpers/check-auth';

const router = express.Router();

router.post('/signUp', userValidate.userNameValidation, userValidate.userEmailValidation, user.createUser);
router.post('/login', user.loginUser);
router.put('/updateProfile', authorize.checkAuthentication, user.updateUserDetails);

export default router;
