import React, { useImperativeHandle, useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import classes from "./Input.module.scss";

interface Props {
  id: string;
  type: string;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  classes?: string;
  value?: string;
  ref?: HTMLInputElement;
  readonly?: boolean;
  autocomplete?: string;
  required?: boolean; // Added required prop
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IImperativeHandler {
  focus: () => void;
  value?: string;
}

const Input = React.forwardRef<IImperativeHandler, Props>((props, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [internalValue, setInternalValue] = useState(props.value || "");

  // Sync with parent's value when it changes
  useEffect(() => {
    setInternalValue(props.value || "");
  }, [props.value]);

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (props.onChange) {
      // Create a synthetic event to maintain consistency
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          id: props.id,
          value: newValue
        }
      };
      props.onChange(syntheticEvent);
    }
  }

  function inputFocused() {
    inputRef.current?.focus();
    inputRef.current?.setAttribute("style", "border:2px solid red");
  }

  useImperativeHandle(ref, () => {
    return {
      focus: inputFocused,
      value: internalValue,
    };
  });

  const { t } = useTranslation();
  return (
    <div className={`${classes.form__control} ${props.classes}`}>
      <label htmlFor={props.id}>{t(`${props.id}`)}</label>
      <input
        ref={inputRef}
        id={props.id}
        minLength={props.minLength}
        maxLength={props.maxLength}
        type={props.type}
        placeholder={props.placeholder}
        value={internalValue}
        readOnly={props.readonly || false}
        onChange={inputChangeHandler}
        autoComplete={props.autocomplete || "off"}
        required={props.required} // Added required attribute
      />
    </div>
  );
});

export default Input;
