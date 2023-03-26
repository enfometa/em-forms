import React from "react";

declare module "@enfometa/em-forms" {
  interface EmFormConfigControl {
    type: string;
    props: any;
  }
  interface EmFormConfig {
    valueFunc: (e: UIEvent) => void;
    bindValue: boolean;
    valuePropName: string;
    onChangePropName: string;
    controls: EmFormConfigControl[];
    valueConverter: (value : any) => any
  }

  interface EmFormsGlobalConfig {
    emFormConfig: EmFormConfig;
    registerEmFormControls(configArray: EmFormConfig[]): void;
    getEmFormControlsRegister(): EmFormConfig[];
    setEmFormGlobalConfig(defaultConfig: EmFormConfig): void;
  }

  export const emFormsGlobalConfig: EmFormsGlobalConfig;

  interface Validator {
    name: string;
    func: (form: EmFormControl, emForms: EmFormsObj, param: any) => boolean;
    message: string;
    param?: any;
  }

  interface EmFormControl {
    name: string;
    value: any;
    validators: Validator[];
    onChange?: (value: any) => void;
  }

  interface KeyValue {
    name: string;
    value: any;
  }

  interface EmFormsObj {
    forms: EmFormControl[];
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
    valueConverter: (value : any) => any
  }

  interface EmFormErrorProps extends EmFormGroupProps {
    formName: string;
    validatorName: string;
  }

  interface EmFormsCore {
    new (emForms: EmFormsObj);
    addForm(formControl: EmFormControl): void;
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
    getForm(formName: string): EmFormControl;
    getFormValue(formName: string): any;
    getFormTouch(formName: string): boolean;
    toModel(): any;
    setValuesFromModel(obj: any, setDefaults: boolean): void;
    setValues(values: KeyValue[], setDefaults: boolean): void;
    setModel(model: any, allowAddProps: boolean): void;
  }

  export function useEmForms(emForms: EmFormsObj): EmFormsCore;
  export function initEmForms(emForms: EmFormsObj, component: React.Component, stateKey: string): EmFormsCore;

  export function EmFormGroup(props: EmFormGroupProps): React.FC;
  export function EmFormControl(props: EmFormProps): React.FC;
  export function EmFormError(props: EmFormErrorProps): React.FC;
  export function EmFormErrorMessage(props: EmFormErrorProps): React.FC;

  export function required(formControl: EmFormControl, emForms: EmFormsObj, param: any): boolean;
  export function maxLength(formControl: EmFormControl, emForms: EmFormsObj, param: any): boolean;
  export function minLength(formControl: EmFormControl, emForms: EmFormsObj, param: any): boolean;
  export function pattern(formControl: EmFormControl, emForms: EmFormsObj, param: any): boolean;
  export function email(formControl: EmFormControl, emForms: EmFormsObj, param: any): boolean;
  export function requiredIf(formControl: EmFormControl, emForms: EmFormsObj, param: any): boolean;
  export function compare(formControl: EmFormControl, emForms: EmFormsObj, param: any): boolean;
  export function range(formControl: EmFormControl, emForms: EmFormsObj, param: any): boolean;
  export function number(formControl: EmFormControl, emForms: EmFormsObj, param: any): boolean;
}
