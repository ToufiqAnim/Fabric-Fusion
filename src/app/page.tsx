import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import { WixClientContext } from "@/context/WixContext";
import { useWixClient } from "@/hooks/useWixClient";
import { WixClientServer } from "@/lib/WixClientServer";
import { Suspense, useContext, useEffect } from "react";

const HomePage = async () => {
  /*   const WixClient = useWixClient();
  useEffect(() => {
    const fetchedProducts = async () => {
      const res = await WixClient.products.queryProducts().find();
      console.log(res);
    };
    fetchedProducts();
  }, [WixClient]); */

  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <Banner />

      {/* Featured Products Section */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Our Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections, featuring the latest trends and
            timeless classics
          </p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Products categoryId={process.env.FEATURED_PRODUCTS_ID!} limit={4} />
        </Suspense>
      </section>

      {/* Categories Showcase Section */}
      <section className="mt-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections, featuring the latest trends and
            timeless classics
          </p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Categories />
        </Suspense>
      </section>

      {/* Trending Products Section */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-center">
            Trending Now
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover what&apos;s popular this season handpicked selections that
            define the latest fashion
          </p>
        </div>
        {/* <Products /> */}
      </section>
    </div>
  );
};

export default HomePage;
