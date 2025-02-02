"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CartModal from "./CartModal";
import { WixClientServer } from "@/lib/WixClientServer";
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCartStore";
import { Bell, BellRing, ShoppingCart, User, UserCircle } from "lucide-react";

const NavIcons = ({
  isHovered,
  isScrolled,
}: {
  isHovered: boolean;
  isScrolled: boolean;
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isLoggedIn = false;
  const router = useRouter();
  const wixClient = useWixClient();
  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };
  const { cart, counter, getCart } = useCartStore();
  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);
  return (
    <div className="flex items-center gap-4 xl:gap-7 relative">
      {/* Profile Icon */}
      <UserCircle
        width={24}
        height={24}
        onClick={handleProfile}
        className={`cursor-pointer ${
          isHovered || isScrolled ? "text-black" : "text-white"
        }`}
      />
      {isProfileOpen && (
        <div className="absolute p-4  top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/">Profile</Link>
          <div className="mt-2 cursor-pointer">Logout</div>
        </div>
      )}

      {/* Notification Icon */}
      <BellRing
        width={24}
        height={24}
        className={`cursor-pointer ${
          isHovered || isScrolled ? "text-black" : "text-white"
        }`}
      />

      {/* Cart Icon */}
      <div className="relative cursor-pointer">
        <ShoppingCart
          className={`cursor-pointer ${
            isHovered || isScrolled ? "text-black" : "text-white"
          }`}
          width={22}
          height={22}
          onClick={() => setIsCartOpen((prev) => !prev)}
        />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-400 rounded-full text-white text-sm flex items-center justify-center">
          {counter}
        </div>
      </div>

      {/* Cart Modal */}
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
