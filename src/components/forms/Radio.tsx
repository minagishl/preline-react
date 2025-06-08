import React from "react";
import { BaseProps } from "../../types";

const Radio: React.FC<BaseProps> = ({ className, ...props }) => (
  <input type="radio" className={`${className || ""}`} {...props} />
);

export default Radio;
