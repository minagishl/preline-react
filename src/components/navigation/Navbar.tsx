import React from 'react';
import { BaseProps } from '../../types';

const Navbar: React.FC<BaseProps> = ({ children, className }) => (
	<nav className={`bg-white border-b border-gray-200 px-4 py-3 ${className || ''}`}>{children}</nav>
);

export default Navbar;
