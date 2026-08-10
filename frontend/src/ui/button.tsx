export const Button = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      data-slot="button"
      style={{ padding: "0.75rem 2rem" }}
      className={`bg-neutral-700 border-none rounded-lg text-white outline-none cursor-pointer hover:bg-neutral-600 transition-colors ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
