import { WixClientServer } from "@/lib/WixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PRODUCT_PER_PAGE = 8;
const Products = async ({
  categoryId,
  limit,
  searchParmas,
}: {
  categoryId: string;
  limit?: number;
  searchParmas?: any;
}) => {
  const WixClient = await WixClientServer();

  const res = await WixClient.products
    .queryProducts()
    .eq("collectionIds", categoryId)
    .limit(limit || PRODUCT_PER_PAGE)
    .find();

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {res.items.map((product: products.Product) => (
        <Link
          key={product._id}
          href={"/" + product.slug}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          <div className="relative w-full h-96">
            <div className="absolute top-4 left-0 bg-white px-3 py-1 text-xs z-20">
              FEATURED
            </div>

            {/* Main product image that fades out on hover */}
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500"
            />

            {product.media?.items && (
              <Image
                src={product.media?.items[1]?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            )}
          </div>

          {/* Product information section */}
          <div className="flex justify-between">
            <span className="font-medium text-sm text-gray-600">
              {product.name}
            </span>
            <span className="font-semibold">${product.price?.price}</span>
          </div>

          {/* Add to Cart button with hover effects */}
          <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-red-500 hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
    </div>
  );
};

export default Products;
