import { ToggleGroup } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../lib/cn';

export type ChipGroupProps = ComponentProps<typeof ToggleGroup.Root>;

// 하나만 고르면 칩이 radio가 되므로 묶음도 radiogroup으로 알린다.
export function ChipGroup({ className, ...props }: ChipGroupProps) {
  return (
    <ToggleGroup.Root
      role={props.type === 'single' ? 'radiogroup' : 'group'}
      className={cn('flex flex-wrap gap-8', className)}
      {...props}
    />
  );
}

export type ChipProps = ComponentProps<typeof ToggleGroup.Item>;

export function Chip({ className, ...props }: ChipProps) {
  return (
    <ToggleGroup.Item
      className={cn(
        'inline-flex h-[36px] shrink-0 cursor-pointer items-center rounded-full border px-16 whitespace-nowrap transition-colors',
        'border-border-strong bg-bg-card text-label text-text-secondary hover:bg-bg-soft',
        'data-[state=on]:border-border-focus data-[state=on]:bg-accent-tomato-soft data-[state=on]:text-label-bold data-[state=on]:text-accent-tomato',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
        className,
      )}
      {...props}
    />
  );
}
