import React from 'react';
import { BaseProps } from '../../types';

const Switch: React.FC<BaseProps> = ({ className, ...props }) => (
	<input type='checkbox' className={`rounded-full ${className || ''}`} {...props} />
);

export default Switch;
