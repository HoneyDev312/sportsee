type PageStateProps = {
  message: string;
  className?: string;
  variant?: "loading" | "error" | "empty";
};

export function PageState({
  message,
  className = "error-page",
  variant = "empty",
}: PageStateProps) {
  return (
    <main className={className} role={variant === "error" ? "alert" : "status"}>
      <p>{message}</p>
    </main>
  );
}
