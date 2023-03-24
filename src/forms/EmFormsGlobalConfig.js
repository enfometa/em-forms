import { isNullOrUndefined } from "./common";

class EmFormsGlobalConfig {
  constructor() {
    this.emForm = {
      valueFunc: (e) => {
        return e.target.value;
      },
      bindValue: true,
      valuePropName: "value",
      onChangePropName: "onChange",
      elementRegister: [],
      valueConverter: null
    };
  }

  static setConfigValues = (config, bindValue, valuePropName, onChangePropName, valueFunc, valueConverter) => {
    if (isNullOrUndefined(config.bindValue)) {
      config.bindValue = bindValue;
    }
    if (isNullOrUndefined(config.valuePropName)) {
      config.valuePropName = valuePropName;
    }
    if (isNullOrUndefined(config.onChangePropName)) {
      config.onChangePropName = onChangePropName;
    }
    if (isNullOrUndefined(config.valueFunc)) {
      config.valueFunc = valueFunc;
    }
    if (isNullOrUndefined(config.valueConverter)) {
      config.valueConverter = valueConverter;
    }
  };

  registerEmFormElements = (configArray) => {
    if (!isNullOrUndefined(configArray)) {
      configArray.forEach((item) => {
        this.emForm.elementRegister.push(item);
      });
    }
  };

  getEmFormElementsRegister = () => {
    return this.emForm.elementRegister;
  };

  setEmFormGlobalConfig = (defaultConfig) => {
    this.emForm.bindValue = defaultConfig.bindValue;
    this.emForm.valuePropName = defaultConfig.valuePropName;
    this.emForm.onChangePropName = defaultConfig.onChangePropName;
    this.emForm.valueFunc = defaultConfig.valueFunc;
    this.emForm.valueConverter = defaultConfig.valueConverter;
  };
}

export default EmFormsGlobalConfig;
