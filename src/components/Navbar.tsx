import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <div className="h-20 p-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* MOBILE MENU */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/">
          <h1 className="text-2xl tracking-wide">FabricFusion</h1>
        </Link>
        <Menu />
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-between h-ful gap-8">
        <div className="w-1/3 xl:w-1/2 flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <div className="text-2xl tracking-wide">FabricFusion</div>
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
