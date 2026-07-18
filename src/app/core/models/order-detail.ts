import { OrderItem } from './order-item';
export interface OrderDetail {
  orderId: number;
  orderDate: string;
  totalAmount: number;
  status: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;

  items: OrderItem[];
}