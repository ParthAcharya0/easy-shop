import { SelectedAddress } from "../reducers/addressSlice";

export function setCurrentAddress(address: SelectedAddress) {
  return { type: "address/setAddress", payload: address };
}

export function resetCurrentAddress() {
  return { type: "address/setAddress", payload: {} };
}

export function setAddressList(addressList: SelectedAddress[]) {
  return { type: "address/setList", payload: addressList };
}
