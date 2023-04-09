import { Request, Response } from 'express';
import { ProductService } from '../services';
import httpStatus from 'http-status';
import { invalidProductId } from '../errors';

async function createProduct(req: Request, res: Response) {
  try {
    const newProduct = await ProductService.createProduct(req.body); //Por serem muitos retornos, tratar em services
    res.status(201).json(newProduct);
  } catch (error: any) {
    if (error.name === 'productNameIsAlReadyRegistered') {
      return res.status(httpStatus.CONFLICT).send(error.message)
    };
    if (error.name === 'CategoryIdDoesNotExist') {
      return res.status(httpStatus.NOT_FOUND).send(error.message)
    };
    if (error.name === 'invalidCategory' || error.name === 'categoryParentDoesNotExistInThisID' || error.name === 'categoryNameDoesNotExist' || error.name === 'categoryNameDoesNotExistInThisID') {
      return res.status(httpStatus.BAD_REQUEST).send(error.message)
    };

    res.status(400).json({ message: error.message });
  }
};

async function getAllProducts(req: Request, res: Response) {
  try {
    const result = await ProductService.getAllProducts();
    res.status(200).json(result);
  } catch (error) {
    if (error.name === 'cannotGetAllProducts') {
      return res.status(httpStatus.NOT_FOUND).send(error.message)
    };
    res.status(500).json({ message: `Could not get all products: ${error}` });
  };
};

async function getProductById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const product = await ProductService.getProductById(id);
    return res.status(200).json(product);
  } catch (error) {
    if (error.name === 'productIdNotFound') {
      return res.status(httpStatus.NOT_FOUND).send(error.message)
    };
    if (error.name === 'invalidProductId') {
      return res.status(httpStatus.BAD_REQUEST).send(error.message)
    };
    if (error.name === 'invalidId') {
      return res.status(httpStatus.BAD_REQUEST).send(error.message)
    };

    return res.status(500).json({ error: 'Internal server error' });
  };
};

async function updateProduct(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (typeof id !== 'string' || id.length < 1) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    const updatedProduct = req.body;
    const updatedProductDoc = await ProductService.updateProduct(id, updatedProduct);
    res.json(updatedProductDoc);
  } catch (error) {
    if (error.name === 'productIdNotFound' || error.name === 'CategoryIdDoesNotExist') {
      return res.status(httpStatus.NOT_FOUND).send(error.message)
    };
    if (error.name === 'pricesCannotBeNegative' || error.name === 'quantityCannotBeNegative' || error.name === 'categoryParentDoesNotExistInThisID' || error.name === 'categoryNameDoesNotExist' || error.name === 'categoryNameDoesNotExistInThisID') {
      return res.status(httpStatus.BAD_REQUEST).send(error.message)
    };
    if (error.name === 'productNameIsAlReadyRegistered') {
      return res.status(httpStatus.CONFLICT).send(error.message)
    };

    res.status(500).json({ message: `Failure: ${error}` });
  };
};

async function deleteProduct(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) {
      throw invalidProductId(id);
    }
    const deletedCount = await ProductService.deleteProductById(id);
    res.json({ deletedCount });
  } catch (error) {
    if (error.name === 'invalidProductId' || error.name === 'invalidId') {
      return res.status(httpStatus.BAD_REQUEST).send(error.message)
    };
    if (error.name === 'productIdNotFound') {
      return res.status(httpStatus.NOT_FOUND).send(error.message)
    };

    res.status(500).json({ message: `Internal server error` });
  };
};

export const ProductController = {
  createProduct, getAllProducts, getProductById, updateProduct, deleteProduct
};
