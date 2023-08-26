import { action } from '@storybook/addon-actions';
import React from 'react';
import { DeleteModal, SelectNetworkModal } from './Modals';

export default {
	title: 'Modals',
};

const Template = (args) => <DeleteModal {...args}></DeleteModal>;
const SelectNetworkTemplate = (args) => (
	<SelectNetworkModal {...args}></SelectNetworkModal>
);

export const deleteModal = Template.bind({});
export const selectNetworkModal = SelectNetworkTemplate.bind({});

deleteModal.args = {
	title: 'delete entity name',
	isOpen: true,
	onClose: action('onClose'),
};

selectNetworkModal.args = {
	isOpen: true,
	onClose: action('onClose'),
	children: <p>hi</p>,
};
