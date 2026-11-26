import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../lib/cn';
import { Icon, type IconName } from './icon';

const bannerVariants = cva('flex items-center gap-12 rounded-md px-16 py-12 text-label', {
  variants: {
    tone: {
      warning: 'bg-bg-warning text-text-warning',
      danger: 'bg-bg-danger text-text-danger',
      info: 'bg-bg-well text-text-secondary',
    },
  },
  defaultVariants: {
    tone: 'info',
  },
});

export type BannerProps = Omit<ComponentProps<'div'>, 'role'> &
  VariantProps<typeof bannerVariants> & {
    icon?: IconName;
    action?: ReactNode;
    onClose?: () => void;
    closeLabel?: string;
  };

// 닫기 버튼은 20px 아이콘이지만 before로 누를 수 있는 영역을 44px까지 넓힌다.
// 오류(danger)는 바로 읽히도록 alert, 나머지는 status로 알린다.
export function Banner({
  tone,
  icon = 'info',
  action,
  onClose,
  closeLabel = '닫기',
  className,
  children,
  ...props
}: BannerProps) {
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn(bannerVariants({ tone }), className)}
      {...props}
    >
      <Icon name={icon} className="size-20" />
      <p className="min-w-0 flex-1">{children}</p>
      {action}
      {onClose && (
        <button
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          className="relative inline-flex shrink-0 cursor-pointer rounded-sm before:absolute before:-inset-12 before:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
        >
          <Icon name="close" className="size-20" />
        </button>
      )}
    </div>
  );
}
