import SearchInput from "@/components/atoms/Input/SearchInput";
import HeaderLink from "@/components/atoms/text/HeaderLink";
import Header from "@/components/molecules/layout/Header";
import Footer from "@/components/molecules/layout/Footer";
import PopularProductList from "@/components/molecules/CardList/PopularProductList";
import NProductList from "@/components/molecules/CardList/NProductList";
import CategoryList from "@/components/molecules/CardList/CategoryList";
import Swipper from "@/components/atoms/swipper/Swipper";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import getUserInfo from "@/api/getUser";
import getStore from "@/api/getStore";

const Home = () => {
  const storeData = useAppSelector((state) => state.storeData);
  const auth = useAppSelector((state) => state.auth);
  const store = storeData.data;
  const allProducts = storeData.allProducts;
  const access = auth.accessToken;

  useEffect(() => {
    if (access.length >= 2) {
      getUserInfo(access);
      store.length === 0 && getStore(access);
    }
  }, []);

  return (
    <div className="flex h-full w-full flex-col text-xl">
      <Header />
      <main className="custom-scroll no-scrollbar no-scrollbar grow">
        <section className="px-3.5 py-5">
          <SearchInput />
        </section>

        <Swipper />

        <section className="my-5 px-3.5">
          <HeaderLink
            heading="Popular Products"
            subHeading="View all"
            to="/AllPopularProduct"
          />
          {allProducts.length === 0 ? (
            <p className="flex h-44 items-center justify-center text-center font-medium">
              <span className="loader w-2xl"></span>
            </p>
          ) : (
            <PopularProductList data={allProducts} variant="limited" />
          )}
        </section>

        <section className="px-3.5">
          <HeaderLink
            heading="Shop by Category"
            subHeading="View all"
            to="/categoryFilter"
          />
          {store.length === 0 ? (
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
          {allProducts.length === 0 ? (
            <p className="flex h-44 items-center justify-center text-center font-medium">
              <span className="loader w-2xl"></span>
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
