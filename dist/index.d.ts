declare module "@enfometa/em-forms" {
  interface EmForm {
    name: string;
    value: any;
  }
  interface EmFormsObj {
    forms: EmForm[];
  }
  interface EmFormsCore {
    setFormValue(formName: string, value: any): void;
  }

  export function useEmForms(emForms: EmFormsObj): EmFormsCore;
}
