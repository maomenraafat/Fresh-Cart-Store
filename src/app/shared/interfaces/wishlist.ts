import { Brand } from './brand';
import { Category } from './category';

export interface Wishlist {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  priceAfterDiscount?: number;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
