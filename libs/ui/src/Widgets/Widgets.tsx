// Generated with util/create-component.js
import React, { useEffect, useState } from 'react';
import { X, Check } from 'react-feather';
import {
	StatusWidgetProps,
	ProgressBarWidgetProps,
	MetricProps,
	ActivityProps,
	CircularLoaderProps,
} from './Widgets.types';

import './Widgets.scss';

const colorHash = {
	active: {
		bgcolor: '#D1FAE5',
		color: '#059669',
	},
	change: {
		bgcolor: '#FEE2E2',
		color: '#EF4444',
	},
	review: {
		bgcolor: '#FEF3C7',
		color: '#F59E0B',
	},
	completed: {
		bgcolor: '#10B981',
		color: '#ECFDF5',
	},
};

export function StatusWidget({ type, icon, showIcon }: StatusWidgetProps) {
	const [style, setStyle] = useState({});
	const mode = showIcon ? 'status--with--icon' : 'status--without--icon';
	useEffect(() => {
		switch (type.toLowerCase()) {
			case 'up':
				setStyle({
					opacity: 1,
					backgroundColor: colorHash.active.bgcolor,
					color: colorHash.active.color,
				});
				break;
			case 'down':
				setStyle({
					opacity: 1,
					backgroundColor: colorHash.change.bgcolor,
					color: colorHash.change.color,
				});
				break;
			case 'change' || 'not sent':
				setStyle({
					opacity: 1,
					backgroundColor: colorHash.change.bgcolor,
					color: colorHash.change.color,
				});
				break;
			case 'review':
				setStyle({
					opacity: 1,
					backgroundColor: colorHash.review.bgcolor,
					color: colorHash.review.color,
				});
				break;
			case 'completed':
				setStyle({
					opacity: 1,
					backgroundColor: colorHash.completed.bgcolor,
					color: colorHash.completed.color,
				});
				break;

			default:
				setStyle({
					opacity: 1,
					backgroundColor: colorHash.active.bgcolor,
					color: colorHash.active.color,
				});
				break;
		}
	}, [type]);

	return (
		<div className={['status', mode].join(' ')} style={style}>
			{showIcon ? icon : ''}
			{type}
		</div>
	);
}

export function ProgressBar({
	progress,
	color,
	showText,
}: ProgressBarWidgetProps) {
	const [style, setStyle] = useState({});

	useEffect(() => {
		const newStyle = {
			opacity: 1,
			width: `${progress}%`,
			backgroundColor: color,
		};

		setStyle(newStyle);
	}, [progress, color]);

	return (
		<div>
			{showText ? <span>Overall Progress: {progress}%</span> : ''}
			<div className='progressbar'>
				<div className='progressbar--done' style={style}></div>
			</div>
		</div>
	);
}
export const CircularLoader = ({
	color,
	size,
	bgColor,
}: CircularLoaderProps) => {
	const loaderStyle = {
		borderColor: bgColor, // Use the borderColor property
		borderTopWidth: '4px',
		borderRightWidth: '4px',
		borderBottomWidth: '4px',
		borderLeftWidth: '4px',
		borderStyle: 'solid',
		borderTopColor: color,
	};
	return (
		<div className='circular--loader--container'>
			<div className='circular--loader' style={loaderStyle}></div>
		</div>
	);
};
export const MetricRange = ({ value }: MetricProps) => {
	return (
		<>
			<div className='slider--container'>
				<input
					className='slider'
					type='range'
					min='1'
					max='100'
					value={value}
				/>
			</div>
		</>
	);
};

export const Activity = ({ user, activity, status, date }: ActivityProps) => {
	return (
		<div className='activity--box'>
			<div className='status--box'>
				{status ? <Check></Check> : <X></X>}
			</div>
			<div className='detail--box'>
				<div className='content'>
					<span>{user}</span>
					<span>{activity}</span>
				</div>
				<span>{date}</span>
			</div>
		</div>
	);
};
