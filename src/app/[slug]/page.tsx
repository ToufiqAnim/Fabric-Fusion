import Add from "@/components/Add";
import Customize from "@/components/Customize";
import ProductImages from "@/components/ProductImages";
import React from "react";

const SinglePage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 ">
      {/* IMAGE */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages />
      </div>

      {/* CONTENT */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">Product Name</h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis,
          exercitationem facere? Adipisci labore necessitatibus rerum
          consequuntur laboriosam voluptate suscipit quo et, incidunt dicta
          recusandae consectetur molestiae eveniet autem at est!
        </p>
        <div className="h-[2px] bg-gray-100" />
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">$49</h3>
          <h2 className="text-2xl font-medium">$39</h2>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <Customize />
        <Add />
        <div className="h-[2px] bg-gray-100" />
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            officia quibusdam mollitia ea sed similique veniam aperiam obcaecati
            quis explicabo culpa quam officiis tempora, aliquam facere error
            optio consequatur possimus.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            officia quibusdam mollitia ea sed similique veniam aperiam obcaecati
            quis explicabo culpa quam officiis tempora, aliquam facere error
            optio consequatur possimus.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            officia quibusdam mollitia ea sed similique veniam aperiam obcaecati
            quis explicabo culpa quam officiis tempora, aliquam facere error
            optio consequatur possimus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
