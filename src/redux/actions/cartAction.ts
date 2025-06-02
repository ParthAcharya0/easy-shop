import { Cart } from "@/components/atoms/card/CartCard";
import { Product } from "@/components/atoms/card/ProductCard";

export function addCartItem(item: Product) {
  const data = { ...item, quantity: 1 };
  return { type: "cart/setCart", payload: data };
}

export function removeCartItem(item: Cart, cartData: Cart[]) {
  // console.log(data);
  const data = cartData.filter((data) => {
    return !(
      data.category_id === item.category_id &&
      data.subcategory_id === item.subcategory_id &&
      data.id === item.id
    );
  });

  return { type: "cart/deleteItem", payload: data };
}

export function setQuantity(cartItem: Cart[], item: Cart, value: number) {
  const data = cartItem.map((data) => {
    if (
      data.category_id === item.category_id &&
      data.subcategory_id === item.subcategory_id &&
      data.id === item.id
    ) {
      return { ...data, quantity: data.quantity + value };
    }
    return data;
  });
  return { type: "cart/setQuantity", payload: data };
}
