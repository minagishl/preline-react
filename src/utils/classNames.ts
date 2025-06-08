import classNames from "classnames";

/**
 * Utility function to combine class names
 * @param inputs - Class names to combine
 * @returns Combined class name string
 */
export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return classNames(...inputs);
}

/**
 * Get size classes for components
 */
export const getSizeClasses = (
  size: "xs" | "sm" | "md" | "lg" | "xl" = "md"
) => {
  const sizeMap = {
    xs: "text-xs px-2 py-1",
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
    xl: "text-lg px-6 py-3",
  };
  return sizeMap[size];
};

/**
 * Get color classes for components
 */
export const getColorClasses = (
  color: string = "primary",
  variant: string = "solid"
) => {
  const colorMap = {
    primary: {
      solid: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      outline:
        "border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
      ghost: "text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
      soft: "bg-blue-50 text-blue-600 hover:bg-blue-100 focus:ring-blue-500",
    },
    secondary: {
      solid: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
      outline:
        "border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500",
      ghost: "text-gray-600 hover:bg-gray-50 focus:ring-gray-500",
      soft: "bg-gray-50 text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
    },
    success: {
      solid: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      outline:
        "border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500",
      ghost: "text-green-600 hover:bg-green-50 focus:ring-green-500",
      soft: "bg-green-50 text-green-600 hover:bg-green-100 focus:ring-green-500",
    },
    danger: {
      solid: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      outline: "border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500",
      ghost: "text-red-600 hover:bg-red-50 focus:ring-red-500",
      soft: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
    },
    warning: {
      solid:
        "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
      outline:
        "border-yellow-600 text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500",
      ghost: "text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500",
      soft: "bg-yellow-50 text-yellow-600 hover:bg-yellow-100 focus:ring-yellow-500",
    },
    info: {
      solid: "bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500",
      outline:
        "border-cyan-600 text-cyan-600 hover:bg-cyan-50 focus:ring-cyan-500",
      ghost: "text-cyan-600 hover:bg-cyan-50 focus:ring-cyan-500",
      soft: "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 focus:ring-cyan-500",
    },
    light: {
      solid: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300",
      outline:
        "border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
      ghost: "text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
      soft: "bg-gray-50 text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
    },
    dark: {
      solid: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700",
      outline:
        "border-gray-800 text-gray-800 hover:bg-gray-50 focus:ring-gray-700",
      ghost: "text-gray-800 hover:bg-gray-50 focus:ring-gray-700",
      soft: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-700",
    },
  };

  return (
    colorMap[color as keyof typeof colorMap]?.[
      variant as keyof typeof colorMap.primary
    ] || colorMap.primary.solid
  );
};
