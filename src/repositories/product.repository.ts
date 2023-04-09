import { Product, ProductModel, ProductUpdate, CategoryModel } from '../models';
import { Types } from 'mongoose';
import { invalidCategory, invalidId, invalidProductId, productIdNotFound } from '../errors';

async function createProduct(productData: Product) {
  const categories = await CategoryModel.find({ _id: { $in: productData.categories } });

  if (!categories.length) {
    throw invalidCategory();
  };

  const product = new ProductModel({
    ...productData,
    categories
  });

  return product.save();
};

async function getAllProducts() {
  const products = await ProductModel.find({})
    .populate({ path: 'categories', model: 'Category' })
    .exec();

  return products;
};

async function getProductById(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw invalidId(id);
  };

  const product = await ProductModel.findOne({ _id: id })
    .populate({ path: 'categories', model: 'Category' })
    .exec();

  if (!product) {
    throw invalidProductId(id);
  };

  return product;
};

async function updateProductById(id: string, updatedProduct: ProductUpdate) {
  const updatedFields = {
    categories: updatedProduct.categories,
    name: updatedProduct.name,
    qty: updatedProduct.qty,
    price: updatedProduct.price,
  };

  const updatedProductDoc = await ProductModel.findByIdAndUpdate(id, updatedFields, {
    new: true,
    runValidators: true,
  }).populate({ path: 'categories', model: 'Category' })
    .exec();

  if (!updatedProductDoc) {
    throw productIdNotFound(id);
  };

  return updatedProductDoc.toObject();
};

async function deleteProductById(id: string) {
  const result = await ProductModel.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    throw productIdNotFound(id);
  };

  const finalResult = `Product with id ${id} has been deleted`;
  return finalResult;
};

export const ProductRepository = {
  createProduct, getAllProducts, getProductById, updateProductById, deleteProductById
};
