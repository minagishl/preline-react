import React from "react";
import { BaseProps } from "../../types";

const Sidebar: React.FC<BaseProps> = ({ children, className }) => (
  <aside className={`bg-white border-r border-gray-200 p-4 ${className || ""}`}>
    {children}
  </aside>
);

export default Sidebar;
