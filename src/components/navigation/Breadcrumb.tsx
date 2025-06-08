import React from 'react';
import { BaseProps } from '../../types';

const Breadcrumb: React.FC<BaseProps> = ({ children, className }) => (
	<nav className={`flex ${className || ''}`} aria-label='Breadcrumb'>
		<ol className='inline-flex items-center space-x-1 md:space-x-3'>{children}</ol>
	</nav>
);

export default Breadcrumb;
