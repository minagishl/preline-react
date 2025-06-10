import {
  createContext,
  useContext,
  FC,
  HTMLAttributes,
  LiHTMLAttributes,
  ReactNode,
} from "react";
import classNames from "classnames";

// --- Context ---
interface ListContextProps {
  variant: "disc" | "decimal" | "none" | "inline" | "checked";
}

const ListContext = createContext<ListContextProps | null>(null);

const useListContext = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("List.* component must be used within a List component");
  }
  return context;
};

// --- Sub-components ---

// --- Icon ---
type IconColor =
  | "dark"
  | "gray"
  | "green"
  | "blue"
  | "red"
  | "yellow"
  | "light";
type IconVariant = "simple" | "circled" | "filled";

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  color?: IconColor;
  variant?: IconVariant;
}

const CheckIcon: FC = () => (
  <svg
    className="shrink-0 size-3.5"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const Icon: FC<IconProps> = ({
  color = "blue",
  variant = "simple",
  className,
}) => {
  const iconColorClasses: Record<IconColor, string> = {
    dark: "text-gray-800 dark:text-white",
    gray: "text-gray-500 dark:text-neutral-500",
    green: "text-teal-500",
    blue: "text-blue-600 dark:text-blue-500",
    red: "text-red-500",
    yellow: "text-yellow-500",
    light: "text-white",
  };

  const simpleClasses = classNames(
    "shrink-0 size-4 mt-0.5",
    iconColorClasses[color]
  );

  const circledClasses: Record<IconColor, string> = {
    dark: "bg-gray-50 text-gray-600 dark:bg-neutral-700 dark:text-neutral-200",
    gray: "bg-gray-50 text-gray-500 dark:bg-neutral-700 dark:text-neutral-400",
    green: "bg-teal-50 text-teal-500 dark:bg-teal-800/30 dark:text-teal-500",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500",
    red: "bg-red-50 text-red-500 dark:bg-red-800/30 dark:text-red-500",
    yellow:
      "bg-yellow-50 text-yellow-500 dark:bg-yellow-800/30 dark:text-yellow-500",
    light: "bg-white/10 text-white",
  };

  const filledClasses: Record<IconColor, string> = {
    dark: "bg-gray-800 text-gray-200 dark:bg-neutral-200 dark:text-neutral-800",
    gray: "bg-gray-500 text-white",
    green: "bg-teal-500 text-white",
    blue: "bg-blue-600 text-white dark:bg-blue-500",
    red: "bg-red-500 text-white",
    yellow: "bg-yellow-500 text-white",
    light: "bg-white text-gray-800",
  };

  if (variant === "simple") {
    return (
      <span className={simpleClasses}>
        <CheckIcon />
      </span>
    );
  }

  return (
    <span
      className={classNames(
        "size-5 flex justify-center items-center rounded-full",
        variant === "circled" ? circledClasses[color] : filledClasses[color],
        className
      )}
    >
      <CheckIcon />
    </span>
  );
};
Icon.displayName = "List.Icon";

// --- Item ---
interface ItemProps extends LiHTMLAttributes<HTMLLIElement> {}

const Item: FC<ItemProps> = ({ children, className, ...props }) => {
  const { variant } = useListContext();

  const itemClasses = classNames(
    {
      // inline
      "inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-neutral-400 dark:before:bg-neutral-600":
        variant === "inline",
      // checked
      "flex gap-x-3": variant === "checked",
    },
    className
  );
  return (
    <li className={itemClasses} {...props}>
      {children}
    </li>
  );
};
Item.displayName = "List.Item";

// --- List ---
export interface ListProps
  extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  variant?: "disc" | "decimal" | "none" | "inline" | "checked";
  as?: "ul" | "ol";
  markerColor?: boolean;
  children: ReactNode;
}

type ListComponent = FC<ListProps> & {
  Item: FC<ItemProps>;
  Icon: FC<IconProps>;
};

const List: ListComponent = ({
  children,
  className,
  variant = "none",
  as = "ul",
  markerColor,
  ...props
}) => {
  const listClasses = classNames(
    "text-gray-800 dark:text-white",
    {
      "list-disc list-inside": variant === "disc",
      "list-decimal list-inside": variant === "decimal",
      "list-none list-inside": variant === "none",
      "text-sm text-gray-600": variant === "inline",
      "space-y-3 text-sm": variant === "checked",
      "marker:text-blue-600": markerColor,
    },
    className
  );

  const Component = as;

  return (
    <ListContext.Provider value={{ variant }}>
      <Component className={listClasses} {...props}>
        {children}
      </Component>
    </ListContext.Provider>
  );
};

List.Item = Item;
List.Icon = Icon;

export default List;
