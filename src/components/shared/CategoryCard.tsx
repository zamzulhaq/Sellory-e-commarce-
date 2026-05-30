import Link from "next/link";
import {
  Laptop,
  Shirt,
  ShoppingBag,
  Coffee,
  Heart,
  Home,
  Dumbbell,
  Gamepad2,
  Car,
  BookOpen,
  Baby,
  PawPrint,
} from "lucide-react";
import type { Category } from "@/types";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Laptop,
  Shirt,
  ShoppingBag,
  Coffee,
  Heart,
  Home,
  Dumbbell,
  Gamepad2,
  Car,
  BookOpen,
  Baby,
  PawPrint,
};

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || ShoppingBag;

  return (
    <Link
      href={`/kategori/${category.slug}`}
      className="flex flex-col items-center gap-2.5 group"
    >
      <div
        className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${category.color} flex items-center justify-center 
          group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}
      >
        <Icon size={22} />
      </div>
      <span className="text-xs md:text-sm text-gray-700 font-medium text-center leading-tight">
        {category.name}
      </span>
    </Link>
  );
}
