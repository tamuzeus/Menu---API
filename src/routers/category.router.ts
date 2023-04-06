import express from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authenticateToken } from '../middlewares/acess.middlware';

const categoryRouter = express.Router();

categoryRouter.get('/category', authenticateToken, CategoryController.getAllCategories);

export default categoryRouter;
