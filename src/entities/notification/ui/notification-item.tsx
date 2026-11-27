import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';

const notificationIconVariants = cva(
  'flex size-[36px] shrink-0 items-center justify-center rounded-full',
  {
    variants: {
      type: {
        todo: 'bg-accent-tomato-soft text-accent-tomato',
        system: 'bg-bg-well text-text-secondary',
      },
    },
  },
);

export type NotificationItemProps = Omit<ComponentProps<'button'>, 'children' | 'type'> &
  Required<VariantProps<typeof notificationIconVariants>> & {
    state: 'unread' | 'read';
    message: string;
    time: string;
  };

// 읽음 처리와 화면 이동은 호출부의 onClick에서 한다.
export function NotificationItem({
  type,
  state,
  message,
  time,
  className,
  ...props
}: NotificationItemProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex w-full cursor-pointer items-start gap-12 rounded-md p-12 text-left',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
        state === 'unread' && 'bg-bg-soft',
        className,
      )}
      {...props}
    >
      <span className={notificationIconVariants({ type })}>
        <Icon name={type === 'todo' ? 'bell' : 'info'} className="size-[18px]" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-2">
        <span
          className={cn('text-text-primary', state === 'unread' ? 'text-label-bold' : 'text-label')}
        >
          {message}
        </span>
        <span className="text-caption text-text-muted">{time}</span>
      </span>
      {state === 'unread' && (
        <span className="mt-4 size-8 shrink-0 rounded-full bg-accent-tomato">
          <span className="sr-only">안 읽음</span>
        </span>
      )}
    </button>
  );
}
