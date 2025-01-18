"use client";
interface Choice {
  description: string;
  value?: string;
}

interface ProductOption {
  name: string;
  choices: Choice[];
}

interface Stock {
  inStock: boolean;
  quantity: number;
}

interface Variant {
  _id: string;
  choices: {
    [key: string]: string;
  };
  stock: Stock;
}

interface SelectedOptions {
  [key: string]: string;
}

import React, { useEffect, useState } from "react";

const CustomizeProducts: React.FC = () => {
  // Mock data for product options
  const productOptions: ProductOption[] = [
    {
      name: "Color",
      choices: [
        { description: "Red", value: "#EF4444" },
        { description: "Blue", value: "#3B82F6" },
        { description: "Green", value: "#10B981" },
      ],
    },
    {
      name: "Size",
      choices: [
        { description: "Small" },
        { description: "Medium" },
        { description: "Large" },
      ],
    },
  ];

  // Mock data for variants
  const variants: Variant[] = [
    {
      _id: "1",
      choices: { Color: "Red", Size: "Small" },
      stock: { inStock: true, quantity: 5 },
    },
    {
      _id: "2",
      choices: { Color: "Red", Size: "Medium" },
      stock: { inStock: true, quantity: 3 },
    },
    {
      _id: "3",
      choices: { Color: "Blue", Size: "Small" },
      stock: { inStock: true, quantity: 7 },
    },
    {
      _id: "4",
      choices: { Color: "Blue", Size: "Medium" },
      stock: { inStock: false, quantity: 0 },
    },
    {
      _id: "5",
      choices: { Color: "Green", Size: "Large" },
      stock: { inStock: true, quantity: 2 },
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  useEffect(() => {
    const variant = variants.find((v) => {
      return Object.entries(selectedOptions).every(
        ([key, value]) => v.choices[key] === value
      );
    });
    setSelectedVariant(variant || null);
  }, [selectedOptions]);

  const handleOptionSelect = (optionType: string, choice: string): void => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const isVariantInStock = (choices: { [key: string]: string }): boolean => {
    return variants.some((variant) => {
      return (
        Object.entries(choices).every(
          ([key, value]) => variant.choices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity > 0
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div className="flex flex-col gap-4" key={option.name}>
          <h4 className="font-medium">Choose a {option.name}</h4>
          <ul className="flex items-center gap-3">
            {option.choices.map((choice) => {
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
                  className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative"
                  style={{
                    backgroundColor: choice.value,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={clickHandler}
                  key={choice.description}
                >
                  {selected && (
                    <div className="absolute w-10 h-10 rounded-full ring-2 ring-lama top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                  {disabled && (
                    <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </li>
              ) : (
                <li
                  className={`ring-1 ring-lama rounded-md py-1 px-4 text-sm ${
                    disabled
                      ? "ring-pink-200 text-white bg-pink-200 cursor-not-allowed"
                      : selected
                      ? "text-white bg-lama cursor-pointer"
                      : "text-lama bg-white cursor-pointer"
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

      {/* Add component */}
      <div className="flex flex-col gap-2">
        <button
          className={`w-full py-2 px-4 rounded-md ${
            selectedVariant && selectedVariant.stock.quantity > 0
              ? "bg-lama text-white hover:bg-lama/90"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedVariant || selectedVariant.stock.quantity === 0}
        >
          {!selectedVariant
            ? "Select options"
            : selectedVariant.stock.quantity === 0
            ? "Out of stock"
            : `Add to Cart (${selectedVariant.stock.quantity} available)`}
        </button>
      </div>
    </div>
  );
};

export default CustomizeProducts;
