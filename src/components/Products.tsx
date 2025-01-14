import Image from "next/image";
import Link from "next/link";
import React from "react";

const Products = () => {
  // We organize our product data in an array for better maintainability and scalability.
  // This makes it easier to add, remove, or modify products in the future.
  const products = [
    {
      id: 1,
      name: "Zara T-shirt",
      price: "$43",
      mainImage: "/pant.jpg",
      hoverImage: "/pant2.jpg",
      link: "/test",
    },
    {
      id: 2,
      name: "Zara T-shirt",
      price: "$43",
      mainImage: "/jacket2.jpg",
      hoverImage: "/jacket.jpg",
      link: "/test",
    },
    {
      id: 3,
      name: "Zara T-shirt",
      price: "$43",
      mainImage: "/silk.jpg",
      hoverImage: "/silk2.jpg",
      link: "/test",
    },
    {
      id: 4,
      name: "Zara T-shirt",
      price: "$43",
      mainImage: "/tshirt1.jpg",
      hoverImage: "/tshirt3.jpg",
      link: "/test",
    },
  ];

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {products.map((product) => (
        // Using Next.js Link component for client-side navigation
        <Link
          key={product.id}
          href={product.link}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          {/* Product image container with relative positioning for absolute children */}
          <div className="relative w-full h-96">
            {/* Featured tag positioned at the top of the image */}
            <div className="absolute top-4 left-0 bg-white px-3 py-1 text-xs z-20">
              FEATURED
            </div>

            {/* Main product image that fades out on hover */}
            <Image
              src={product.mainImage}
              alt={product.name}
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500"
              priority={product.id === 1} // Load first image immediately
            />

            {/* Secondary image that appears when main image fades */}
            <Image
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              fill
              sizes="25vw"
              className="object-cover rounded-md"
            />
          </div>

          {/* Product information section */}
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">{product.price}</span>
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
