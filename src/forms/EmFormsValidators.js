function required(form, formsGroup, param) {
  let isValid = true;
  let initValue = null;
  if (param !== undefined) {
    initValue = param.initialValue;
  }
  if (
    form.value === undefined ||
    form.value === '' ||
    form.value === null ||
    (initValue !== null && initValue === form.value)
  ) {
    isValid = false;
  }
  return isValid;
}

function maxLength(form, formsGroup, param) {
  let isValid = true;
  if (form.value !== undefined && form.value !== '' && form.value !== null) {
    if (param !== undefined && param.maxLength !== undefined) {
      let valLength = form.value.toString().length;
      if (valLength > param.maxLength) {
        isValid = false;
      }
    }
  }
  return isValid;
}

function minLength(form, formsGroup, param) {
  let isValid = true;
  if (form.value !== undefined && form.value !== '' && form.value !== null) {
    if (param !== undefined && param.minLength !== undefined) {
      let valLength = form.value.toString().length;
      if (valLength < param.minLength) {
        isValid = false;
      }
    }
  }
  return isValid;
}

function pattern(form, formsGroup, param) {
  let isValid = true;
  if (form.value !== undefined && form.value !== '' && form.value !== null) {
    if (param !== undefined && param.pattern !== undefined) {
      let regEx = new RegExp(param.pattern, 'g');
      let value = form.value.toString();
      isValid = regEx.test(value);
    }
  }
  return isValid;
}

function email(form, formsGroup, param) {
  let isValid = true;
  isValid = pattern(form, formsGroup, {pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/});
  return isValid;
}

function requiredIf(form, formsGroup, param) {
  let isValid = true;
  let formCompareValue = formsGroup.getFormValue(param.name);

  if (formCompareValue == param.value) {
    if (form.value === undefined || form.value === null || form.value === '') {
      isValid = false;
    }
  }
  return isValid;
}

function compare(form, formsGroup, param) {
  let isValid = true;
  let formCompareValue = formsGroup.getFormValue(param.compareTo);
  if (!(form.value === undefined || form.value === null || form.value === '')) {
    if (formCompareValue !== form.value) {
      isValid = false;
    }
  }
  return isValid;
}

export {required, maxLength, minLength, pattern, email, requiredIf, compare};
