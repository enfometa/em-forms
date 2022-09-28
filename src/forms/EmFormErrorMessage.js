import React, { useContext } from "react";
import { isNullOrUndefined } from "./EmForms";
import { EmFormError, FormGroupContext } from "./EmForms";

function EmFormErrorMessage(props) {
  const { emForms, formName, validatorName } = props;

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
