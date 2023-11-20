// Generated with util/create-component.js
import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import PoolCard from "./PoolCard";

export default {
  title: "Pool Card",
  component: PoolCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as Meta<typeof PoolCard>;

const Template: StoryFn<typeof PoolCard> = (args) => <PoolCard {...args} />;

export const Card = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Card.args = {
  poolTitle: "Cauris Fund #4: Africa Innovation Pool",
  poolDescription: "Fintech loans in Africa",
  unitranche: true,
  poolStat: "12.15% USDC",
  poolSubstat: "19.28% with GFI",
  poolState: "yield",
};
