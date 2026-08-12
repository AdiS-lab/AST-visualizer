export const ErrorText = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={`text-red-500 text-sm mt-1 ${className ?? ''}`} {...props}>
      {children}
    </p>
  )
}
