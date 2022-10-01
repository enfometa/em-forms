import React from "react";
import { FormGroupContext } from "./EmForms";

function EmFormGroup({ children, emForms }) {
  return <FormGroupContext.Provider value={{ emForms: emForms }}>{children}</FormGroupContext.Provider>;
}

export default EmFormGroup;
