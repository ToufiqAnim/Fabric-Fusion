import { WixClientServer } from "@/lib/WixClientServer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Categories = async () => {
  const wixClient = await WixClientServer();
  const categories = await wixClient.collections.queryCollections().find();

  return (
    <section className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="relative">
        {/* Custom scroll fade effect */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l z-10 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r z-10 pointer-events-none" />

        {/* Categories container */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 pb-4 min-w-max">
            {categories.items.map((item) => (
              <Link
                key={item._id}
                href={`/list?cat=${item.slug}`}
                className="group w-72 flex-shrink-0 transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={item.media?.mainMedia?.image?.url || "/category.jpg"}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-xl font-medium mb-2">{item.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicators */}
      <div className="mt-8 flex justify-center gap-2">
        <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-gray-400 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Categories;
