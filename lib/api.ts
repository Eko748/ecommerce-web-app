import { Product } from "@/types/product";
import { fetchData, fetchOpenSourceAPI } from "./client";
import { paginateParams } from "./const";
import {
  FetchPaginateParams,
  Pagination,
  SuggestionsResponse,
} from "./types";

// Fetch products with pagination parameters
export async function fetchProducts(
  params: FetchPaginateParams = paginateParams
): Promise<{ data: Product[]; pagination?: Pagination }> {
  const mergedParams = {
    page: params.page ?? paginateParams.page,
    per_page: params.limit ?? paginateParams.limit,
    ascending: params.ascending ?? paginateParams.ascending,
    keyword: params.keyword ?? paginateParams.keyword,
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

export async function fetchWikipediaSuggestions(
  query: string
): Promise<string[]> {
  // Define the parameters to be passed to the API
  const params = { keyword: query };

  // Call the generic fetch function with the appropriate URL and parameters
  const response = await fetchOpenSourceAPI<{
    suggestions: never[];
    data: SuggestionsResponse;
  }>(`/wikipedia/suggestions`, params);

  // Access the 'suggestions' field from the 'data' property
  return response.data.suggestions || []; // This ensures we return the correct type (string[])
}

export async function fetchFakeStoreSuggestions(
  query: string
): Promise<string[]> {
  // Define the parameters to be passed to the API
  const params = { keyword: query };

  // Call the generic fetch function with the appropriate URL and parameters
  const response = await fetchOpenSourceAPI<{
    suggestions: never[];
    data: SuggestionsResponse;
  }>(`/fakestore/suggestions`, params);

  // Access the 'suggestions' field from the 'data' property
  return response.data.suggestions || []; // This ensures we return the correct type (string[])
}