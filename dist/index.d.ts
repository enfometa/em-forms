declare module "@enfometa/em-forms" {
  interface Validators {
    name: string;
    func: (form: EmForm, emForm: EmFormsObj, param: any) => boolean;
    message: string;
  }
  interface EmForm {
    name: string;
    value: any;
    validators: Validators[];
  }
  interface EmFormsObj {
    forms: EmForm[];
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
    touch: boolean = true;
    change: boolean = true;
  }

  interface EmFormsConfig {
    errorMessageTriggers: EmFormsTriggersCofig;
  }

  interface EmFormProps {
    emForms: EmFormsObj;
  }

  interface EmFormsCore {
    new (emForms: EmFormsObj);
    setFormsObj(emForms: EmFormsObj): void;
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
    setValuesFromModel(obj: any): void;
    setValues(values: EmForm): void;
    setModel(model: any, allowAddProps: boolean = false): void;
  }

  export function useEmForms(emForms: EmFormsObj): EmFormsCore;
  export function EmFormGroup(props: EmFormProps): React.FC;
}
