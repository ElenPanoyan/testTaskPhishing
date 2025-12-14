import { HideIcon, ShowIcon } from "images";
import {
  useState,
  HTMLInputTypeAttribute,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  FC,
  SVGProps,
} from "react";
import classNames from "classnames";

import "./Input.css";

interface TInput {
  name: string;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  type?: HTMLInputTypeAttribute;
  register?: any;
  label?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  autoComplete?: string;
  value?: string | number;
  containerClass?: string;
  error?: string;
  onBlur?: (data: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (data: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (data: KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (
    value: string | number,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}

const Input: FC<TInput> = ({
  label,
  name,
  Icon,
  containerClass = "",
  onChange,
  className = "",
  onFocus,
  register,
  onKeyDown,
  placeholder = "",
  type = "text",
  autoComplete = "off",
  value,
  onBlur,
  disabled,
  error,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const isPassword = type === "password";

  const inputClassName = classNames(className, "input", {
    input__icon: Icon,
    input__error: error,
    input__focused: isFocused,
    input__disabled: disabled,
  });

  const boxClassName = classNames("box", {
    box__focused: isFocused,
    box__error: error,
    box__disabled: disabled,
  });

  const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange?.(value, e);
  };

  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const onFocusHandler = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const onRegisterChangeCallback = {
    onChange: onChangeValueHandler,
    onBlur: onBlurHandler,
  };

  return (
    <div
      className={classNames("input_wrapper", {
        [containerClass]: containerClass,
      })}
    >
      {label && (
        <label htmlFor={name} className="label">
          {label}
        </label>
      )}

      <div className={boxClassName}>
        {Icon && (
          <div className="icon_wrapper">
            <Icon className="icon" />
          </div>
        )}

        <input
          id={name}
          onChange={onChangeValueHandler}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          value={value}
          className={inputClassName}
          autoComplete={autoComplete}
          onKeyDown={onKeyDown}
          type={isOpen ? "text" : type}
          {...(register ? register(name, onRegisterChangeCallback) : null)}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={classNames("password_toggle", {
              password_toggle__active: isOpen,
            })}
            tabIndex={-1}
            aria-label={isOpen ? "Hide password" : "Show password"}
          >
            {!isOpen ? <HideIcon /> : <ShowIcon />}
          </button>
        )}
      </div>

      {error && <span className="error_message">{error}</span>}
    </div>
  );
};
export default Input;
