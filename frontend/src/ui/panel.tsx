export const Panel = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`w-1/2 h-full p-4 ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};
