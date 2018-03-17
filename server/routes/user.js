import express from 'express';
import user from '../controllers/user';
import userValidate from '../helpers/userHelper';
import authorize from '../helpers/check-auth';

const router = express.Router();

router.post('/signUp', userValidate.userSignUpInputCheck, userValidate.userNameValidation, userValidate.userEmailValidation, user.createUser);
router.post('/login', userValidate.userLoginInputCheck, user.loginUser);
router.put('/updateProfile', authorize.checkAuthentication, userValidate.userUpdateProfileInputCheck, user.updateUserDetails);

export default router;
