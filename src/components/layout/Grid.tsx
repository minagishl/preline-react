import React from "react";
import { BaseProps } from "../../types";

const Grid: React.FC<BaseProps> = ({ children, className }) => (
  <div className={`grid ${className || ""}`}>{children}</div>
);

export default Grid;
