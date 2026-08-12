export const Tab = ({
  active,
  variant = "light",
  size = "md",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active: boolean;
  variant?: "light" | "dark";
  size?: "sm" | "md";
}) => {
  const activeClass =
    variant === "dark"
      ? "bg-gray-700 text-white hover:bg-gray-600"
      : "bg-gray-200 text-gray-900 hover:bg-gray-300";

  const inactiveClass =
    variant === "dark"
      ? "text-gray-500 hover:text-white hover:bg-gray-700/50"
      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100";

  const sizeClass =
    size === "sm"
      ? "px-2 py-1 text-xs font-mono"
      : "px-3 py-1 text-sm font-medium";

  return (
    <button
      className={`rounded transition-all duration-150 ${sizeClass} ${
        active ? activeClass : inactiveClass
      } ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
