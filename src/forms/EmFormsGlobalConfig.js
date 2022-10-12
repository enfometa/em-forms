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
    };
  }

  static setConfigValues = (config, bindValue, valuePropName, onChangePropName, valueFunc) => {
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
  };
}

export default EmFormsGlobalConfig;
