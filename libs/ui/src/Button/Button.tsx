// Generated with util/create-component.js
import React from 'react';
import { ButtonProps } from './Button.types';
import './Button.scss';

const Button: React.FC<ButtonProps> = ({
	primary = false,
	size = 'medium',
	backgroundColor,
	label,
	icon,
	...props
}) => {
	const mode = primary ? 'button--primary' : 'button--secondary';
	return (
		<button
			type='button'
			className={['button--container', `button--${size}`, mode].join(' ')}
			style={{ backgroundColor }}
			{...props}
		>
			{label}
			{icon}
		</button>
	);
};

export default Button;
