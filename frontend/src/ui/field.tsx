export const Field = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`flex flex-col gap-1 w-full ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const FormLayout = ({
  title,
  children,
  className,
  ...props
}: { title: string } & React.FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <form
      style={{ padding: "3rem" }}
      className={`flex flex-col items-center gap-6 w-full max-w-sm border border-white rounded-xl bg-[#2e2e32] ${className ?? ""}`}
      {...props}
    >
      <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
      {children}
    </form>
  );
};
