import { Request, Response } from 'express';
import { ProductService } from '../services/product.services';

async function createProduct(req: Request, res: Response) {
    try {
        const newProduct = await ProductService.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const ProductController = {
    createProduct,
};
