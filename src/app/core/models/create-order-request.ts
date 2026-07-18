export interface CreateOrderRequest {
  userId: number;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}