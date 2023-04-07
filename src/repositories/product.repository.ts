import { Product, ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';

async function createProduct(productData: Product) {
    const categories = await CategoryModel.find({ _id: { $in: productData.categories } });
    if (!categories.length) {
        throw new Error('Invalid categories');
    }

    const product = new ProductModel({
        ...productData,
        categories
    });

    return product.save();
}


export const ProductRepository = {
    createProduct
};
