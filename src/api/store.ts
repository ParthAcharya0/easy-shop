import type { ApiResponse } from "./auth";
import { privateInstance } from "./axios";
import { endpoints } from "@/constant/apiConstant";

export interface Data {
  category_id: number;
  category_name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  subcategory_id?: number;
  subcategory_name?: string;
  products: Product[];
}

export interface Product {
  id: number;
  title: string;
  image: string;
  label: string;
  actual_price: string;
  selling_price: string;
  discount_label?: string;
}

export const getStore = async (): Promise<ApiResponse<Data[]>> => {
  const res = await privateInstance.get(
    endpoints.GET_STORE.replace(":storeID", "1"),
  );
  return res.data;
};

export interface SearchProductParams {
  query: string;
  storeId?: number;
  page?: number;
}

export type SearchProductsResponse = ApiResponse<{ products: Product[] }>;

export const searchProducts = async (
  params: SearchProductParams,
): Promise<SearchProductsResponse> => {
  const res = await privateInstance.get(endpoints.SEARCH_PRODUCTS, {
    params: {
      query: params.query,
      storeId: params.storeId ?? 1,
      page: params.page ?? 1,
    },
  });

  return res.data;
};
