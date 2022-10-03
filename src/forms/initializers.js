import { useState, useRef } from "react";
import EmFormsCore from "./EmFormsCore";

//For functional components
function useEmForms(formsObj) {
  const [forms, setForms] = useState(formsObj);
  const emFormsRef = useRef();
  useState(() => {
    emFormsRef.current = new EmFormsCore({
      forms: forms.forms,
      handleStateUpdate: () => {
        setForms({ ...forms });
        // if (!emFormsRef.current == undefined) {
        //   emFormsRef.current.setFormsObj(forms);
        //   console.log("emFormsRef.current condition", emFormsRef.current);
        // }
      },
      config: forms.config,
    });
  }, []);

  return emFormsRef.current;
}

//For class components
const initEmForms = (formsObj, component, stateKey) => {
  if (isNullOrUndefined(component.state)) {
    component.state = {};
  }
  component.state[stateKey] = formsObj;

  const emForms = new EmFormsCore({
    forms: formsObj.forms,
    handleStateUpdate: () => {
      component.setState({ [stateKey]: { ...component.state[stateKey] } });
    },
    config: formsObj.config,
  });
  return emForms;
};

export { useEmForms, initEmForms };
