import express from 'express';
import { CategoryController } from '../controllers';
import { authenticateToken } from '../middlewares';

const categoryRouter = express.Router();

categoryRouter
    .all('/', authenticateToken)
    .get('/', CategoryController.getAllCategories);

export { categoryRouter };

