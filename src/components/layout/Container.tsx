import React from 'react';
import { BaseProps } from '../../types';

const Container: React.FC<BaseProps> = ({ children, className }) => (
	<div className={`container mx-auto px-4 ${className || ''}`}>{children}</div>
);

export default Container;
