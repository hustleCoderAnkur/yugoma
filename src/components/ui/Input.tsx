
import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`h-12 w-full rounded-xl border border-slate-950 bg-white px-4 text-sm outline-none transition-all focus:border-slate-950 focus:ring-2 focus:ring-slate-200 placeholder:text-gray-400
        ${className}
`}
      {...props}
    />
  );
}