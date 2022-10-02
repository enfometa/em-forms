import React from "react";
import EmFormsCore from "./EmFormsCore";
import useEmForms from "./useEmForms";
import EmForm from "./EmForm";
import EmFormGroup from "./EmFormGroup";
import EmFormError from "./EmFormError";
import EmFormErrorMessage from "./EmFormErrorMessage";
import { required, maxLength, minLength, pattern, email, requiredIf, compare } from "./EmFormsValidators";

const FormGroupContext = React.createContext();

const emFormsGlobalConfig = {
  emFormValueFunc: (e) => {
    return e;
  },
  emFormbindValue: true,
  emFormValuePropName: "value",
  emFormonChangePropName: "onChange",
};

const isNullOrUndefined = (obj) => {
  return obj == null || obj == undefined;
};

const isObject = (item) => {
  return item && typeof item === "object" && !Array.isArray(item);
};

const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key])
          Object.assign(target, {
            [key]: {},
          });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key],
        });
      }
    }
  }

  return mergeDeep(target, ...sources);
};

export {
  EmFormsCore,
  useEmForms,
  required,
  maxLength,
  minLength,
  pattern,
  email,
  requiredIf,
  compare,
  EmForm,
  EmFormGroup,
  EmFormError,
  EmFormErrorMessage,
  FormGroupContext,
  isNullOrUndefined,
  mergeDeep,
  isObject,
  emFormsGlobalConfig,
};
