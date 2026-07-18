import {ProductImage} from './ProductImage'
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  discountPrice: number;
  stockQuantity: number;
  sku: string;
  isFeatured: boolean;
  isActive: boolean;
  categoryId: number;
  categoryName: string;
  brandName: string | null;
  color: string | null;
  compatibility: string | null;
  warrantyMonths: number;
  weight: number;
  images: ProductImage[] ;
}