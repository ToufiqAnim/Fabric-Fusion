import Image from "next/image";
import Link from "next/link";
import React from "react";

const categories = [
  {
    id: 1,
    title: "Women's Collection",
    subtitle: "Elegance Redefined",
    href: "/list?category=women",
    // Selected a bright, fashion-forward image that captures modern women's style
    image: "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg",
    alt: "Woman in stylish outfit walking confidently",
    description: "Discover curated pieces that define modern femininity",
  },
  {
    id: 2,
    title: "Men's Style",
    subtitle: "Contemporary Classics",
    href: "/list?category=men",
    // Chose an image showing sophisticated men's fashion with good lighting
    image: "https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg",
    alt: "Man in elegant suit with modern styling",
    description: "Elevate your wardrobe with timeless pieces",
  },
  {
    id: 3,
    title: "Accessories",
    subtitle: "Statement Pieces",
    href: "/list?category=accessories",
    // Selected an artistically composed accessories shot
    image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg",
    alt: "Elegant watch and accessories arrangement",
    description: "Complete your look with premium accessories",
  },
  {
    id: 4,
    title: "Footwear",
    subtitle: "Step in Style",
    href: "/list?category=footwear",
    // Chose an image with aesthetic shoe composition
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
    alt: "Collection of trendy sneakers",
    description: "Find your perfect pair from our curated collection",
  },
  {
    id: 5,
    title: "Active Wear",
    subtitle: "Performance Meets Style",
    href: "/list?category=active",
    // Selected an dynamic activewear image with good energy
    image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg",
    alt: "Woman in stylish activewear during workout",
    description: "Elevate your workout with performance gear",
  },
  {
    id: 6,
    title: "Seasonal",
    subtitle: "Limited Edition",
    href: "/list?category=seasonal",
    // Chose a seasonal fashion image with warm tones
    image: "https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg",
    alt: "Seasonal fashion collection display",
    description: "Explore our latest seasonal collections",
  },
];

const Categories = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 max-w-[1920px] mx-auto">
      <div className="relative">
        {/* Custom scroll fade effect */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l z-10 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r z-10 pointer-events-none" />

        {/* Categories container */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 pb-4 min-w-max">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group w-72 flex-shrink-0 transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-xl font-medium mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-200">{category.subtitle}</p>
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
