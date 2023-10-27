export interface OrderDetails {
  importPort: string;
  exportPort: string;
}

export interface GetOrderDetailsResponse {
  id: string;
  importPort: string;
  exportPort: string;
  products: Product[];
}
export interface CreateOrderDetail {
  importPort: string;
  exportPort: string;
  products: CreateProduct[];
}
export interface CreateProduct {
  name: string;
  quantity: number;
  unitPrice: number;
}
export interface Product {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}
