// Generated with util/create-component.js
import React from 'react';
import { X } from 'react-feather';
import { selectNetworkProps, modalsProps } from './Modals.types';

import './Modals.scss';

export const DeleteModal = ({
	title,
	isOpen,
	onClose,
	onDelete,
}: modalsProps) => {
	return (
		<div className={'tariala--modal ' + (isOpen && 'active')}>
			{isOpen && (
				<div className='modal--menue'>
					<div
						onClick={() => {
							onClose();
						}}
						className='close'
					>
						<X color='#64748b'></X>
					</div>
					<div className='header'>
						{title}
						<span className='subtitle'>
							Are you sure you want to delete this item? This is
							an irreversible action and the data associated with
							this entity will be deleted.
						</span>
					</div>
					<div className='form'>
						<button
							className='button'
							onClick={() => {
								onDelete();
							}}
						>
							Delete
						</button>
						<button
							className='button--edit'
							onClick={() => {
								onClose();
							}}
						>
							Keep it for now
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export const SelectNetworkModal = ({
	isOpen,
	onClose,
	children,
}: selectNetworkProps) => {
	return (
		<div className={'tariala--modal ' + (isOpen && 'active')}>
			{isOpen && (
				<div className='modal--menue'>
					<div
						onClick={() => {
							onClose();
						}}
						className='close'
					>
						<X color='#64748b'></X>
					</div>
					<div className='header'>Select Network</div>
					<div className='form'>{children}</div>
				</div>
			)}
		</div>
	);
};
