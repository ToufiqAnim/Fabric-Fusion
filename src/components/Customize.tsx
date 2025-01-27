"use client";

import { products } from "@wix/stores";
import React, { useEffect, useState, useMemo } from "react";
import Add from "./Add";

interface Variant {
  id: string;
  choices: { [key: string]: string };
  stock: {
    inStock: boolean;
    quantity: number;
  };
}

const CustomizeProducts = ({
  productId,
  productOptions,
  variants,
}: {
  productId: string;
  productOptions: products.ProductOption[];
  variants: Variant[];
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  const isVariantInStock = (choices: { [key: string]: string }): boolean => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;
      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity > 0
      );
    });
  };

  const handleOptionSelect = (optionType: string, choice: string): void => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  useEffect(() => {
    const variant = variants.find((v) =>
      Object.entries(selectedOptions).every(
        ([key, value]) => v.choices[key] === value
      )
    );
    setSelectedVariant(variant || null);
  }, [selectedOptions, variants]);
  console.log(selectedVariant?._id);
  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div className="flex flex-col gap-4" key={option.name}>
          <h4 className="font-medium">Choose a {option.name}</h4>
          <ul className="flex items-center gap-3">
            {option.choices?.map((choice) => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name]: choice.description,
              });

              const selected =
                selectedOptions[option.name] === choice.description;

              const clickHandler = disabled
                ? undefined
                : () => handleOptionSelect(option.name, choice.description);

              return option.name === "Color" ? (
                <li
                  role="button"
                  aria-disabled={disabled}
                  tabIndex={disabled ? -1 : 0}
                  className={`w-8 h-8 rounded-full ring-1 ring-gray-300 relative ${
                    !disabled ? "hover:ring-gray-500" : ""
                  }`}
                  style={{
                    backgroundColor: choice.value,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={clickHandler}
                  key={choice.description}
                >
                  {selected && (
                    <div className="absolute w-10 h-10 rounded-full ring-2 ring-red-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                  {disabled && (
                    <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </li>
              ) : (
                <li
                  role="button"
                  aria-disabled={disabled}
                  tabIndex={disabled ? -1 : 0}
                  className={`ring-1 rounded-md py-1 px-4 text-sm transition ${
                    disabled
                      ? "ring-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
                      : selected
                      ? "ring-red-500 text-white bg-red-500  hover:bg-red-600"
                      : "ring-gray-300 text-red-500 bg-white hover:bg-gray-100"
                  }`}
                  key={choice.description}
                  onClick={clickHandler}
                >
                  {choice.description}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <Add
        productId={productId}
        variantId={
          selectedVariant?._id || "00000000-0000-0000-0000-000000000000"
        }
        stockNumber={selectedVariant?.stock?.quantity || 0}
      />
    </div>
  );
};

export default CustomizeProducts;
