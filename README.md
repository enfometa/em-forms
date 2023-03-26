# Introduction

A simple, robust and flexible react forms validation library for both React Js and React Native. The great thing about the library is, it has no dependency on the UI. You can easily decouple your business logic from the UI and can reuse in both React Js and React Native apps.

# Platforms

- React Js
- React Native

# Installation

`npm install @enfometa/em-forms`

# Usage

## Create forms object

```
import { useEmForms, required, email, EmFormErrorMessage, EmFormGroup, EmFormControl } from "@enfometa/em-forms";

const forms = useEmForms({
    forms: [
      {
        name: "username",
        value: "",
        validators: [
          { name: "required", func: required, message: "Username is required" },
          { name: "email", func: email, message: "Invalid email address" },
        ],
      },
      {
        name: "password",
        value: "",
        validators: [{ name: "required", func: required, message: "Password is required" }],
      },
    ],
  });

  const login = () => {
    if(forms.validate()){
        //do something
    }
  };

```

## UI implementation

```
  <EmFormGroup emForms={forms}>
    <div>
        <EmFormControl formName="username">
            <input type="email" className="form-control" placeholder="Email" />
        </EmFormControl>

        <div className="error-message">
            <EmFormErrorMessage formName="username" validatorName="required" />
            <EmFormErrorMessage formName="username" validatorName="email" />
        </div>
    </div>
    <div>
        <EmFormControl formName="password">
            <input type="password" className="form-control" placeholder="password" />
        </EmFormControl>

        <div className="error-message">
            <EmFormErrorMessage formName="password" validatorName="required" />
        </div>
    </div>
    <button className="w-100 btn btn-primary btn-lg" type="button" onClick={login}>
        Login
    </button>
</EmFormGroup>
```

For details please visit https://www.enfometa.com/documentation/em-forms

# Developer

## enfometa

![enfometa](/images/enfometa-logo.png "enfometa logo")

### Website

https://www.enfometa.com/

### GitHub sample project

https://github.com/enfometa/em-forms-samples

### Contact

Email  
enfometa@gmail.com  
hammad.se@live.com

Cell  
0092 333 5543744
