import SearchInput from "@/components/atoms/input/SearchInput";
import HeaderLink from "@/components/atoms/text/HeaderLink";
import Header from "@/components/molecules/layout/Header";
import Footer from "@/components/molecules/layout/Footer";
import NProductList from "@/components/molecules/cardList/NProductList";
import CategoryList from "@/components/molecules/cardList/CategoryList";
import Swipper from "@/components/atoms/swipper/Swipper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { getUserDetails } from "@/api/auth";
import { getStore } from "@/api/store";
import { setProducts, setStoreData } from "@/redux/actions/storeAction";

const Home = () => {
  const storeData = useAppSelector((state) => state.storeData);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const store = storeData.data;
  const allProducts = storeData.allProducts;

  async function fetchStoreData() {
    setLoading(true);
    try {
      const response = await getStore();
      dispatch(setStoreData(response.data));
      dispatch(setProducts(response.data));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await getUserDetails();
      } catch (_) {}
    })();
    !store.length && fetchStoreData();
  }, []);

  return (
    <div className="flex h-full w-full flex-col text-xl">
      <Header />
      <main className="custom-scroll no-scrollbar no-scrollbar grow pb-20">
        <section className="px-3.5 py-5">
          <SearchInput />
        </section>

        <Swipper />

        {/* <section className="my-5 px-3.5">
          <HeaderLink
            heading="Popular Products"
            subHeading="View all"
            to="/AllPopularProduct"
          />
          {loading ? (
            <p className="flex h-44 items-center justify-center text-center font-medium">
              <span className="loader w-2xl"></span>
            </p>
          ) : allProducts.length === 0 ? (
            <p className="flex h-44 items-center justify-center text-center font-medium">
              <span className="w-2xl">No Products</span>
            </p>
          ) : (
            <PopularProductList data={allProducts} variant="limited" />
          )}
        </section> */}

        <section className="px-3.5 py-5">
          <HeaderLink
            heading="Shop by Category"
            subHeading="View all"
            to="/categoryFilter"
          />
          {loading ? (
            <p className="flex h-44 items-center justify-center text-center font-medium">
              <span className="loader w-2xl"></span>
            </p>
          ) : (
            <CategoryList data={store} />
          )}
        </section>

        <section className="my-5 px-3.5">
          <HeaderLink
            heading="Products For you"
            subHeading="View all"
            to="/AllPopularProduct"
          />
          {loading ? (
            <p className="flex h-44 items-center justify-center text-center font-medium">
              <span className="loader w-2xl"></span>
            </p>
          ) : allProducts.length === 0 ? (
            <p className="flex h-44 items-center justify-center text-center font-medium">
              <span className="w-2xl">No Products</span>
            </p>
          ) : (
            <NProductList data={allProducts} />
          )}
        </section>
      </main>
      <Footer activePage={1} />
    </div>
  );
};

export default Home;
