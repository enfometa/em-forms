import {isNullOrUndefined} from 'common/utilities';
import React from 'react';
import {FormGroupContext} from './EmForms';

function EmFormGroup(props) {
  const {children, emForms, ...rest} = props;

  return <FormGroupContext.Provider value={{emForms: emForms}}>{children}</FormGroupContext.Provider>;
}

export default EmFormGroup;
