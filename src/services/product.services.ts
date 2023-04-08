import { Product, ProductModel, ProductUpdate } from '../models/product.model';
import { productSchema, productSchemaUpdate } from '../schemas/product.schema';
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

    // Verificar se existe uma ou mais categorias no produto
    if (productData.categories && productData.categories.length > 0) {
        // Mapeia as categorias selecionadas 
        const categories = await Promise.all(productData.categories.map(async (categoryId) => {
            const foundCategory = await CategoryModel.findOne({ _id: categoryId });
            //Se uma não for encontrada, retorna erro 
            if (!foundCategory) {
                throw new Error(`Category with id "${categoryId._id}" does not exist`);
            }
            return foundCategory.toObject() as Category;
        }));
        // Substitui a lista de ids de categorias pela lista de objetos de categoria correspondentes
        productData.categories = categories;
    }

    const newProduct = await ProductRepository.createProduct(productData);
    return newProduct;
}


async function getAllProducts() {
    const products = await ProductRepository.getAllProducts();
    if (!products) {
        throw new Error(`Empty products`);
    }
    return products;
}


async function getProductById(id: string) {
    const products = await ProductRepository.getProductById(id);
    if (!products) {
        throw new Error(`Id "${id}", not found`);
    }
    return products;
}

async function updateProduct(id: string, updatedProduct: ProductUpdate) {
    //Remover o userId
    const body = {
        categories: updatedProduct.categories,
        name: updatedProduct.name,
        qty: updatedProduct.qty,
        price: updatedProduct.price
    };

    const { error } = productSchemaUpdate.validate(body);
    if (error) {
        throw new Error(error.message);
    }

    const existingProduct = await getProductById(id);
    if (!existingProduct) {
        throw new Error(`Produto com ID '${id}' não encontrado`);
    }

    if ((updatedProduct.price ?? existingProduct.price) < 0) {
        throw new Error("O preço não pode ser negativo");
    }

    if ((updatedProduct.qty ?? existingProduct.qty) < 0) {
        throw new Error("A quantidade não pode ser negativa");
    }

    const { name } = updatedProduct;
    const existingProductByName = await ProductModel.findOne({ name });
    if (existingProductByName) {
        throw new Error('There is already a product with this exact name in the registry');
    }
    if (updatedProduct.categories && updatedProduct.categories.length > 0) {
        const categories = await Promise.all(updatedProduct.categories.map(async (categoryId) => {
            const foundCategory = await CategoryModel.findOne({ _id: categoryId });
            if (!foundCategory) {
                throw new Error(`Category with id "${categoryId._id}" does not exist`);
            }
            return foundCategory.toObject() as Category;
        }));
        updatedProduct.categories = categories;
    }

    // Atualiza com as informações atualizadas, combinando as informações com as novas informações do "updatedProduct"
    const updatedProductDoc = await ProductRepository.updateProductById(id, {
        ...existingProduct,
        ...body,
        categories: body.categories ?? existingProduct.categories
    });
    return updatedProductDoc;
}

async function deleteProductById(id: string) {
    const products = await ProductRepository.getProductById(id);
    if (!products) {
        throw new Error(`Id "${id}", not found`);
    } 

    const deleteProduct = ProductRepository.deleteProductById(id)
    return deleteProduct
}

export const ProductService = {
    createProduct, getAllProducts, getProductById, updateProduct, deleteProductById
};
