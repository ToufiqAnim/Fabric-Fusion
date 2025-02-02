"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const utilityLinks = [
  { label: "Fashion", href: "/fashion" },
  { label: "Beauty", href: "/beauty" },
  { label: "Casa", href: "/casa" },
  { label: "Food & Beverage", href: "/food-beverage" },
  { label: "World", href: "/world" },
  { label: "Alta Moda", href: "/alta-moda" },
  { label: "Sustainability", href: "/sustainability" },
];

const mainNavLinks = [
  { label: "All Products", href: "/list?cat=all-products" },
  { label: "HIGHLIGHTS", href: "/" },
  { label: "WOMEN", href: "/list?cat=womenmen" },
  { label: "MEN", href: "/list?cat=men" },
  { label: "CHILDREN", href: "/list?cat=children" },
  { label: "BAGS", href: "/" },
];

const MobileMenu = ({ isScrolled }: { isScrolled: boolean }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Menu Icon */}
      <button
        onClick={() => setOpen(true)}
        className={`${
          isScrolled ? "text-black" : "text-white"
        } focus:outline-none`}
      >
        <Menu size={28} />
      </button>

      {/* Fullscreen Menu Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black text-white transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-5 right-5 text-white"
        >
          <X size={32} />
        </button>

        {/* Menu Content */}
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl font-medium">
          {/* Main Nav Links */}
          {mainNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="hover:text-gray-300 transition"
            >
              {link.label}
            </Link>
          ))}

          <div className="h-[1px] w-3/4 bg-gray-600"></div>

          {/* Utility Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {utilityLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-gray-300 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
