import { CategoryRepository } from '../repositories/category.repository'

async function getAllCategories() {
    try {
        const categories = await CategoryRepository.getAllCategories();
        if (!categories) {
            throw new Error(`Empty categories`);
        }
        return categories;
    } catch (error) {
        throw new Error(`Could not get all categories: ${error}`);
    }
}

export const CategoryService = {
    getAllCategories
};