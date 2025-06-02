import { Product } from "@/components/atoms/card/ProductCard";

export function setStoreData(data: any) {
  return { type: "store/setData", payload: data };
}

export function setProducts(data: any) {
  const products = data
    .map((data: any) => {
      return data.subcategories.map((subcategory: any) => {
        return subcategory.products.map((product: any) => {
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
  allProducts: any,
  catID: number,
  subcID: number,
  productID: number,
  fav: boolean,
) {
  const data = [...allProducts].map((product: Product) => {
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
