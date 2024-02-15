import { ErrorFallback } from "../../components";

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <ErrorFallback>
      {error.message} {"hello from posts"}
    </ErrorFallback>
  );
}
