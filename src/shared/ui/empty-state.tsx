import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../lib/cn';
import { Icon, type IconName } from './icon';

export type EmptyStateProps = Omit<ComponentProps<'div'>, 'title'> & {
  icon: IconName;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

// 사과 대신 다음 행동을 안내한다(Figma EmptyState 설명).
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn('flex flex-col items-center gap-12 px-24 py-48 text-center', className)}
      {...props}
    >
      <div className="flex size-[56px] items-center justify-center rounded-full bg-bg-well text-text-secondary">
        <Icon name={icon} />
      </div>
      <p className="text-heading-3 text-text-primary">{title}</p>
      {description && <p className="text-label text-text-secondary">{description}</p>}
      {action}
    </div>
  );
}
