import React from "react";
import { SelectData } from "./Data";
interface selectProps {
  category: string;
}
function Select({ category }: selectProps) {
  console.log(SelectData[category as keyof typeof SelectData]);
  return (
    // <></>
    <select>
      {SelectData[category as keyof typeof SelectData].map(
        (item: any, index: any) => {
          return (
            <>
              <option value="" disabled selected hidden>
                Select industry...
              </option>
              <option key={index}>{}</option>
            </>
          );
        }
      )}
    </select>
  );
}

export default Select;
