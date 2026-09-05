// Trazabilidad SDLC: HU-07
import { Loader2, Bird, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "./Button";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Cargando..." }: LoadingStateProps) {
  return (
    <div role="status" className="flex flex-col items-center justify-center p-8 text-textSecondary">
      <Loader2 className="w-8 h-8 animate-spin mb-2" />
      <p>{message}</p>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Bird className="w-12 h-12 text-textSecondary mb-4" />
      <h3 className="text-xl font-semibold text-textPrimary mb-1">{title}</h3>
      {description && <p className="text-textSecondary mb-4">{description}</p>}
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "Ocurrió un error.", onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertCircle className="w-12 h-12 text-error mb-4" />
      <h3 className="text-xl font-semibold text-textPrimary mb-1">Error</h3>
      <p className="text-textSecondary mb-4">{message}</p>
      {onRetry && <Button onClick={onRetry}>Reintentar</Button>}
    </div>
  );
}

interface SuccessStateProps {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function SuccessState({ title, description, action }: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <CheckCircle className="w-12 h-12 text-success mb-4" />
      <h3 className="text-xl font-semibold text-textPrimary mb-1">{title}</h3>
      {description && <p className="text-textSecondary mb-4">{description}</p>}
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}
