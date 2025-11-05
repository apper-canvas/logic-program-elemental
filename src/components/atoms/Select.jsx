import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(({ 
  className, 
  error,
  label,
  required,
  children,
  ...props 
}, ref) => {
  const baseStyles = "block w-full px-3 py-2 border rounded-lg text-sm bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0";
  const normalStyles = "border-slate-300 focus:border-primary-500 focus:ring-primary-500";
  const errorStyles = "border-red-300 focus:border-red-500 focus:ring-red-500";

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        className={cn(
          baseStyles,
          error ? errorStyles : normalStyles,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;