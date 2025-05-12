import SearchInput from "@/components/atoms/Input/SearchInput";
import HeaderLink from "@/components/atoms/text/HeaderLink";
import Header from "@/components/molecules/layout/Header";
import Footer from "@/components/molecules/layout/Footer";
import PopularProductList from "@/components/molecules/CardList/PopularProductList";
import NProductList from "@/components/molecules/CardList/NProductList";
import CategoryList from "@/components/molecules/CardList/CategoryList";
import Swipper from "@/components/atoms/swipper/Swipper";

const Home = () => {
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
          <PopularProductList />
        </section>

        <section className="px-3.5">
          <HeaderLink
            heading="Shop by Category"
            subHeading="View all"
            to="/categoryFilter"
          />
          <CategoryList />
        </section>

        <section className="my-5 px-3.5">
          <HeaderLink
            heading="Products For you"
            subHeading="View all"
            to="/not"
          />
          <NProductList />
        </section>
      </main>
      <Footer activePage={1}/>
    </div>
  );
};

export default Home;
