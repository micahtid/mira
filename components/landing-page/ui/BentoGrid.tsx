import { ReactNode, memo } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

// Optimized animation variants
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 } // Reduced from typical 0.5
  },
  hover: { 
    y: -5,
    transition: { duration: 0.2 } // Reduced from typical 0.3
  }
};

interface BentoCardProps {
  name: string;
  description?: string;
  header?: ReactNode;
  Icon?: any;
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
  <motion.div
    variants={cardVariants}
    initial="initial"
    whileInView="animate"
    whileHover="hover"
    viewport={{ once: true, margin: "-50px" }}
    className={twMerge(
      "group relative overflow-hidden rounded-xl border border-primary-100/10 bg-gradient-to-b p-6 hover:shadow-lg transition-shadow",
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
        <h3 className="font-poppins text-xl font-semibold text-gray-900">{name}</h3>
        {description && (
          <p className="mt-2 font-poppins text-gray-600 max-w-prose">{description}</p>
        )}
        {features && (
          <ul className="mt-4 space-y-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-gray-600">
                <FiArrowRight className="h-4 w-4 text-primary-500" />
                <span className="font-poppins text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
        >
          {cta}
          <FiArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  </motion.div>
));

BentoCard.displayName = "BentoCard";

// Memoized BentoGrid component
const BentoGrid = memo(({ items = [], className }: BentoGridProps) => (
  <div className={twMerge("grid grid-cols-1 gap-4 md:grid-cols-3", className)}>
    {items.map((item, i) => (
      <BentoCard key={item.name + i} {...item} />
    ))}
  </div>
));

BentoGrid.displayName = "BentoGrid";

export { BentoCard, BentoGrid };
export type { BentoCardProps, BentoGridProps };