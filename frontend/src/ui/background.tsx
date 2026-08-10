export const Background = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`min-h-screen bg-black border-none ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};
