import Image from "next/image";
import Link from "next/link";
import React from "react";

const Products = () => {
  return (
    <div className="mt-12 flex fap-x-8 gap-y-16 justify-between flex-wrap">
      <Link href="/test" className="w-full flex flex-col gap-4">
        <div className="relative w-full h-80">
          <Image
            src="/tshirt.jpg"
            alt="T-shirt"
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-all duration-500"
          />
          <Image src="/tshirt2.jpg" alt="T-shirt" fill sizes="25vw" />
        </div>
      </Link>
    </div>
  );
};

export default Products;
