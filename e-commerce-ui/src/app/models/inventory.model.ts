export interface Inventory {
  id?: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  category: string;
  imageUrl?: string;
}
