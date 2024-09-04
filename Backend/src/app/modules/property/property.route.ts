import express from 'express';
import { validateRequest } from '../../middleWares/validateRequest';
import { PropertyValidationSchemas } from './property.validation';
import { PropertyControllers } from './property.controller';
import { auth } from '../../middleWares/auth';
import { USER_ROLE } from '../auth/auth.constant';

const router = express.Router();

// create property
router.post('/create-property', auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(PropertyValidationSchemas.createPropertyValidationSchema), PropertyControllers.createProperty);
// place bid
router.patch('/place-bid/:id', auth(USER_ROLE.admin, USER_ROLE.user), PropertyControllers.placeBid);
// get highest bid win property by user
router.get('/win-property', auth(USER_ROLE.user, USER_ROLE.admin), PropertyControllers.getWinProperty);
// get all property
router.get('/', PropertyControllers.getAllProperty);
// get property by Id
router.get('/:id', PropertyControllers.getPropertyById);

export const PropertyRoutes = router;