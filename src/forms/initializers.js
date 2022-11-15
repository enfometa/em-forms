import { useState, useRef } from "react";
import { isNullOrUndefined } from "./common";
import EmFormsCore from "./EmFormsCore";

//For functional components
function useEmForms(formsObj) {
  const [forms, setForms] = useState(formsObj);
  const emFormsRef = useRef();
  useState(() => {
    emFormsRef.current = new EmFormsCore({
      ...forms,
      handleStateUpdate: () => {
        setForms({ ...forms });
      },
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
    ...formsObj,
    handleStateUpdate: () => {
      component.setState({ [stateKey]: { ...component.state[stateKey] } });
    },
  });
  return emForms;
};

export { useEmForms, initEmForms };
