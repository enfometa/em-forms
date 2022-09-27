import {useState, useRef} from 'react';
import EmFormsCore from './EmFormsCore';

function useEmForms(formsObj) {
  const [forms, setForms] = useState(formsObj);
  const emFormsRef = useRef();
  useState(() => {
    emFormsRef.current = new EmFormsCore({
      forms: forms.forms,
      handleStateUpdate: () => {
        setForms({...forms});
        if (!emFormsRef.current == undefined) {
          emFormsRef.current.setFormsObj(forms);
        }
      },
      config: forms.config,
    });
  }, []);

  return [emFormsRef.current];
}

export default useEmForms;
