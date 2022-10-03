import React from "react";
import { FormGroupContext } from "./common";

function EmFormGroup({ children, emForms }) {
  return <FormGroupContext.Provider value={{ emForms: emForms }}>{children}</FormGroupContext.Provider>;
}

export default EmFormGroup;
