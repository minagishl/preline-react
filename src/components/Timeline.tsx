import React from "react";
import { cn } from "../utils/classNames";

type TimelineProps = React.HTMLAttributes<HTMLDivElement>;

const TimelineRoot = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {children}
      </div>
    );
  }
);
TimelineRoot.displayName = "Timeline";

type TimelineHeadingProps = React.HTMLAttributes<HTMLDivElement>;

const TimelineHeading = React.forwardRef<HTMLDivElement, TimelineHeadingProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("ps-2 my-2 first:mt-0", className)}
        {...props}
      >
        <h3 className="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
          {children}
        </h3>
      </div>
    );
  }
);
TimelineHeading.displayName = "Timeline.Heading";

type TimelineItemProps = React.HTMLAttributes<HTMLDivElement>;

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex gap-x-3", className)} {...props}>
        {children}
      </div>
    );
  }
);
TimelineItem.displayName = "Timeline.Item";

type TimelineIconProps = React.HTMLAttributes<HTMLDivElement>;

const TimelineIcon = React.forwardRef<HTMLDivElement, TimelineIconProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700",
          className
        )}
        {...props}
      >
        <div className="relative z-10 size-7 flex justify-center items-center">
          {children || (
            <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600" />
          )}
        </div>
      </div>
    );
  }
);
TimelineIcon.displayName = "Timeline.Icon";

type TimelineBodyProps = React.HTMLAttributes<HTMLDivElement>;

const TimelineBody = React.forwardRef<HTMLDivElement, TimelineBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("grow pt-0.5 pb-8", className)} {...props}>
        {children}
      </div>
    );
  }
);
TimelineBody.displayName = "Timeline.Body";

type TimelineTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const TimelineTitle = React.forwardRef<HTMLHeadingElement, TimelineTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          "flex gap-x-1.5 font-semibold text-gray-800 dark:text-white",
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  }
);
TimelineTitle.displayName = "Timeline.Title";

type TimelineTextProps = React.HTMLAttributes<HTMLParagraphElement>;

const TimelineText = React.forwardRef<HTMLParagraphElement, TimelineTextProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "mt-1 text-sm text-gray-600 dark:text-neutral-400",
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
TimelineText.displayName = "Timeline.Text";

type TimelineCollapseProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
};

const TimelineCollapse = React.forwardRef<
  HTMLDivElement,
  TimelineCollapseProps
>(({ children, id, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      id={id}
      className={cn(
        "hs-collapse hidden w-full overflow-hidden transition-[height] duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TimelineCollapse.displayName = "Timeline.Collapse";

type TimelineCollapseButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    target: string;
  };

const TimelineCollapseButton = React.forwardRef<
  HTMLButtonElement,
  TimelineCollapseButtonProps
>(({ children, className, target, ...props }, ref) => {
  return (
    <div className="ps-2 -ms-px flex gap-x-3">
      <button
        ref={ref}
        type="button"
        className={cn(
          "hs-collapse-toggle hs-collapse-open:hidden text-start inline-flex items-center gap-x-1 text-sm text-blue-600 font-medium decoration-2 hover:underline focus:outline-hidden focus:underline dark:text-blue-500",
          className
        )}
        data-hs-collapse={target}
        {...props}
      >
        <svg
          className="shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
        {children}
      </button>
    </div>
  );
});
TimelineCollapseButton.displayName = "Timeline.CollapseButton";

export const Timeline = Object.assign(TimelineRoot, {
  Heading: TimelineHeading,
  Item: TimelineItem,
  Icon: TimelineIcon,
  Body: TimelineBody,
  Title: TimelineTitle,
  Text: TimelineText,
  Collapse: TimelineCollapse,
  CollapseButton: TimelineCollapseButton,
});

export default Timeline;
