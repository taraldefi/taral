import React from "react";
import { render, within } from "@testing-library/react";

import Button from "./Button";
import { ButtonProps } from "./Button.types";

it("should render a button with primary class", () => {
  render(<Button label={"New Application"} />);
});
