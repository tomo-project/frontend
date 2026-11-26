import { Select as SelectPrimitive } from 'radix-ui';
import { type ComponentProps, type ReactNode, useId } from 'react';

import { cn } from '../lib/cn';
import { FieldFrame } from './field';
import {
  describedBy,
  errorFocusRing,
  fieldControlVariants,
  type FieldStatus,
  focusRing,
} from './field-control';
import { Icon } from './icon';

export type SelectProps = Omit<ComponentProps<typeof SelectPrimitive.Root>, 'dir'> & {
  id?: string;
  label?: ReactNode;
  helper?: ReactNode;
  status?: FieldStatus;
  placeholder?: ReactNode;
  className?: string;
  'aria-describedby'?: string;
};

export function Select({
  id,
  label,
  helper,
  status = 'default',
  placeholder,
  disabled,
  className,
  children,
  'aria-describedby': ariaDescribedBy,
  ...props
}: SelectProps) {
  const fallbackId = useId();
  const triggerId = id ?? fallbackId;

  return (
    <FieldFrame
      id={triggerId}
      label={label}
      helper={helper}
      status={status}
      disabled={disabled}
      className={className}
    >
      <SelectPrimitive.Root disabled={disabled} {...props}>
        <SelectPrimitive.Trigger
          id={triggerId}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={describedBy(triggerId, Boolean(helper), ariaDescribedBy)}
          className={cn(
            fieldControlVariants({ status }),
            'cursor-pointer text-left outline-none data-[placeholder]:text-text-muted',
            status === 'error' ? errorFocusRing.visible : focusRing.visible,
            'disabled:cursor-not-allowed disabled:border-transparent disabled:bg-bg-disabled disabled:text-text-disabled',
          )}
        >
          <span className="min-w-0 flex-1 truncate">
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>
          <SelectPrimitive.Icon asChild>
            <Icon
              name="chevron-down"
              className={cn('size-20', disabled ? 'text-text-disabled' : 'text-text-secondary')}
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={8}
            className="z-50 max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width) overflow-hidden rounded-lg border border-border-subtle bg-bg-card p-8 shadow-popover"
          >
            <SelectPrimitive.Viewport className="flex flex-col gap-2">
              {children}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </FieldFrame>
  );
}

export type SelectItemProps = ComponentProps<typeof SelectPrimitive.Item>;

export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'flex cursor-pointer items-center gap-8 rounded-sm px-12 py-8 text-label text-text-primary outline-none select-none',
        'data-[highlighted]:bg-accent-tomato-soft data-[highlighted]:text-accent-tomato',
        'data-[state=checked]:bg-accent-tomato-soft data-[state=checked]:text-accent-tomato',
        'data-[disabled]:pointer-events-none data-[disabled]:text-text-disabled',
        className,
      )}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate">
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </span>
      <SelectPrimitive.ItemIndicator className="flex">
        <Icon name="check" className="size-16" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}
