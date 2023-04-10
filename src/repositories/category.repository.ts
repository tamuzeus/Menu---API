import { CategoryModel } from '../models';

async function getAllCategories() {
  const categories = await CategoryModel.find({});
  return categories;
};

export const CategoryRepository = {
  getAllCategories
};

