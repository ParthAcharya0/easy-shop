import type { Data } from "@/api/store";
import type { ProductList } from "../reducers/storeSlice";

export function setStoreData(data: Data[]) {
  return { type: "store/setData", payload: data };
}

export function setProducts(data: Data[]) {
  const products = data
    .map((data) => {
      return data.subcategories.map((subcategory) => {
        return subcategory.products.map((product) => {
          return {
            category_id: data.category_id,
            subcategory_id: subcategory.subcategory_id,
            isFav: false,
            ...product,
          };
        });
      });
    })
    .flat(5);
  return { type: "store/setProducts", payload: products };
}

export function setFavProduct(
  allProducts: ProductList,
  catID: number,
  subcID: number,
  productID: number,
  fav: boolean,
) {
  const data = [...allProducts].map((product) => {
    if (
      product.category_id === catID &&
      product.subcategory_id === subcID &&
      product.id === productID
    ) {
      return {
        ...product,
        isFav: !fav,
      };
    }

    return product;
  });
  return { type: "store/setFavorite", payload: data };
}
