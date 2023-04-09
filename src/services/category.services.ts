import { CategoryRepository } from '../repositories';
import { cannotGetAllCategories } from '../errors';

async function getAllCategories() {
    const categories = await CategoryRepository.getAllCategories();
    if (!categories) {
        throw cannotGetAllCategories();
    };
    
    return categories;
};

export const CategoryService = {
    getAllCategories
};