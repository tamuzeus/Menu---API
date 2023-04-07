import mongoose, { Document, Model } from 'mongoose';
import { Category } from './category.model';

export interface Product extends Document {
  categories: Category[];
  name: string;
  qty: number;
  price: number;
}

const productMongooseSchema = new mongoose.Schema<Product>({
  categories: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
});

export const ProductModel: Model<Product> = mongoose.model<Product>('Product', productMongooseSchema, 'products');
