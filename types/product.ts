// types/product.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  main_category_id: number;
  created_at: string;
  created_by: number;
  updated_at?: string;
  updated_by?: number;
  deleted_at?: string;
  deleted_by?: number;
  slug?: string;
}
