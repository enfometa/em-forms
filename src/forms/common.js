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

const comapreFunc = (a, b) => {
  let aPropsCount = 0;
  let bPropsCount = 0;

  if (!isNullOrUndefined(a.element.props)) {
    aPropsCount = a.element.props.length;
  }
  if (!isNullOrUndefined(b.element.props)) {
    bPropsCount = b.element.props.length;
  }

  return aPropsCount - bPropsCount;
};

const getMostSpecificConfig = (element, elementRegister) => {
  const eleName = typeof element.type == "string" ? element.type : element.type.name;
  const eleProps = element.props;
  const selectedConfigs = [];

  //find by element type and make element field as linear to sort easily by number of props
  elementRegister.forEach((er) => {
    if (!isNullOrUndefined(er.elements)) {
      er.elements.forEach((e) => {
        if (e.type === eleName) {
          selectedConfigs.push({ ...er, element: e, elements: undefined });
        }
      });
    }
  });

  selectedConfigs.sort(comapreFunc);

  console.log(selectedConfig);

  let selectedConfig = null;
  //if element config found on register
  let highestPropMapped = 0;
  if (selectedConfigs.length > 0) {
    selectedConfigs.forEach((eleConfig) => {
      let propsMapped = 0;
      //type mapped
      propsMapped++;
      if (!isNullOrUndefined(eleConfig.element.props)) {
        eleConfig.element.props.forEach((pc) => {
          //if property exists
          if (isNullOrUndefined(pc.value)) {
            if (eleProps.hasOwnProperty(pc.name)) {
              propsMapped++;
            }
          } else {
            //if property exists and value also mapped
            if (eleProps.hasOwnProperty(pc.name) && eleProps[pc.name] === pc.value) {
              propsMapped++;
            }
          }
        });
      }
      if (propsMapped > highestPropMapped) {
        selectedConfig = eleConfig;
        highestPropMapped = propsMapped;
      }
    });
  }

  return selectedConfig;
};

export { isNullOrUndefined, mergeDeep, isObject, emFormsGlobalConfig, FormGroupContext, getMostSpecificConfig };
