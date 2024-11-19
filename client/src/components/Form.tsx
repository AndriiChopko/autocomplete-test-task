import React, { useState } from 'react';
import Input from './Input';
import { InputValues } from '../utils/types';
import useFormControls from '../hooks/useFormControls';
import useAutocomplete from '../hooks/useAutocomplete';

const Form = () => {
  const [focusInput, setFocusInput] = useState('');
  const [showMessageErrors, setShowMessageErrors] = useState(false);
  const { inputValues, errors, autocompleteData, handleInputChange } = useAutocomplete(focusInput)
  const { handleFormSubmit, handleResetForm } = useFormControls({
    setShowMessageErrors,
    inputValues,
  });

  const handleFocusInput = (name: string) => {
    setFocusInput(name);
    setShowMessageErrors(false);
  }

  return <form onSubmit={handleFormSubmit} onReset={handleResetForm}>
    {Object.keys(inputValues).map((inputKey) => (
      <Input
        key={inputKey}
        name={inputKey}
        value={inputValues[inputKey as keyof InputValues]}
        options={autocompleteData?.[inputKey as keyof InputValues] || []}
        onChange={handleInputChange}
        onSetFocus={handleFocusInput}
        isDropdownOpen={inputKey === focusInput}
        error={errors[inputKey as keyof InputValues]}
        isShowError={showMessageErrors}
      />
    ))}
    <button type="submit">Continue</button>
    <button type="reset">Reset</button>
  </form>
}

export default Form;