import express from 'express';
import { ProductController } from '../controllers/product.controller';
import authenticateToken from '../middlewares/acess.middlware';

const productRouter = express.Router();

productRouter.post('/product', authenticateToken, ProductController.createProduct)

export default productRouter;
