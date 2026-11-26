import { Slot } from 'radix-ui';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../lib/cn';

// 카드 안 간격(gap)과 위아래 여백은 화면마다 달라서 호출부에서 정한다.
export function Card({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      className={cn(
        'flex flex-col rounded-2xl border border-border-subtle bg-bg-card p-32 shadow-card',
        className,
      )}
      {...props}
    />
  );
}

export type CardHeaderProps = Omit<ComponentProps<'div'>, 'title'> & {
  title: ReactNode;
  action?: ReactNode;
};

export function CardHeader({ title, action, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn('flex items-center gap-16', className)} {...props}>
      <h2 className="min-w-0 flex-1 text-heading-3 text-text-primary">{title}</h2>
      {action}
    </div>
  );
}

export type CardActionProps = ComponentProps<'a'> & {
  asChild?: boolean;
};

// 카드 머리의 보조 링크("전체 보기"). 라우터 링크는 asChild로 감싼다.
export function CardAction({ asChild = false, className, ...props }: CardActionProps) {
  const Comp = asChild ? Slot.Root : 'a';

  return (
    <Comp
      className={cn(
        'shrink-0 rounded-sm text-label text-text-secondary transition-colors hover:text-text-primary',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
        className,
      )}
      {...props}
    />
  );
}
