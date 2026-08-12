export const ExternalLink = ({
  href,
  children,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`text-red-500 hover:text-red-700 underline ${className ?? ""}`}
    {...props}
  >
    {children}
  </a>
);
