import { CategoryModel } from '../models/category.model';

async function getAllCategories() {
  const categories = await CategoryModel.find({});
  console.log(categories)
  return categories;
}


export const CategoryRepository = {
  getAllCategories
};
