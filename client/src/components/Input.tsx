import React, { MouseEventHandler, useEffect, useState } from "react";
import { getCorrectLabel, getUniqValues } from "../utils/helpers";

interface InputProps {
  name: string;
  value: string;
  options: string[];
  isDropdownOpen: boolean;
  isShowError: boolean;
  onChange(data: { name: string, value: string }): void;
  onSetFocus(name: string): void;
  error: string;
}

const Input = ({
  name,
  value,
  options = [],
  isDropdownOpen,
  error,
  isShowError,
  onChange,
  onSetFocus,
}: InputProps) => {
  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    onChange({ name, value: inputValue || '' });
  }, [inputValue]);

  const handlePickOption = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const option = (e.target as HTMLLIElement).getAttribute('data-option');
    setInputValue(option || '');
    onSetFocus('');
  }

  const isShowDropdown = isDropdownOpen && !!options.length;

  return (
    <div
      className="autocomplete-input"
      onFocus={() => onSetFocus(name)}
    >
      <label htmlFor={name}>{getCorrectLabel(name)}</label>
      <input
        name={name}
        type="text"
        className={error ? 'input-error' : ''}
        onChange={handleInputChange}
        value={inputValue}
      />
      {isShowDropdown && <div
        className="toggle-show-list"
        onClick={() => onSetFocus('')}
      >
        &times;
      </div>}
      {error && isShowError && <div className="message-errors">
        {error}
      </div>}
      {isShowDropdown && <div
        className="autocomplete-options"
        onClick={handlePickOption}
      >
        <ul>
          {getUniqValues(options).map((option, index) => (
            <li
              key={`${option}-${index}`}
              data-option={option}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>}
    </div>
  )
}

export default Input;