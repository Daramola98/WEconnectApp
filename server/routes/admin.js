import express from 'express';
import Users from '../controllers/Users';
import isAuthorized from '../middlewares/isAuthorized';
import { userIdCheck } from '../middlewares/validationHelper';
import { addBusinessCategory, listBusinessCategories } from '../helpers/businessHelpers';

const router = express.Router();

router.get('/users', isAuthorized, Users.getUsers);
router.get('/businessCategory', listBusinessCategories);
router.post('/businessCategory', isAuthorized, addBusinessCategory);
router.delete('/user/:userId', isAuthorized, userIdCheck, Users.delete);

export default router;
