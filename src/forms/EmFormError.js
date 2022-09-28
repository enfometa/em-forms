import React, { useContext } from "react";
import { isNullOrUndefined } from "./EmForms";
import { FormGroupContext } from "./EmForms";

function EmFormError(props) {
  const { emForms, formName, validatorName, children, ...rest } = props;

  const formGroupContext = useContext(FormGroupContext);
  let emFormsObj = null;
  if (!isNullOrUndefined(emForms)) {
    emFormsObj = emForms;
  } else {
    if (!isNullOrUndefined(formGroupContext)) {
      emFormsObj = formGroupContext.emForms;
    }
  }

  const showErrorMesssage = () => {
    let show = emFormsObj.showError(formName, validatorName);
    return show;
  };

  return showErrorMesssage() && <React.Fragment>{children}</React.Fragment>;
}

export default EmFormError;
