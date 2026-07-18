import { OrderItem } from './order-item';
export interface Order {
  orderId: number;
  orderDate: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
}