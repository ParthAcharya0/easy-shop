type StoreState = {
  data: any;
  allProducts: {
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
  }[];
};

type Action = { type: string; payload: any };

const initialState = {
  data: [],
  allProducts: [],
};

export default function storeReducer(
  state = initialState,
  action: Action,
): StoreState {
  switch (action.type) {
    case "store/setData":
      return { ...state, data: action.payload };

    case "store/setProducts":
      return { ...state, allProducts: action.payload };

    case "store/setFavorite":
      return { ...state, allProducts: action.payload };

    default:
      return state;
  }
}
