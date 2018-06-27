import express from 'express';
import Users from '../controllers/Users';
import modelValidator from '../helpers/modelValidator';
import contactUsValidation from '../validations/contactUsValidation';
import isAuthorized from '../middlewares/isAuthorized';
import { userIdCheck } from '../middlewares/validationHelper';
import { addBusinessCategory, listBusinessCategories, addBusinessLocation, removeEmailUnique } from '../helpers/businessHelpers';
import { addContactInfo, getContactUsMessages } from '../helpers/contactUsHelper';

const router = express.Router();

router.get('/users', isAuthorized, Users.getUsers);
router.get('/businessCategory', listBusinessCategories);
router.post('/businessCategory', isAuthorized, addBusinessCategory);
router.post('/businessLocation', isAuthorized, addBusinessLocation);
router.get('/contactUs', isAuthorized, getContactUsMessages);
router.post('/contactUs', modelValidator(contactUsValidation), addContactInfo);
router.delete('/user/:userId', isAuthorized, userIdCheck, Users.deleteUser);

export default router;
