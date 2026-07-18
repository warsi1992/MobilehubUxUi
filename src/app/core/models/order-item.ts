export interface OrderItem {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string | null;
  total: number;
}
