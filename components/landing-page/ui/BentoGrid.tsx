import { ReactNode, memo } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface BentoCardProps {
  name: string;
  description?: string;
  header?: ReactNode;
  Icon?: React.ElementType;
  features?: string[];
  href?: string;
  cta?: string;
  className?: string;
  background?: string;
  color?: string;
}

interface BentoGridProps {
  items?: BentoCardProps[];
  className?: string;
}

// Memoized BentoCard component for better performance
const BentoCard = memo(({ 
  header, 
  Icon, 
  name, 
  description, 
  features, 
  href, 
  cta = "Learn More",
  className,
  background,
  color
}: BentoCardProps) => (
  <div
    className={twMerge(
      "group relative overflow-hidden rounded-xl border border-primary-100/80 bg-gradient-to-b p-6 transition-all duration-300",
      background ? `bg-gradient-to-b ${background}` : "",
      className
    )}
  >
    {header}
    <div className="relative z-10 flex h-full flex-col justify-between gap-4">
      <div>
        {Icon && (
          <div className={twMerge("mb-4 inline-flex rounded-lg p-3", color || "bg-primary-500")}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        )}
        <h3 className="default-subheading text-gray-900">{name}</h3>
        {description && (
          <p className="mt-2 default-text text-gray-600 max-w-prose">{description}</p>
        )}
        {features && (
          <ul className="mt-4 space-y-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-4 text-gray-600">
                <FaArrowRight size={16} className="text-primary-400" />
                <span className="default-label">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="default-label font-medium text-primary-500 hover:text-primary-600 transition-colors"
        >
          {cta}
        </Link>
      )}
    </div>
  </div>
));

BentoCard.displayName = "BentoCard";

// Memoized BentoGrid component
const BentoGrid = memo(({ items = [], className }: BentoGridProps) => (
  <div className={twMerge("grid grid-cols-3 gap-4 max-lg:flex max-lg:flex-col", className)}>
    {items.map((item, i) => (
      <BentoCard key={item.name + i} {...item} />
    ))}
  </div>
));

BentoGrid.displayName = "BentoGrid";

export { BentoCard, BentoGrid };
export type { BentoCardProps, BentoGridProps };