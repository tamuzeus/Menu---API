import { Request, Response } from 'express';
import { CategoryService } from '../services/category.services';

async function getAllCategories(req: Request, res: Response) {
  try {
    const result = await CategoryService.getAllCategories();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: `Could not get all categories: ${error}` });
  }
}

export const CategoryController = {
  getAllCategories,
};
