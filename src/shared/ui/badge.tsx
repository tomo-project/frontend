import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../lib/cn';

const badgeVariants = cva(
  'inline-flex shrink-0 items-center rounded-sm px-8 py-2 text-caption-bold whitespace-nowrap',
  {
    variants: {
      tone: {
        neutral: 'bg-bg-well text-text-secondary',
        tomato: 'bg-accent-tomato-soft text-accent-tomato',
        success: 'bg-bg-success text-text-success',
        warning: 'bg-bg-warning text-text-warning',
      },
    },
    defaultVariants: {
      tone: 'neutral',
    },
  },
);

export type BadgeProps = ComponentProps<'span'> & VariantProps<typeof badgeVariants>;

export function Badge({ tone, className, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
