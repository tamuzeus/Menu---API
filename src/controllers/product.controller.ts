import { Request, Response } from 'express';
import { ProductService } from '../services/product.services';

async function createProduct(req: Request, res: Response) {
  try {
    const newProduct = await ProductService.createProduct(req.body); //Por serem muitos retornos, tratar em services
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllProducts(req: Request, res: Response) {
  try {
    const result = await ProductService.getAllProducts();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: `Could not get all products: ${error}` });
  }
}

async function getProductById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const product = await ProductService.getProductById(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateProduct(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (typeof id !== 'string' || id.length < 1) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const updatedProduct = req.body;
    const updatedProductDoc = await ProductService.updateProduct(id, updatedProduct);

    res.json(updatedProductDoc);
  } catch (error) {
    res.status(500).json({ message: `Failure: ${error}` });
  }
}

async function deleteProduct(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error('Missing product ID');
    }
    const deletedCount = await ProductService.deleteProductById(id);
    res.json({ deletedCount });
  } catch (error) {
    res.status(500).json({ message: `Failure: ${error}` });
  }
}

export const ProductController = {
  createProduct, getAllProducts, getProductById, updateProduct, deleteProduct
};
