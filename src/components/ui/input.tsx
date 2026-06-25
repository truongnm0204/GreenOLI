import * as React from "react";
import { cn } from "@/lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  containerClassName?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, containerClassName, className, id, ...rest }, ref) => {
    const inputId =
      id ?? `in-${rest.name ?? Math.random().toString(36).slice(2, 8)}`;
    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label ? (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-input border bg-surface-container-lowest px-4 py-3",
            "text-base text-text-primary placeholder:text-text-muted",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-0",
            error
              ? "border-error focus:border-error"
              : "border-border-soft focus:border-primary",
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-error">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  containerClassName?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, containerClassName, className, id, ...rest }, ref) => {
    const inputId =
      id ?? `tx-${rest.name ?? Math.random().toString(36).slice(2, 8)}`;
    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label ? (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={inputId}
          rows={5}
          className={cn(
            "w-full rounded-input border bg-surface-container-lowest px-4 py-3",
            "text-base text-text-primary placeholder:text-text-muted",
            "transition-colors duration-200 resize-y",
            "focus:outline-none focus:ring-0",
            error
              ? "border-error focus:border-error"
              : "border-border-soft focus:border-primary",
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-error">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
