import express from 'express';
import { ReviewControllers } from './review.controller';
import { validateRequest } from '../../middleWares/validateRequest';
import { ReviewValidationSchemas } from './review.validation';
import { auth } from '../../middleWares/auth';
import { USER_ROLE } from '../auth/auth.constant';

const router=express.Router();

// create review
router.post('/create-review/:id',auth(USER_ROLE.admin,USER_ROLE.user),validateRequest(ReviewValidationSchemas.createReviewValidationSchema),ReviewControllers.createReview);
// get all review
router.get('/',ReviewControllers.getAllReview);
// get review by id
router.get('/:productId',ReviewControllers.getReviewsByProductId);


export const ReviewRoutes=router;