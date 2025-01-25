"use client";

import Image from "next/image";
import React, { useState } from "react";

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="relative h-[500px]">
        <Image
          src={items[index].image?.url}
          alt={`Product image ${index + 1}`}
          fill
          className="rounded-md object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex gap-4 mt-8">
        {items.map((item: any, i: number) => (
          <div
            key={item._id}
            /*    className={`relative h-32 flex-1 cursor-pointer ${
              i === index ? "ring-2 ring-blue-500" : ""
            }`} */
            className={`w-1/4 h-32 relative gap-4 mt-8 cursor-pointer ${
              i === index ? "ring-1 ring-blue-500 rounded-md" : ""
            }`}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.image.url}
              alt={`Thumbnail ${i + 1}`}
              fill
              sizes="(max-width: 768px) 25vw, 20vw"
              className="rounded-md object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
