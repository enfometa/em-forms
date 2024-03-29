import { isNullOrUndefined, isObject, mergeDeep } from "./common";

class EmFormsCore {
  formsConfig = null;
  model = null;
  allowAddProps = false;
  constructor(formsObject) {
    this.formsConfig = formsObject;
    this.setDefaultTouch();
    this.setDefaultValues();

    //default config
    this.config = {
      errorMessageTriggers: { touch: true, change: true },
    };

    //override config provided by user call
    if (!isNullOrUndefined(formsObject.config)) {
      mergeDeep(this.config, formsObject.config);
    }
  }

  // setFormsObj(formsObj) {
  //   this.formsConfig = formsObj;
  // }

  addForm = (formObject) => {
    this.formsConfig.forms.push(formObject);
  };

  isValid = () => {
    let isValid = true;
    this.formsConfig.forms.map((form) => {
      if (form.validators != undefined) {
        form.validators.map((validator) => {
          if (this.isValidFormValidator(form.name, validator.name) === false) {
            isValid = false;
          }
        });
      }
    });
    return isValid;
  };

  isValidForm = (formName) => {
    let isValid = true;
    let form = this.getForm(formName);
    if (form !== undefined) {
      form.validators.map((validator) => {
        if (this.isValidFormValidator(form.name, validator.name) === false) {
          isValid = false;
        }
      });
    }
    return isValid;
  };

  isValidFormValidator = (formName, validatorName) => {
    let isValid = true;
    let form = this.getForm(formName);
    if (form !== undefined && form.validators !== undefined) {
      let validators = form.validators.filter((v) => v.name === validatorName);
      if (validators.length > 0) {
        let validator = validators[0];
        if (validator.func(form, this, validator.param) == false) {
          isValid = false;
        }
      }
    }
    return isValid;
  };

  getFormErrors = (formName) => {
    let errors = [];
    let form = this.getForm(formName);
    if (form !== undefined && form.validators !== undefined) {
      form.validators.map((validator) => {
        let isValid = this.isValidFormValidator(form.name, validator.name);
        if (!isValid) {
          errors.push({ validatorName: validator.name, message: validator.message });
        }
      });
    }
    return errors;
  };

  getFormError = (formName, validatorName) => {
    let errors = this.getFormErrors(formName);
    let validatorErrors = errors.filter((err) => err.validatorName == validatorName);
    return validatorErrors.length > 0 ? validatorErrors[0] : null;
  };

  getFormErrorMessage = (formName, validatorName) => {
    let errorMsg = null;
    if (!isNullOrUndefined(validatorName)) {
      let formError = this.getFormError(formName, validatorName);
      errorMsg = formError !== null ? formError.message : null;
    } else {
      let formErrors = this.getFormErrors(formName);
      let errorMsgs = [];
      formErrors.map((formError) => {
        errorMsgs.push(formError.message);
      });

      errorMsg = errorMsgs.join(", ");
    }

    return errorMsg;
  };

  getErrors = () => {
    let errors = [];
    this.formsConfig.forms.map((form) => {
      let formErrors = this.getFormErrors(form.name);
      errors = [...errors, ...formErrors];
    });
    return errors;
  };

  validate = () => {
    let isValid = this.isValid();
    this.setTouch(true);
    this.updateParentState();

    return isValid;
  };

  validateForm = (formName) => {
    let isValid = this.isValid(formName);
    this.setTouch(formName, true);
    this.updateParentState();

    return isValid;
  };

  resetForm = (formName, value) => {
    if (!isNullOrUndefined(value)) {
      this.setFormValue(formName, value);
    } else {
      const form = this.getForm(formName);
      let restValue = null;
      if (!isNullOrUndefined(form.defaultValue)) {
        restValue = form.defaultValue;
        this.setFormValue(formName, restValue);
      }
    }

    this.setFormTouch(formName, false);
  };

  reset = (values, excludeForms) => {
    this.formsConfig.forms.map((form) => {
      let formName = form.name;

      let exclude = false;
      if (excludeForms != undefined && excludeForms != null) {
        if (excludeForms.filter((ev) => ev.name == formName).length > 0) {
          exclude = true;
        }
      }
      if (!exclude) {
        form.value = null;
        if (form.defaultValue !== undefined) {
          form.value = form.defaultValue;
          this.triggerOnChange(form);
        }
        if (values != undefined && values != null) {
          let forms = values.filter((f) => f.name == formName);
          if (forms.length > 0) {
            form.value = forms[0].value;
            this.triggerOnChange(form);
          }
        }
      }
    });
    this.setTouch(false);
    this.updateParentState();
  };

