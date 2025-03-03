import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={twMerge("grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>
      {children}
    </div>
  );
};

interface BentoCardProps {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
  children?: ReactNode;
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  children
}: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={twMerge(
        "group relative rounded-2xl bg-white border border-primary-100/20 p-8 shadow-lg hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      {background}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary-500" />
          </div>
          <div>
            <h3 className="font-poppins text-xl font-semibold text-black">{name}</h3>
            <p className="font-poppins text-sm text-black/70">{description}</p>
          </div>
        </div>
        {children}
        <Link
          href={href}
          className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors duration-200"
        >
          {cta}
          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
};

export { BentoCard, BentoGrid }; 