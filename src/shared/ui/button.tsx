import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { ComponentProps, MouseEvent } from 'react';

import { cn } from '../lib/cn';
import { Icon, type IconName } from './icon';

const buttonVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-8 whitespace-nowrap',
    'border border-transparent transition-[background-color,box-shadow,color]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
    'disabled:pointer-events-none disabled:border-transparent disabled:bg-bg-disabled disabled:text-text-disabled disabled:shadow-none',
    'aria-disabled:pointer-events-none aria-disabled:border-transparent aria-disabled:bg-bg-disabled aria-disabled:text-text-disabled aria-disabled:shadow-none',
    '[&_svg]:size-20',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-accent-tomato text-text-on-accent shadow-primary',
          'hover:bg-accent-tomato-pressed',
          'active:bg-accent-tomato-pressed active:shadow-none',
        ],
        secondary: [
          'border-border-strong bg-bg-card text-text-primary',
          'hover:bg-bg-soft',
          'active:bg-bg-well',
        ],
        ghost: [
          'text-text-secondary',
          'hover:bg-bg-soft',
          'active:bg-bg-well',
          'disabled:bg-transparent aria-disabled:bg-transparent',
        ],
        soft: [
          'bg-bg-soft text-text-primary shadow-raised-sm',
          'hover:shadow-raised-md',
          'active:shadow-inset',
        ],
      },
      size: {
        md: 'h-control rounded-md px-20 text-label-bold',
        lg: 'h-[56px] rounded-xl px-24 text-body-bold',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'md',
    },
  },
);

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    icon?: IconName;
    asChild?: boolean;
  };

export function Button({
  variant,
  size,
  icon,
  asChild = false,
  type,
  disabled,
  onClick,
  className,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  // 링크(asChild)의 disabled와 aria-disabled는 브라우저가 막아 주지 않으므로
  // 클릭·Enter·Space로 실행되지 않게 직접 막는다. aria-disabled 버튼은 포커스는 받는다.
  const ariaDisabled = props['aria-disabled'] === true || props['aria-disabled'] === 'true';
  const blocked = ariaDisabled || (asChild && Boolean(disabled));

  return (
    <Comp
      type={asChild ? type : (type ?? 'button')}
      disabled={asChild ? undefined : disabled}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
      aria-disabled={blocked || undefined}
      tabIndex={asChild && disabled ? -1 : props.tabIndex}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        if (blocked) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
    >
      {icon && <Icon name={icon} />}
      <Slot.Slottable>{children}</Slot.Slottable>
    </Comp>
  );
}
