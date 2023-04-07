import { Product, ProductModel } from '../models/product.model';
import { productSchema } from '../schemas/product.schema';
import { ProductRepository } from '../repositories/product.repository';
import { CategoryModel, Category } from '../models/category.model';

async function createProduct(productData: Product) {
    const body = {
        categories: productData.categories,
        name: productData.name,
        qty: productData.qty,
        price: productData.price
    }
    const { error } = productSchema.validate(body);
    if (error) {
        throw new Error(error.message);
    }

    const { name } = productData;
    const existingProduct = await ProductModel.findOne({ name });
    if (existingProduct) {
        throw new Error('There is already a product with this exact name in the registry');
    }


    // Verifica se existe uma ou mais categorias no produto
    if (productData.categories && productData.categories.length > 0) {
        // Mapeia as categorias selecionadas 
        const categories = await Promise.all(productData.categories.map(async (categoryId) => {
            const foundCategory = await CategoryModel.findOne({ _id: categoryId });
            //Se uma não for encontrada, retorna erro 
            if (!foundCategory) {
                console.log(categoryId._id)
                throw new Error(`Category with id "${categoryId._id}" does not exist`);
            }
            return foundCategory.toObject() as Category;
        }));
        // Substitui a lista de IDs de categorias pela lista de objetos Categoria correspondentes
        productData.categories = categories;
    }

    const newProduct = await ProductRepository.createProduct(productData);
    return newProduct;
}

export const ProductService = {
    createProduct,
};
