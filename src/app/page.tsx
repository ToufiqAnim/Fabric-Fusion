import Banner from "@/components/Banner";
import Products from "@/components/Products";

const HomePage = () => {
  return (
    <div className="">
      <Banner />
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 mt-24">
        <h1 className="text-2xl">Featured Products</h1>
        <Products />
      </div>
    </div>
  );
};

export default HomePage;
