import React from "react";
import EmFormsCore from "./EmFormsCore";
import EmFormsGlobalConfig from "./EmFormsGlobalConfig";

const FormGroupContext = React.createContext();

const emFormsGlobalConfig = new EmFormsGlobalConfig();

const isNullOrUndefined = (obj) => {
  return obj == null || obj == undefined;
};

const isNullEmptyOrWhiteSpace = (obj, trim) => {
  let isNullUndefinedWhiteSpace = isNullOrUndefined(obj);
  if(!isNullUndefinedWhiteSpace){
    let tempValue = obj.toString();
    if(trim){
      tempValue = tempValue.trim();
    }
    if(tempValue === ''){
      isNullUndefinedWhiteSpace = true;
    }
  }
  return isNullUndefinedWhiteSpace;
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

const getMostSpecificConfig = (control, controlsRegister) => {
  const eleName = typeof control.type == "string" ? control.type : control.type.name;
  const eleProps = control.props;
  const selectedConfigs = [];

  //find by control type and make control field as linear to sort easily by number of props
  controlsRegister.forEach((er) => {
    if (!isNullOrUndefined(er.controls)) {
      er.controls.forEach((e) => {
        let erEleMatched = true;
        if (e.type === eleName) {
          //if config has props
          if (!isNullOrUndefined(e.props)) {
            //make sure each prop exists on the control
            Object.keys(e.props).forEach((p) => {
              if (!eleProps.hasOwnProperty(p) || eleProps[p] !== e.props[p]) {
                erEleMatched = false;
              }
            });
          }
          if (erEleMatched) {
            selectedConfigs.push({ ...er, control: e, controls: undefined });
          }
        }
      });
    }
  });

  let selectedConfig = null;
  let highestPropMapped = 0;
  if (selectedConfigs.length > 0) {
    selectedConfigs.forEach((erConfig) => {
      //tag name/type mapped
      let countPropsMapped = 1;

      //find out the max props matched
      if (!isNullOrUndefined(erConfig.control.props)) {
        const erPropsMappedLength = Object.keys(erConfig.control.props).length;
        countPropsMapped += erPropsMappedLength;
      }

      if (countPropsMapped > highestPropMapped) {
        selectedConfig = erConfig;
        highestPropMapped = countPropsMapped;
      }
    });
  }

  return selectedConfig;
};

export { isNullOrUndefined, mergeDeep, isObject, emFormsGlobalConfig, FormGroupContext, getMostSpecificConfig, isNullEmptyOrWhiteSpace };
