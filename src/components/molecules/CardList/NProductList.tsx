import ProductCard1 from "@/components/atoms/card/ProductCard1";

type Product = {
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
};

const NProductList = ({ data }: { data: any }) => {
  const products = data;
  return (
    <div className="custom-scroll no-scrollbar flex flex-nowrap gap-3 pt-2">
      {products.length >= 0 ? (
        products.map((data: Product, id:number) => <ProductCard1 key={id} data={data} />)
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
};

export default NProductList;
