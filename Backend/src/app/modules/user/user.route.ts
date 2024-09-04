import express from 'express';
import { UserControllers } from './user.controller';
import { validateRequest } from '../../middleWares/validateRequest';
import { userValidationSchemas } from './user.validation';
import { auth } from '../../middleWares/auth';
import { USER_ROLE } from '../auth/auth.constant';

const router=express.Router();
// register user
router.post('/register',validateRequest(userValidationSchemas.userValidationSchema),UserControllers.createUser);
// get all user
router.get('/',UserControllers.getAllUser);
// get user profile
router.get('/user-profile',auth(USER_ROLE.admin,USER_ROLE.user),UserControllers.getUserProfile);
// update user profile
router.patch('/update-user-profile',auth(USER_ROLE.admin,USER_ROLE.user),UserControllers.updateUserProfile);

export const userRoutes=router;