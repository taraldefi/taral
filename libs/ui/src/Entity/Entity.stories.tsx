// Generated with util/create-component.js
import { StoryFn } from "@storybook/react";
import React from "react";
import { Entity } from "./Entity";

export default {
  title: "Entity",
};

const Template: StoryFn<typeof Entity> = (args) => <Entity {...args} />;

export const EntityCard = Template.bind({});
export const EntityCard2 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
const data = {
  id: 1,
  image: "/assets/logo.svg",
  title: "Lange Wiegand GmbH & Co. KG	",
  registrationNo: 1,
  products: 25,
  applications: 25,
};

const data2 = {
  id: 2,
  image: "/assets/logo.svg",
  title: "Verno	",
  registrationNo: 1,
  products: 25,
  applications: 25,
};

EntityCard.args = {
  entityData: data,
  modal: <div>Modal</div>,
};

EntityCard2.args = {
  entityData: data2,
  modal: <div>Modal</div>,
};
