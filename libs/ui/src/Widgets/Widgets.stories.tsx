// Generated with util/create-component.js
import { StoryFn } from '@storybook/react';
import React from 'react';
import { ArrowUp, Check } from 'react-feather';
import {
	Activity,
	MetricRange,
	ProgressBar,
	StatusWidget,
	CircularLoader,
} from './Widgets';

export default {
	title: 'Widgets',
};

const Template: StoryFn<typeof StatusWidget> = (args) => (
	<StatusWidget {...args} />
);

const ProgressBarWidgetTemplate: StoryFn<typeof ProgressBar> = (args) => (
	<ProgressBar {...args} />
);

const MetricRangeWidgetTemplate: StoryFn<typeof MetricRange> = (args) => (
	<MetricRange {...args} />
);

const ActivityWidgetTemplate: StoryFn<typeof Activity> = (args) => (
	<Activity {...args} />
);

const CircularLoaderTemplate: StoryFn<typeof CircularLoader> = (args) => (
	<CircularLoader {...args} />
);

export const status = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
status.args = {
	type: 'Active',
	icon: <ArrowUp />,
	showIcon: true,
};

export const progressBar = ProgressBarWidgetTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
progressBar.args = {
	progress: 40,
	color: '#04C1DE',
	showText: false,
};

export const metric = MetricRangeWidgetTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
metric.args = {
	value: 30,
};

export const activity = ActivityWidgetTemplate.bind({});
activity.args = {
	user: 'Joergen Hoffman',
	activity: 'opened Exportfinanzierung mit HandEX',
	date: 'Oct 28th 2019 at 12:00 PM GMT +1',
	status: true,
};

export const circularLoader = CircularLoaderTemplate.bind({});
circularLoader.args = {
	color: 'red',
	bgColor: 'white',
};
