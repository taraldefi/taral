import React from 'react';

// Generated with util/create-component.js
export interface modalsProps {
	title: string;
	isOpen: boolean;
	onClose: () => void;
	onDelete: () => void;
}
export interface IdleTimeOutModalProps {
	showModal: boolean;
	handleContinue: () => void;
	handleLogout: () => void;
}
export interface selectNetworkProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}
