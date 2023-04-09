import express from 'express';
import { ProductController } from '../controllers';
import { authenticateToken } from '../middlewares';

const productRouter = express.Router();

productRouter
    .all('/', authenticateToken)
    .post('/', ProductController.createProduct)
    .get('/', ProductController.getAllProducts)
    .get('/:id', ProductController.getProductById)
    .patch('/:id', ProductController.updateProduct)
    .delete('/:id', ProductController.deleteProduct);

export { productRouter };
