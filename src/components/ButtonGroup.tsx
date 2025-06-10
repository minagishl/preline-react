/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  Children,
  cloneElement,
  isValidElement,
  HTMLAttributes,
  FC,
  ButtonHTMLAttributes,
} from "react";
import classNames from "classnames";

type ButtonSize = "sm" | "md" | "lg";

interface GroupButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  children: React.ReactNode;
}

const Button: FC<GroupButtonProps> = ({
  className,
  size = "md",
  children,
  ...props
}) => {
  const sizeClasses: { [key in ButtonSize]: string } = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-4 text-sm",
    lg: "py-3 px-4 sm:p-5 text-sm",
  };

  const buttonClasses = classNames(
    "inline-flex items-center gap-x-2 -ms-px text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-2xs",
    "dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
    "hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none",
    sizeClasses[size],
    className,
  );

  return (
    <button type="button" className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

Button.displayName = "GroupButton";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonGroupComponent = FC<ButtonGroupProps> & {
  Button: FC<GroupButtonProps>;
};

const ButtonGroup: ButtonGroupComponent = ({
  vertical = false,
  className,
  children,
  ...props
}) => {
  const containerClasses = classNames(
    "inline-flex rounded-lg shadow-2xs",
    {
      "flex-col": vertical,
    },
    className,
  );

  const childrenWithProps = Children.map(children, (child) => {
    if (
      isValidElement(child) &&
      (child.type as any).displayName === "GroupButton"
    ) {
      const additionalClasses = vertical
        ? classNames("first:rounded-t-lg last:rounded-b-lg")
        : classNames("first:rounded-s-lg first:ms-0 last:rounded-e-lg");

      return cloneElement(child as React.ReactElement<any>, {
        className: classNames(child.props.className, additionalClasses),
      });
    }
    return child;
  });

  return (
    <div className={containerClasses} {...props}>
      {childrenWithProps}
    </div>
  );
};

ButtonGroup.Button = Button;

export default ButtonGroup;
