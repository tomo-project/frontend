import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../lib/cn';
import { Icon, type IconName } from './icon';

const iconButtonVariants = cva(
  [
    'relative inline-flex size-40 shrink-0 cursor-pointer items-center justify-center rounded-full',
    'border border-transparent transition-[background-color,box-shadow,color]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
    'disabled:pointer-events-none disabled:border-transparent disabled:bg-bg-disabled disabled:text-text-disabled disabled:shadow-none',
    '[&_svg]:size-20',
  ],
  {
    variants: {
      variant: {
        ghost: [
          'text-text-secondary',
          'hover:bg-bg-soft',
          'active:bg-bg-well',
          'disabled:bg-transparent',
        ],
        secondary: [
          'border-border-strong bg-bg-card text-text-primary',
          'hover:bg-bg-soft',
          'active:bg-bg-well',
        ],
        soft: [
          'bg-bg-soft text-text-primary shadow-raised-sm',
          'hover:shadow-raised-md',
          'active:shadow-inset',
        ],
      },
    },
    defaultVariants: {
      variant: 'ghost',
    },
  },
);

export type IconButtonProps = Omit<ComponentProps<'button'>, 'children'> &
  VariantProps<typeof iconButtonVariants> & {
    icon: IconName;
    // 아이콘만 보이므로 버튼의 이름을 반드시 받는다.
    'aria-label': string;
    dot?: boolean;
  };

export function IconButton({
  variant,
  icon,
  dot = false,
  type = 'button',
  className,
  ...props
}: IconButtonProps) {
  return (
    <button type={type} className={cn(iconButtonVariants({ variant }), className)} {...props}>
      <Icon name={icon} />
      {dot && (
        <span
          aria-hidden
          className="absolute top-8 right-8 size-8 rounded-full bg-accent-tomato ring-2 ring-bg-page"
        />
      )}
    </button>
  );
}
