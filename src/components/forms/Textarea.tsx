import React from "react";
import { BaseProps } from "../../types";

const Textarea: React.FC<BaseProps> = ({ className, ...props }) => (
  <textarea
    className={`border border-gray-300 rounded-lg px-3 py-2 ${className || ""}`}
    {...props}
  />
);

export default Textarea;
