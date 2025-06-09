import React, {
  FC,
  HTMLAttributes,
  ReactElement,
  cloneElement,
  isValidElement,
  useState,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import classNames from "classnames";

const sizeClasses = {
  sm: "size-4",
  md: "size-5",
  lg: "size-8",
};

export type RatingsSize = keyof typeof sizeClasses;

const StarIcon: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
  </svg>
);

// --- Sub-component ---
interface EmojiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const EmojiButton: FC<EmojiButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={classNames(
        "size-10 inline-flex justify-center items-center text-2xl rounded-full hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
EmojiButton.displayName = "Ratings.EmojiButton";

// --- Main component ---
export interface RatingsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  total?: number;
  value?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: RatingsSize;
  icon?: ReactElement<{ className?: string }>;
  color?: string;
  emptyColor?: string;
  hoverColor?: string;
}

type RatingsComponent = FC<RatingsProps> & {
  EmojiButton: FC<EmojiButtonProps>;
};

export const Ratings: RatingsComponent = ({
  total = 5,
  value = 0,
  onChange,
  readOnly = false,
  size = "md",
  icon = <StarIcon />,
  className,
  color = "text-yellow-400 dark:text-yellow-500",
  emptyColor = "text-gray-300 dark:text-neutral-600",
  hoverColor = "hover:text-yellow-400 dark:hover:text-yellow-500",
  ...props
}) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  const handleMouseEnter = (index: number) => {
    if (!readOnly) {
      setHoverValue(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(undefined);
    }
  };

  const handleClick = (index: number) => {
    if (!readOnly && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className={classNames("flex items-center", className)} {...props}>
      {Array.from({ length: total }, (_, i) => {
        const ratingValue = hoverValue === undefined ? value : hoverValue;
        const isFilled = i < ratingValue;

        const iconColorClass = isFilled ? color : emptyColor;
        const hoverColorClass = readOnly ? "" : hoverColor;

        const typedIcon = icon as React.ReactElement<{ className?: string }>;

        const finalIcon = isValidElement(typedIcon)
          ? cloneElement(typedIcon, {
              className: classNames(
                typedIcon.props.className,
                "shrink-0",
                sizeClasses[size],
                iconColorClass,
                !isFilled && hoverColorClass
              ),
            })
          : null;

        return (
          <button
            key={i}
            type="button"
            className={classNames(
              "inline-flex justify-center items-center",
              !readOnly && "cursor-pointer"
            )}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(i)}
            disabled={readOnly}
            aria-label={`Rate ${i + 1} out of ${total}`}
          >
            {finalIcon}
          </button>
        );
      })}
    </div>
  );
};

Ratings.EmojiButton = EmojiButton;
