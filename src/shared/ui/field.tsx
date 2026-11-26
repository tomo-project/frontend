import type { ReactNode } from 'react';

import { cn } from '../lib/cn';
import { type FieldStatus, helperId, helperTone } from './field-control';

type FieldFrameProps = {
  id: string;
  label?: ReactNode;
  helper?: ReactNode;
  status: FieldStatus;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

export function FieldFrame({
  id,
  label,
  helper,
  status,
  disabled,
  className,
  children,
}: FieldFrameProps) {
  return (
    <div className={cn('flex flex-col gap-8', className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn('text-label-bold', disabled ? 'text-text-disabled' : 'text-text-primary')}
        >
          {label}
        </label>
      )}
      {children}
      {helper && (
        <p id={helperId(id)} className={cn('text-caption', helperTone[status])}>
          {helper}
        </p>
      )}
    </div>
  );
}
