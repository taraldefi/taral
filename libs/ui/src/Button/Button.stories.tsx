import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Plus } from "react-feather";
import Button from "./Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  backgroundColor: "#1ab98b",
  label: "New Application",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "New Entity",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  label: "Add",
  icon: <Plus size="15px"></Plus>,
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};
