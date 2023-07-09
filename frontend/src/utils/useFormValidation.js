import { useState } from 'react';

const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateForm = (form) => {
    const formErrors = {};
    for (let element of form.elements) {
      if (element.tagName === 'INPUT' && !element.validity.valid) {
        formErrors[element.name] = element.validationMessage;
      }
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  return { errors, validateForm };
};

export default useFormValidation;
