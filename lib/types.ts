import { Product } from "@/types/product";

// Define the structure of the API response, including optional pagination
export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  code: number;
  data: T; // This represents the actual data array (products, etc.)
  pagination?: Pagination; // Make pagination optional
}

export interface CustomFilter {
  [key: string]: string | number | boolean | undefined | null;
}

export interface FetchPaginateParams {
  limit?: number;
  page?: number;
  ascending?: number;
  keyword?: string;
  customFilter?: CustomFilter;
}

export interface SuggestionsResponse {
  status: string;
  results: string[];
}

export type ListProps = {
    initial: Product[]
    keyword: string
}