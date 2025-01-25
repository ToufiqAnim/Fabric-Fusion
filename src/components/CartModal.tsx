"use client";
import Image from "next/image";
import React, { useState } from "react";

const CartModal = () => {
  const hasCartItems = true;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!hasCartItems ? (
        <div>Cart is empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-4">
            <div className="flex gap-8">
              {/* Ensure correct height/width settings */}
              <Image
                src="/tshirt.jpg"
                alt="T-shirt"
                width={72}
                height={96}
                className="object-cover rounded-md"
                style={{ height: "96px", width: "72px" }} // Fallback for debugging
              />
              <div className="flex flex-col w-full justify-between">
                <div>
                  <div className="flex justify-between gap-8 items-center">
                    <h3 className="font-semibold">Zara T-shirt</h3>
                    <p className="p-1 bg-gray-50 rounded-sm">$35</p>
                  </div>
                  <div className="text-gray-500 text-sm">Available</div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty: 2</span>
                  <span className="text-red-500 cursor-pointer">Remove</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between font-semibold">
                <span>Subtotal</span>
                <span>$35</span>
              </div>
              <p className="text-gray-500 text-sm mt-2 mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="flex justify-between text-sm">
                <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                  View Cart
                </button>
                <button className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
