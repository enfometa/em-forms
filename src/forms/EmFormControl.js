import React, { useContext } from "react";
import { getMostSpecificConfig, isNullOrUndefined } from "./common";
import { FormGroupContext } from "./common";
import { emFormsGlobalConfig } from "./common";
import EmFormsGlobalConfig from "./EmFormsGlobalConfig";

function EmFormControl({ children, emForms, formName, bindValue, valuePropName, onChangePropName, valueFunc, valueConverter }) {
  const [childElement] = Array.isArray(children) ? children : [children];

  const finalConfig = {};

  const setEmFormValuesFromRegister = () => {
    //find controls in the element register
    const registerConfig = getMostSpecificConfig(childElement, emFormsGlobalConfig.emForm.controlsRegister);

    if (!isNullOrUndefined(registerConfig)) {
      EmFormsGlobalConfig.setConfigValues(
        finalConfig,
        registerConfig.bindValue,
        registerConfig.valuePropName,
        registerConfig.onChangePropName,
        registerConfig.valueFunc,
        registerConfig.valueConverter
      );
    }
  };

  //first assgin props values, priority = 1
  EmFormsGlobalConfig.setConfigValues(finalConfig, bindValue, valuePropName, onChangePropName, valueFunc, valueConverter);

  //search controls in from register, priority = 2
  setEmFormValuesFromRegister();

  //assign from global config values, , priority = 3
  EmFormsGlobalConfig.setConfigValues(
    finalConfig,
    emFormsGlobalConfig.emForm.bindValue,
    emFormsGlobalConfig.emForm.valuePropName,
    emFormsGlobalConfig.emForm.onChangePropName,
    emFormsGlobalConfig.emForm.valueFunc,
    emFormsGlobalConfig.emForm.valueConverter
  );

  const formGroupContext = useContext(FormGroupContext);
  let emFormsObj = null;
  if (!isNullOrUndefined(emForms)) {
    emFormsObj = emForms;
  } else {
    if (!isNullOrUndefined(formGroupContext)) {
      emFormsObj = formGroupContext.emForms;
    }
  }

  const onChangeCallback = (e) => {
    if (!isNullOrUndefined(emFormsObj)) {
      emFormsObj.setFormValue(formName, finalConfig.valueFunc(e));
      if (emFormsObj.config.errorMessageTriggers.change) {
        emFormsObj.setFormTouch(formName, true);
      }
    }
    if (!isNullOrUndefined(childElement.props.onChange)) {
      childElement.props.onChange(e);
    }
  };

  const onBlurCallback = (e) => {
    if (!isNullOrUndefined(emFormsObj)) {
      if (emFormsObj.config.errorMessageTriggers.touch) {
        emFormsObj.setFormTouch(formName, true);
      }
    }
    if (!isNullOrUndefined(childElement.props.onBlur)) {
      childElement.props.onBlur(e);
    }
  };

  let newProps = { [finalConfig.onChangePropName]: (e) => onChangeCallback(e), onBlur: (e) => onBlurCallback(e) };
  if (finalConfig.bindValue) {
    let val = emFormsObj.getFormValue(formName);
    if(finalConfig.valueConverter){
      val = finalConfig.valueConverter(val);
    }
    newProps[finalConfig.valuePropName] = val;
  }

  return <React.Fragment>{!isNullOrUndefined(childElement) && React.cloneElement(childElement, newProps)}</React.Fragment>;
}

export default EmFormControl;
