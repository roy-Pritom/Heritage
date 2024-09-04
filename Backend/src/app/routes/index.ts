import express from 'express';
import { userRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { PropertyRoutes } from '../modules/property/property.route';
import { ReviewRoutes } from '../modules/review/review.route';

const router = express.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/property',
        route: PropertyRoutes
    },
    {
        path: '/review',
        route: ReviewRoutes
    },
    
]

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;