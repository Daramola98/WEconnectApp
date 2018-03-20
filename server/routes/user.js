import express from 'express';
import user from '../controllers/user';
import userValidate from '../helpers/userHelper';

const router = express.Router();

router.post('/signUp', userValidate.userSignUpInputCheck, userValidate.userNameValidation, userValidate.userValidation, user.createUser);
router.post('/login', userValidate.userLoginInputCheck, user.loginUser);

export default router;
