import { Popover as PopoverPrimitive } from 'radix-ui';
import { Children, type ComponentProps, useId } from 'react';

import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';

export const NotificationPanel = PopoverPrimitive.Root;
export const NotificationPanelTrigger = PopoverPrimitive.Trigger;

export type NotificationPanelContentProps = ComponentProps<typeof PopoverPrimitive.Content> & {
  onReadAll: () => void;
  onViewAll: () => void;
};

// 닫힐 때 포커스는 Radix Popover가 트리거(알림 버튼)로 되돌린다.
export function NotificationPanelContent({
  onReadAll,
  onViewAll,
  align = 'end',
  sideOffset = 8,
  className,
  children,
  ...props
}: NotificationPanelContentProps) {
  const empty = Children.count(children) === 0;
  const titleId = useId();

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        aria-labelledby={titleId}
        className={cn(
          'z-50 flex max-h-(--radix-popover-content-available-height) flex-col gap-4 overflow-y-auto rounded-lg border border-border-subtle bg-bg-card p-8 shadow-popover outline-none',
          className,
        )}
        {...props}
      >
        <div className="flex items-center p-8">
          <h2 id={titleId} className="flex-1 text-heading-3 text-text-primary">
            알림
          </h2>
          {!empty && (
            <button
              type="button"
              onClick={onReadAll}
              className="cursor-pointer text-label-bold text-accent-tomato focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
            >
              모두 읽음
            </button>
          )}
        </div>
        {empty ? (
          <div className="flex flex-col items-center gap-8 px-16 py-32 text-center">
            <span className="flex size-48 items-center justify-center rounded-full bg-bg-well text-text-secondary">
              <Icon name="bell" className="size-[22px]" />
            </span>
            <p className="text-body-bold text-text-primary">새 알림이 없어요</p>
            <p className="text-caption text-text-secondary">
              To-do에 알림 시간을 정하면 여기로 알려드려요.
            </p>
          </div>
        ) : (
          children
        )}
        <div className="h-px bg-border-subtle" />
        <button
          type="button"
          onClick={onViewAll}
          className="cursor-pointer p-8 text-label-bold text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
        >
          모두 보기
        </button>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}
