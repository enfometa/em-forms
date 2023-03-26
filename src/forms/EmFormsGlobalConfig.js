import { isNullOrUndefined } from "./common";

class EmFormsGlobalConfig {
  constructor() {
    this.emFormConfig = {
      valueFunc: (e) => {
        return e.target.value;
      },
      bindValue: true,
      valuePropName: "value",
      onChangePropName: "onChange",
      controlsRegister: [],
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

  registerEmFormControls = (configArray) => {
    if (!isNullOrUndefined(configArray)) {
      configArray.forEach((item) => {
        this.emFormConfig.controlsRegister.push(item);
      });
    }
  };

  getEmFormControlsRegister = () => {
    return this.emFormConfig.controlsRegister;
  };

  setEmFormGlobalConfig = (defaultConfig) => {
    this.emFormConfig.bindValue = defaultConfig.bindValue;
    this.emFormConfig.valuePropName = defaultConfig.valuePropName;
    this.emFormConfig.onChangePropName = defaultConfig.onChangePropName;
    this.emFormConfig.valueFunc = defaultConfig.valueFunc;
    this.emFormConfig.valueConverter = defaultConfig.valueConverter;
  };
}

export default EmFormsGlobalConfig;
