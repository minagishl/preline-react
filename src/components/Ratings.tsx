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
import { Star } from "lucide-react";

const sizeClasses = {
  sm: "size-4",
  md: "size-5",
  lg: "size-8",
};

export type RatingsSize = keyof typeof sizeClasses;

const StarIcon: FC<HTMLAttributes<SVGElement>> = (props) => (
  <Star {...props} fill="currentColor" aria-hidden="true" />
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
        "inline-flex size-10 items-center justify-center rounded-full text-2xl hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
EmojiButton.displayName = "Ratings.EmojiButton";

// --- Main component ---
export interface RatingsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
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

const Ratings: RatingsComponent = ({
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
                !isFilled && hoverColorClass,
              ),
            })
          : null;

        return (
          <button
            key={i}
            type="button"
            className={classNames(
              "inline-flex items-center justify-center",
              !readOnly && "cursor-pointer",
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

export default Ratings;
