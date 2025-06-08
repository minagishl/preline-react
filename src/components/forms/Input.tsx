import React from "react";
import { InputProps } from "../../types";

const Input: React.FC<InputProps> = (props) => (
  <input className="border border-gray-300 rounded-lg px-3 py-2" {...props} />
);

export default Input;
