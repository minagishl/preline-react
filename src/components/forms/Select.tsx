import React from "react";
import { BaseProps } from "../../types";

const Select: React.FC<BaseProps> = ({ children, className, ...props }) => (
  <select
    className={`border border-gray-300 rounded-lg px-3 py-2 ${className || ""}`}
    {...props}
  >
    {children}
  </select>
);

export default Select;
