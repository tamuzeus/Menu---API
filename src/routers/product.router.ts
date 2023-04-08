import express from 'express';
import { ProductController } from '../controllers/product.controller';
import authenticateToken from '../middlewares/acess.middlware';

const productRouter = express.Router();

productRouter.post('/product', authenticateToken, ProductController.createProduct)
    .get('/product', authenticateToken, ProductController.getAllProducts)
    .get('/product/:id', authenticateToken, ProductController.getProductById)
    .patch('/product/:id', authenticateToken, ProductController.updateProduct)
    .delete('/product/:id', authenticateToken, ProductController.deleteProduct)

export default productRouter;
