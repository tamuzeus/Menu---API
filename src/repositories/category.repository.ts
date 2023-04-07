import { CategoryModel } from '../models/category.model';

async function getAllCategories() {
  const categories = await CategoryModel.find({});
  return categories;
}


export const CategoryRepository = {
  getAllCategories
};

