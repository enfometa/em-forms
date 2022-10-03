import React from "react";
import EmFormsCore from "./EmFormsCore";
const FormGroupContext = React.createContext();

const emFormsGlobalConfig = {
  emFormValueFunc: (e) => {
    return e;
  },
  emFormBindValue: true,
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

export { isNullOrUndefined, mergeDeep, isObject, emFormsGlobalConfig, FormGroupContext };
