import { isNullEmptyOrWhiteSpace } from "./common";

function required(formControl, emForms, param) {
  let isValid = true;
  let acceptsWhiteSpace = false;
  let initValue = null;
  if (param !== undefined) {
    initValue = param.initialValue;
    if(param.acceptsWhiteSpace){
      acceptsWhiteSpace = param.acceptsWhiteSpace;
    }
  }

  if (isNullEmptyOrWhiteSpace(formControl.value, !acceptsWhiteSpace) || (initValue !== null && initValue === formControl.value)) {
    isValid = false;
  }
  return isValid;
}

function maxLength(formControl, emForms, param) {
  let isValid = true;
  if (formControl.value !== undefined && formControl.value !== "" && formControl.value !== null) {
    if (param !== undefined && param.maxLength !== undefined) {
      let valLength = formControl.value.toString().length;
      if (valLength > param.maxLength) {
        isValid = false;
      }
    }
  }
  return isValid;
}

function minLength(formControl, emForms, param) {
  let isValid = true;
  if (formControl.value !== undefined && formControl.value !== "" && formControl.value !== null) {
    if (param !== undefined && param.minLength !== undefined) {
      let valLength = formControl.value.toString().length;
      if (valLength < param.minLength) {
        isValid = false;
      }
    }
  }
  return isValid;
}

function pattern(formControl, emForms, param) {
  let isValid = true;
  if (formControl.value !== undefined && formControl.value !== "" && formControl.value !== null) {
    if (param !== undefined && param.pattern !== undefined) {
      let regEx = new RegExp(param.pattern, "g");
      let value = formControl.value.toString();
      isValid = regEx.test(value);
    }
  }
  return isValid;
}

function email(formControl, emForms, param) {
  let isValid = true;
  isValid = pattern(formControl, emForms, { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ });
  return isValid;
}

function requiredIf(formControl, emForms, param) {
  let isValid = true;
  let acceptsWhiteSpace = false;
  let formCompareValue = emForms.getFormValue(param.name);

  if (param !== undefined) {
    if(param.acceptsWhiteSpace){
      acceptsWhiteSpace = param.acceptsWhiteSpace;
    }
  }

  if (formCompareValue == param.value) {
    if (isNullEmptyOrWhiteSpace(formControl.value, !acceptsWhiteSpace)) {
      isValid = false;
    }
  }
  return isValid;
}

function compare(formControl, emForms, param) {
  let isValid = true;
  let formCompareValue = emForms.getFormValue(param.compareTo);
  if (!(formControl.value === undefined || formControl.value === null || formControl.value === "")) {
    if (formCompareValue !== formControl.value) {
      isValid = false;
    }
  }
  return isValid;
}

function range(formControl, emForms, param) {
  let isValid = true;
  if (formControl.value !== undefined && formControl.value !== "" && formControl.value !== null) {
    if (param !== undefined && param.min !== undefined && param.max !== undefined) {
      let formValue = parseFloat(formControl.value);
      if (formValue > param.max || formValue < param.min) {
        isValid = false;
      }
    }
  }
  return isValid;
}

function number(formControl, emForms, param) {
  let isValid = true;
  if (formControl.value !== undefined && formControl.value !== "" && formControl.value !== null) {
    isValid = !isNaN(formControl.value);
  }
  return isValid;
}

export { required, maxLength, minLength, pattern, email, requiredIf, compare, range, number };
