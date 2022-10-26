function required(form, emForms, param) {
  let isValid = true;
  let initValue = null;
  if (param !== undefined) {
    initValue = param.initialValue;
  }
  if (form.value === undefined || form.value === "" || form.value === null || (initValue !== null && initValue === form.value)) {
    isValid = false;
  }
  return isValid;
}

function maxLength(form, emForms, param) {
  let isValid = true;
  if (form.value !== undefined && form.value !== "" && form.value !== null) {
    if (param !== undefined && param.maxLength !== undefined) {
      let valLength = form.value.toString().length;
      if (valLength > param.maxLength) {
        isValid = false;
      }
    }
  }
  return isValid;
}

function minLength(form, emForms, param) {
  let isValid = true;
  if (form.value !== undefined && form.value !== "" && form.value !== null) {
    if (param !== undefined && param.minLength !== undefined) {
      let valLength = form.value.toString().length;
      if (valLength < param.minLength) {
        isValid = false;
      }
    }
  }
  return isValid;
}

function pattern(form, emForms, param) {
  let isValid = true;
  if (form.value !== undefined && form.value !== "" && form.value !== null) {
    if (param !== undefined && param.pattern !== undefined) {
      let regEx = new RegExp(param.pattern, "g");
      let value = form.value.toString();
      isValid = regEx.test(value);
    }
  }
  return isValid;
}

function email(form, emForms, param) {
  let isValid = true;
  isValid = pattern(form, emForms, { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ });
  return isValid;
}

function requiredIf(form, emForms, param) {
  let isValid = true;
  let formCompareValue = emForms.getFormValue(param.name);

  if (formCompareValue == param.value) {
    if (form.value === undefined || form.value === null || form.value === "") {
      isValid = false;
    }
  }
  return isValid;
}

function compare(form, emForms, param) {
  let isValid = true;
  let formCompareValue = emForms.getFormValue(param.compareTo);
  if (!(form.value === undefined || form.value === null || form.value === "")) {
    if (formCompareValue !== form.value) {
      isValid = false;
    }
  }
  return isValid;
}

function range(form, emForms, param) {
  let isValid = true;
  if (form.value !== undefined && form.value !== "" && form.value !== null) {
    if (param !== undefined && param.min !== undefined && param.max !== undefined) {
      let formValue = parseFloat(form.value);
      if (formValue > param.max || formValue < param.min) {
        isValid = false;
      }
    }
  }
  return isValid;
}

function number(form, emForms, param) {
  let isValid = true;
  if (form.value !== undefined && form.value !== "" && form.value !== null) {
    isValid = !isNaN(form.value);
  }
  return isValid;
}

export { required, maxLength, minLength, pattern, email, requiredIf, compare, range, number };
