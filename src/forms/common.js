import React from "react";
import EmFormsCore from "./EmFormsCore";
import EmFormsGlobalConfig from "./EmFormsGlobalConfig";

const FormGroupContext = React.createContext();

const emFormsGlobalConfig = new EmFormsGlobalConfig();

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

const getMostSpecificConfig = (element, elementRegister) => {
  const eleName = typeof element.type == "string" ? element.type : element.type.name;
  const eleProps = element.props;
  const selectedConfigs = [];

  //find by element type and make element field as linear to sort easily by number of props
  elementRegister.forEach((er) => {
    if (!isNullOrUndefined(er.elements)) {
      er.elements.forEach((e) => {
        let erEleMatched = true;
        if (e.type === eleName) {
          //if config has props
          if (!isNullOrUndefined(e.props)) {
            //make sure each prop exists on the element
            Object.keys(e.props).forEach((p) => {
              if (!eleProps.hasOwnProperty(p) || eleProps[p] !== e.props[p]) {
                erEleMatched = false;
              }
            });
          }
          if (erEleMatched) {
            selectedConfigs.push({ ...er, element: e, elements: undefined });
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
      if (!isNullOrUndefined(erConfig.element.props)) {
        const erPropsMappedLength = Object.keys(erConfig.element.props).length;
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

export { isNullOrUndefined, mergeDeep, isObject, emFormsGlobalConfig, FormGroupContext, getMostSpecificConfig };
