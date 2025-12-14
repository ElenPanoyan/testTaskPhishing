import { ButtonHTMLAttributes, FC, MouseEvent, ReactNode } from "react";
import classNames from "classnames";

import "./Button.css";

interface TButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<TButton> = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  isLoading = false,
  children,
  className = "",
  disabled,
  onClick,
  type = "button",
  ...props
}) => {
  const buttonClassName = classNames(
    "button",
    `button__${variant}`,
    `button__${size}`,
    {
      button__fullWidth: fullWidth,
      button__loading: isLoading,
      button__disabled: disabled || isLoading,
    },
    className
  );

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      type={type}
      className={buttonClassName}
      disabled={disabled || isLoading}
      onClick={handleClick}
      {...props}
    >
      {isLoading && (
        <span className="button__spinner" aria-hidden="true">
          <svg
            className="spinner"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="32"
              strokeDashoffset="32"
              opacity="0.2"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="32"
              strokeDashoffset="24"
            />
          </svg>
        </span>
      )}
      <span
        className={classNames("button__content", {
          button__content_hidden: isLoading,
        })}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
