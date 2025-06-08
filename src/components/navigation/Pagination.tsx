import React from "react";
import { BaseProps } from "../../types";

const Pagination: React.FC<BaseProps> = ({ children, className }) => (
  <nav className={`flex items-center justify-center ${className || ""}`}>
    {children}
  </nav>
);

export default Pagination;
