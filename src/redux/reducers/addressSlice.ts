export type SelectedAddress = {
  address_id: number;
  street: string;
  floor: string;
  business_name: null;
  zip_code: string;
  latitude: null;
  longitude: null;
};

type AddressState = {
  selectedAddress: SelectedAddress | {};
  addressLists: SelectedAddress[] | [];
};

type Action = { type: string; payload: any };

const initialState = {
  selectedAddress: {},
  addressLists: [],
};

export default function addressReducer(
  state = initialState,
  action: Action,
): AddressState {
  switch (action.type) {
    case "address/setAddress":
      return { ...state, selectedAddress: { ...action.payload } };

    case "address/setList":
      return { ...state, addressLists: [...action.payload] };

    default:
      return state;
  }
}
