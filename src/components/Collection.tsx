import React, { useState } from "react";
import { cn } from "../utils/classNames";

export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({
  className,
  ...props
}) => (
  <div className="w-full overflow-x-auto">
    <table
      className={cn("w-full border-collapse text-left text-sm", className)}
      {...props}
    />
  </div>
);

export const Marquee: React.FC<{
  children: React.ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}> = ({ children, reverse, pauseOnHover = true, className }) => (
  <div className={cn("overflow-hidden", className)}>
    <div
      className={cn(
        "flex w-max min-w-full gap-8 py-2 motion-safe:animate-[preline-marquee_20s_linear_infinite]",
        reverse && "[animation-direction:reverse]",
        pauseOnHover && "hover:[animation-play-state:paused]",
      )}
    >
      {children}
      {children}
    </div>
  </div>
);

export const Carousel: React.FC<{
  children: React.ReactNode[];
  className?: string;
}> = ({ children, className }) => {
  const [index, setIndex] = useState(0);
  const total = children.length;
  if (!total) return null;
  return (
    <section
      className={cn("relative", className)}
      aria-roledescription="carousel"
    >
      <div className="overflow-hidden">
        {children.map((child, childIndex) => (
          <div key={childIndex} hidden={childIndex !== index}>
            {child}
          </div>
        ))}
      </div>
      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => setIndex((index - 1 + total) % total)}
            className="bg-layer/90 absolute top-1/2 left-2 -translate-y-1/2 rounded-full p-2 shadow"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => setIndex((index + 1) % total)}
            className="bg-layer/90 absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 shadow"
          >
            ›
          </button>
        </>
      )}
    </section>
  );
};
