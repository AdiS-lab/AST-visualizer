import { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      style={{ padding: "0.45rem 1rem" }}
      className={`border border-white/30 bg-[#2a2a2e] text-white w-full rounded-lg focus:outline-none focus:border-white/60 ${className ?? ""}`}
      {...props}
    />
  );
});
