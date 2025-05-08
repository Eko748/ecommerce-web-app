// lib/apiClient.ts

import { Pagination, ApiResponse, FetchPaginateParams } from "./types"; // Import the interfaces
import { restAPI } from "./rest";


export const paginateParams: FetchPaginateParams = {
  limit: 10,
  page: 1,
  ascending: 0,
  search: "",
  customFilter: {},
};

// Fetch data and return both the data and pagination (if available)
export async function fetchData<T>(
  url: string,
  params: Record<string, string | number | boolean | undefined | null> = {}
): Promise<{ data: T; pagination?: Pagination }> {
  const response = await restAPI<ApiResponse<T>>("GET", url, params);

  // Safely cast pagination values to numbers if not provided or if they're in an unexpected type
  const pagination = response.pagination
    ? {
        total: Number(response.pagination.total),
        per_page: Number(response.pagination.per_page),
        current_page: Number(response.pagination.current_page),
        total_pages: Number(response.pagination.total_pages),
      }
    : {
        total: 0,
        per_page: Number(params.limit || 10),
        current_page: Number(params.page || 1),
        total_pages: 1,
      };

  // Return both the data and pagination metadata (if present)
  return {
    data: response.data,        // The actual data array
    pagination: pagination,      // The pagination metadata (if any)
  };
}
