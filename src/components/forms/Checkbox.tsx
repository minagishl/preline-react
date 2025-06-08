import React from 'react';
import { BaseProps } from '../../types';

const Checkbox: React.FC<BaseProps> = ({ className, ...props }) => (
	<input type='checkbox' className={`rounded ${className || ''}`} {...props} />
);

export default Checkbox;
