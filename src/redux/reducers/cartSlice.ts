type StoreState = {
  category_id: number;
  subcategory_id: number;
  id: number;
  title: string;
  image: string;
  label: string;
  actual_price: string;
  selling_price: string;
  discount_label: string;
  isFav: boolean;
  quantity: number;
}[];

type Action = { type: string; payload: any };

const initialState: [] = [];

export default function cartReducer(
  state = initialState,
  action: Action,
): StoreState {
  switch (action.type) {
    case "cart/setCart":
      return [...state, action.payload];

    case "cart/deleteItem":
      return [...action.payload];

    case "cart/setQuantity":
      return [...action.payload];

    default:
      return state;
  }
}
