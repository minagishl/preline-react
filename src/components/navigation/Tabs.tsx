import React from 'react';
import { BaseProps } from '../../types';

const Tabs: React.FC<BaseProps> = ({ children, className }) => (
	<div className={`border-b border-gray-200 ${className || ''}`}>
		<nav className='-mb-px flex space-x-8'>{children}</nav>
	</div>
);

export default Tabs;
