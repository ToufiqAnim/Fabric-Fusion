"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import MobileMenu from "./Menu";
import NavIcons from "./NavICons";

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
  { label: "All products", href: "/list?cat=all-products" },
  { label: "HIGHLIGHTS", href: "/" },
  { label: "WOMEN", href: "/list?cat=women" },
  { label: "MEN", href: "/list?cat=men" },
  { label: "CHILDREN", href: "/list?cat=children" },
];

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHomePage) return; // No scroll effect on other pages

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const navbarStyles = isHomePage
    ? isScrolled || isHovered
      ? "bg-white shadow-md h-16"
      : "bg-transparent h-20"
    : "bg-white shadow-md h-14";

  const textColor =
    isHomePage && !isScrolled && !isHovered ? "text-white" : "text-black";
  const linkTextSize = isHomePage ? "text-sm" : "text-xs"; // Smaller font on other pages
  const brandSize = isHomePage ? "text-7xl" : "text-3xl";

  return (
    <>
      <div>
        {/* Mobile Menu */}
        <div
          className={`${
            isScrolled ? `bg-white ` : "bg-transparent"
          } bg-transparent fixed top-0 left-0 w-full z-50  flex items-center justify-between md:hidden px-6 py-4 transition-all duration-300`}
        >
          <Link
            href="/"
            className={`${
              isScrolled ? "text-black" : "text-white"
            } text-2xl font-normal tracking-wide`}
          >
            DOLCE & GABBANA
          </Link>
          <MobileMenu isScrolled={isScrolled} />
        </div>
        {/*    className={`pt-5 ${
              isHomePage && !isScrolled && !isHovered
                ? "bg-transparent"
                : "bg-white shadow-sm"
            }`} */}
        {/* Desktop Navbar */}
        <div
          className={`${
            isHomePage
              ? "fixed top-0 left-0 w-full z-50 transition-all duration-300"
              : ""
          } hidden md:block  pt-5 ${
            isHomePage && !isScrolled && !isHovered
              ? "bg-transparent"
              : "bg-white shadow-sm"
          }`}
          onMouseEnter={isHomePage ? () => setIsHovered(true) : undefined}
          onMouseLeave={isHomePage ? () => setIsHovered(false) : undefined}
        >
          <div>
            {/* Utility Links */}

            <div className="container mx-auto px-4 flex justify-between items-center h-10 ">
              <nav className="flex space-x-6">
                {utilityLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`${linkTextSize} font-medium transition-colors duration-300 ${textColor} hover:text-gray-600`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center space-x-6">
                <button className="transition-colors duration-300">
                  <Search
                    size={18}
                    className={`transition-colors duration-300 ${textColor}`}
                  />
                </button>

                <NavIcons isHovered={isHovered} isScrolled={isScrolled} />
              </div>
            </div>

            {/* Brand Name */}
            <div className="py-4 text-center">
              <Link href="/" className="inline-block">
                <h1
                  className={`font-bold tracking-wider transition-all duration-500 ease-in-out transform ${
                    isScrolled ? "text-2xl scale-90" : "text-7xl scale-100"
                  } ${textColor}`}
                >
                  DOLCE & GABBANA
                </h1>
              </Link>
            </div>

            {/* Main Navigation */}
            <nav>
              <div className="container mx-auto px-4">
                <ul className="flex justify-center space-x-6 py-3">
                  {mainNavLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={`${linkTextSize} font-medium transition-colors duration-300 ${textColor} hover:text-gray-600`}
                      >
                        {link.label}
                        <span className="block h-[2px] w-0 bg-black transition-all duration-300 hover:w-full"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
