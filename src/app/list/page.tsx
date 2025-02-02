import Filter from "@/components/Filter";
import Products from "@/components/Products";
import { WixClientServer } from "@/lib/WixClientServer";
import Image from "next/image";
import React, { Suspense } from "react";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  const wixClient = await WixClientServer();

  const cat = await wixClient.collections.getCollectionBySlug(
    searchParams?.cat || "all-products"
  );
  console.log(cat);
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[50px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className=" bg-red-500  text-white px-5 py-3 text-sm w-max">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>
      <Filter />
      <h1 className="mt-10 text-xl font-semibold">
        {cat.collection?.name} for You!!
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Products
          categoryId={
            cat.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
};

export default ListPage;
