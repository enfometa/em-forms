import React from "react";

declare module "@enfometa/em-forms" {
  interface EmFormConfigElementProp {
    name: string;
    value: string;
  }

  interface EmFormConfigElement {
    type: string;
    props: EmFormConfigElementProp[];
  }
  interface EmFormConfig {
    valueFunc: (e: UIEvent) => void;
    bindValue: boolean;
    valuePropName: string;
    onChangePropName: string;
    elements: EmFormConfigElement[];
  }

  interface EmFormsGlobalConfig {
    emForm: EmFormConfig;
    registerEmFormElements(configArray: EmFormConfig[]): void;
    getEmFormElementsRegister(): EmFormConfig[];
    setEmFormGlobalConfig(defaultConfig: EmFormConfig): void;
  }

  export const emFormsGlobalConfig: EmFormsGlobalConfig;

  interface Validator {
    name: string;
    func: (form: EmForm, emForm: EmFormsObj, param: any) => boolean;
    message: string;
    param?: any;
  }
  interface EmForm {
    name: string;
    value: any;
    validators: Validator[];
    onChange?: (value: any) => void;
  }
  interface EmFormsObj {
    forms: EmForm[];
    onChange?: (formName: string, value: any) => void;
    handleStateUpdate: () => void;
    config?: EmFormsConfig;
  }

  interface FormError {
    validatorName: string;
    message: string;
  }

  interface ResetConfig {
    name: string;
    value: any;
  }

  interface EmFormsTriggersCofig {
    touch: boolean;
    change: boolean;
  }

  interface EmFormsConfig {
    errorMessageTriggers: EmFormsTriggersCofig;
  }

  interface EmFormGroupProps {
    emForms: EmFormsObj;
  }

  interface EmFormProps extends EmFormGroupProps {
    formName: string;
    bindValue: boolean;
    valuePropName: string;
    onChangePropName: string;
    valueFunc: () => any;
  }

  interface EmFormErrorProps extends EmFormGroupProps {
    formName: string;
    validatorName: string;
  }

  interface EmFormsCore {
    new (emForms: EmFormsObj);
    addForm(formObject: EmForm): void;
    isValid(): boolean;
    isValidForm(formName: string): boolean;
    isValidFormValidator(formName: string, validatorName: string): boolean;
    getFormErrors(formName: string): FormError[];
    getFormError(formName: string, validatorName: string): FormError | null;
    getFormErrorMessage(formName: string, validatorName: string): string | null;
    getErrors(): FormError[];
    validate(): boolean;
    validateForm(formName: string): boolean;
    resetForm(formName: string, value: any): void;
    reset(values?: ResetConfig[] | null, excludeForms?: ResetConfig | null): void;
    setFormValue(formName: string, value: any): void;
    setFormTouch(formName: string, touched: boolean): void;
    setTouch(touched: boolean): void;
    getForm(formName: string): EmForm;
    getFormValue(formName: string): any;
    getFormTouch(formName: string): boolean;
    toModel(): any;
    setValuesFromModel(obj: any, setDefaults: boolean): void;
    setValues(values: EmForm[], setDefaults: boolean): void;
    setModel(model: any, allowAddProps: boolean): void;
  }

  export function useEmForms(emForms: EmFormsObj): EmFormsCore;
  export function initEmForms(emForms: EmFormsObj, component: React.Component, stateKey: string): EmFormsCore;

  export function EmFormGroup(props: EmFormGroupProps): React.FC;
  export function EmForm(props: EmFormProps): React.FC;
  export function EmFormError(props: EmFormErrorProps): React.FC;
  export function EmFormErrorMessage(props: EmFormErrorProps): React.FC;

  export function required(form: EmForm, emForms: EmFormsObj, param: any): boolean;
  export function maxLength(form: EmForm, emForms: EmFormsObj, param: any): boolean;
  export function minLength(form: EmForm, emForms: EmFormsObj, param: any): boolean;
  export function pattern(form: EmForm, emForms: EmFormsObj, param: any): boolean;
  export function email(form: EmForm, emForms: EmFormsObj, param: any): boolean;
  export function requiredIf(form: EmForm, emForms: EmFormsObj, param: any): boolean;
  export function compare(form: EmForm, emForms: EmFormsObj, param: any): boolean;
  export function range(form: EmForm, emForms: EmFormsObj, param: any): boolean;
  export function number(form: EmForm, emForms: EmFormsObj, param: any): boolean;
}
