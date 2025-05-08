import { Product } from "@/types/product";
import { fetchData } from "./client";
import { paginateParams } from "./const";
import { FetchPaginateParams, Pagination } from "./types";

// Fetch products with pagination parameters
export async function fetchProducts(params: FetchPaginateParams = paginateParams): Promise<{ data: Product[]; pagination?: Pagination }> {
  const mergedParams = {
    page: params.page ?? paginateParams.page,
    per_page: params.limit ?? paginateParams.limit,
    ascending: params.ascending ?? paginateParams.ascending,
    search: params.search ?? paginateParams.search,
    ...(params.customFilter || {}),
  };

  const response = await fetchData<Product[]>("/products", mergedParams);

  return {
    data: response.data,
    pagination: response.pagination,
  };
}

// Fetch a single product by its ID
export async function fetchProductById(id: string): Promise<Product> {
  const response = await fetchData<Product>(`/products/${id}`);
  return response.data;
}

