export type Products = {
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

export function getProductsByCategory(id: number, products: Products) {
  const CategoryProduct = products.filter(
    (product) => product.category_id === id,
  );
  console.log("CategoryProduct", CategoryProduct);
}

export function getProductsBySubCategory(
  categoryID: number,
  subCategoryID: number,
  products: Products,
) {
  const CategoryProduct = products.filter(
    (product) =>
      product.category_id === categoryID &&
      product.subcategory_id === subCategoryID,
  );
  console.log("subCategoryProduct", CategoryProduct);
}
