"use client";

import Image from "next/image";
import React, { useState } from "react";

interface ImageType {
  id: number;
  url: string;
}

const images: ImageType[] = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/17867705/pexels-photo-17867705/free-photo-of-crowd-of-hikers-on-the-mountain-ridge-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/21812160/pexels-photo-21812160/free-photo-of-puerta-colonial-color-rojo-de-guanajuato-mexico.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  },
];

const ProductImages = () => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="relative h-[500px]">
        <Image
          src={images[index].url}
          alt={`Product image ${index + 1}`}
          fill
          className="rounded-md object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex gap-4 mt-8">
        {images.map((image, i) => (
          <div
            key={image.id}
            /*    className={`relative h-32 flex-1 cursor-pointer ${
              i === index ? "ring-2 ring-blue-500" : ""
            }`} */
            className={`w-1/4 h-32 relative gap-4 mt-8 cursor-pointer ${
              i === index ? "ring-1 ring-blue-500 rounded-md" : ""
            }`}
            onClick={() => setIndex(i)}
          >
            <Image
              src={image.url}
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