  setFormValue = (formName, value) => {
    if (value != null) {
      let strVal = value.toString();
      if (strVal.includes("/Date(")) {
        value = new Date(parseInt(strVal.substr(6)));
      }
    }
    let form = this.getForm(formName);
    if (form !== undefined && form !== null) {
      if (form.valueConverter) {
        value = form.valueConverter(value)
      }
      form.value = value;
      this.triggerOnChange(form);
      if (!isNullOrUndefined(this.model)) {
        if (this.model[formName] !== undefined || this.allowAddProps) {
          this.model[formName] = value;
        }
      }
    }
    this.updateParentState();
  };

  setFormTouch = (formName, touched) => {
    let form = this.getForm(formName);
    if (form !== null) {
      form.touched = touched;
    }
    this.updateParentState();
  };

  setTouch = (touched) => {
    this.formsConfig.forms.map((form) => {
      this.setFormTouch(form.name, touched);
    });
  };

  getForm = (formName) => {
    let form = this.formsConfig.forms.filter((form) => form.name === formName);
    if (form.length > 0) {
      return form[0];
    } else {
      return null;
    }
  };

  getFormValue = (formName) => {
    let form = this.getForm(formName);
    if (form !== null && form.value !== undefined) {
      return form.value;
    }
  };

  getFormTouch = (formName) => {
    let form = this.getForm(formName);
    let touched = false;
    if (form !== null && form.touched !== undefined) {
      touched = form.touched == true ? true : false;
    }

    return touched;
  };

  toModel = () => {
    let modelToUpdate = {};
    this.formsConfig.forms.map((item, index) => {
      modelToUpdate[item.name] = item.value;
    });
    return modelToUpdate;
  };

  toArray = () => {
    let arr = [];
    this.formsConfig.forms.map((item, index) => {
      let obj = {}
      obj[item.name] = item.value;
      arr.push(obj)
    });
    return arr;
  };

  setValuesFromModel = (obj, setDefaults = true) => {
    if (obj !== null) {
      Object.keys(obj).map((item) => {
        this.setFormValue(item, obj[item]);
      });
    }
    if (setDefaults) {
      this.setDefaultValues();
    }
  };

  setValues = (values, setDefaults = true) => {
    if (values !== undefined && values !== null) {
      values.map((value) => {
        this.setFormValue(value.name, value.value)
      });
    }
    if (setDefaults) {
      this.setDefaultValues();
    }
  };

  setModel = (model, allowAddProps = false) => {
    this.model = model;
    this.allowAddProps = allowAddProps;
    this.setValuesFromModel(model);
  };

  //private functions
  showError = (formName, validator) => {
    let isValid = false;
    if (!isNullOrUndefined(validator)) {
      isValid = this.isValidFormValidator(formName, validator);
    } else {
      isValid = this.isValidForm(formName);
    }

    let touched = this.getFormTouch(formName);

    let showMessage = false;
    if (!isValid && touched) {
      showMessage = true;
    }
    return showMessage;
  };

  setFormMode = (formName, mode) => {
    let form = this.getForm(formName);
    if (form !== undefined) {
      form.mode = mode;
    }
  };

  setMode = (mode) => {
    this.formsConfig.forms.map((form) => {
      form.mode = mode;
    });
    this.updateParentState();
  };

  updateParentState = () => {
    if (this.formsConfig.handleStateUpdate != undefined) {
      this.formsConfig.handleStateUpdate();
    }
  };

  getFormMode = (formName) => {
    let form = this.getForm(formName);
    if (form !== null && form.mode !== undefined) {
      return form.mode;
    }
  };

  setDefaultValues = () => {
    this.formsConfig.forms.map((form) => {
      form.touched = false;
      form.defaultValue = form.value;
    });
  };

  setDefaultTouch = () => {
    this.formsConfig.forms.map((form) => {
      form.touched = false;
    });
  };

  triggerOnChange = (form) => {
    if (!isNullOrUndefined(form.onChange)) {
      form.onChange(form.value);
    }
    if (!isNullOrUndefined(this.formsConfig.onChange)) {
      this.formsConfig.onChange(form.name, form.value);
    }
  };
}

export default EmFormsCore;
