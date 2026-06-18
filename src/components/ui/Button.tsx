
import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 disabled: opacity-50 disabled: pointer-events-none ${ className } `}
      {...props}
    >
      {children}
    </button>
  );
}
