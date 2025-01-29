import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import NavIcons from "./NavICons";
import { useWixClient } from "@/hooks/useWixClient";

const Navbar = () => {
  return (
    <div className="h-20 p-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* MOBILE MENU */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/" className="flex items-center gap-3">
          <div className="text-3xl tracking-wide font-extrabold">Gucci CA</div>
        </Link>
        <Menu />
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-between h-ful gap-8">
        <div className="w-1/3 xl:w-1/2 flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-3xl tracking-wide font-extrabold">
              Gucci CA
            </div>
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link href="/">Homepage</Link>
            <Link href="/">Shop</Link>
            <Link href="/">Deals</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
