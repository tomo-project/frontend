import { cva, type VariantProps } from 'class-variance-authority';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../lib/cn';
import { Icon } from './icon';

// 보이는 크기는 20~22px이지만 before로 누를 수 있는 영역을 44px까지 넓힌다.
// 1.5px 테두리는 1px 테두리 + 0.5px 안쪽 링으로 그린다(Chrome은 테두리 두께를 정수 px로 반올림).
const checkboxVariants = cva(
  [
    'relative inline-flex shrink-0 cursor-pointer items-center justify-center border border-border-strong bg-bg-card text-text-on-accent ring-[0.5px] ring-border-strong ring-inset transition-colors',
    'before:absolute before:content-[""]',
    'data-[state=checked]:border-transparent data-[state=checked]:bg-accent-tomato data-[state=checked]:ring-transparent',
    'disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:text-text-disabled',
    'disabled:data-[state=checked]:border-border-strong disabled:data-[state=checked]:bg-bg-disabled disabled:data-[state=checked]:ring-border-strong',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
  ],
  {
    variants: {
      shape: {
        circle: 'size-[22px] rounded-full before:-inset-12',
        square: 'size-20 rounded-xs before:-inset-12',
      },
    },
    defaultVariants: {
      shape: 'square',
    },
  },
);

export type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>;

export function Checkbox({ shape, className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root className={cn(checkboxVariants({ shape }), className)} {...props}>
      <CheckboxPrimitive.Indicator className="flex">
        <Icon name="check" className="size-[14px]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
