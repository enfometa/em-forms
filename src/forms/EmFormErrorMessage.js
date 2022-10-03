import React, { useContext } from "react";
import { isNullOrUndefined } from "./common";
import { FormGroupContext } from "./common";
import EmFormError from "./EmFormError";

function EmFormErrorMessage({ emForms, formName, validatorName = null }) {
  const formGroupContext = useContext(FormGroupContext);
  let emFormsObj = null;
  if (!isNullOrUndefined(emForms)) {
    emFormsObj = emForms;
  } else {
    if (!isNullOrUndefined(formGroupContext)) {
      emFormsObj = formGroupContext.emForms;
    }
  }

  return (
    <EmFormError emForms={emFormsObj} formName={formName} validatorName={validatorName}>
      {emFormsObj.getFormErrorMessage(formName, validatorName)}
    </EmFormError>
  );
}

export default EmFormErrorMessage;
