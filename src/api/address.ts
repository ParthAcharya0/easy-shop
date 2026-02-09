import { endpoints } from "@/constant/apiConstant";
import { privateInstance } from "./axios";
import type { ApiResponse } from "./auth";

interface AddressDetail {
  address_id: number;
  street: string;
  floor: string;
  business_name: string;
  zip_code: string;
  latitude: number | null;
  longitude: number | null;
}

type GetAddressListResponse = ApiResponse<{ addressDetails: AddressDetail[] }>;

export const getAddressList = async (): Promise<GetAddressListResponse> => {
  const res = await privateInstance.get(endpoints.ADDRESSLIST);
  return res.data;
};

export const editAddress = async (
  payload: Omit<AddressDetail, "business_name" | "address_id">,
  addressID: number,
) => {
  const res = await privateInstance.post(
    endpoints.EDIT_ADDRESS.replace(":addressID", addressID.toString()),
    payload,
  );
  return res.data;
};

export const deleteAddress = async (addressID: number) => {
  const res = await privateInstance.delete(
    endpoints.DELETE_ADDRESS.replace(":addressID", addressID.toString()),
  );
  return res.data;
};
