import { cva, type VariantProps } from 'class-variance-authority';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../lib/cn';
import { Icon, type IconName } from './icon';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const MenuGroup = DropdownMenuPrimitive.Group;

export type DropdownMenuContentProps = ComponentProps<typeof DropdownMenuPrimitive.Content>;

export function DropdownMenuContent({
  sideOffset = 8,
  className,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          'z-50 flex max-h-(--radix-dropdown-menu-content-available-height) flex-col gap-2 overflow-y-auto rounded-lg border border-border-subtle bg-bg-card p-8 shadow-popover outline-none',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

const menuItemVariants = cva(
  'group flex cursor-pointer items-center gap-8 rounded-sm px-12 py-8 text-label outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:text-text-disabled',
  {
    variants: {
      tone: {
        default:
          'text-text-primary data-[highlighted]:bg-accent-tomato-soft data-[highlighted]:text-accent-tomato',
        danger: 'text-text-danger data-[highlighted]:bg-bg-danger',
      },
    },
    defaultVariants: {
      tone: 'default',
    },
  },
);

export type MenuItemProps = ComponentProps<typeof DropdownMenuPrimitive.Item> &
  VariantProps<typeof menuItemVariants> & {
    icon?: IconName;
    meta?: ReactNode;
  };

export function MenuItem({ tone, icon, meta, className, children, ...props }: MenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item className={cn(menuItemVariants({ tone }), className)} {...props}>
      {icon && (
        <Icon
          name={icon}
          className={cn(
            'size-[18px]',
            tone !== 'danger' &&
              'text-text-secondary group-data-[disabled]:text-text-disabled group-data-[highlighted]:text-accent-tomato',
          )}
        />
      )}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {meta && (
        <span className="flex shrink-0 items-center gap-8 text-caption text-text-secondary">
          {meta}
        </span>
      )}
    </DropdownMenuPrimitive.Item>
  );
}

export function MenuLabel({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn('px-12 py-8 text-caption text-text-muted', className)}
      {...props}
    />
  );
}

export function MenuSeparator({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn('h-px bg-border-subtle', className)}
      {...props}
    />
  );
}
