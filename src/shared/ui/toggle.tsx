import { Switch as SwitchPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../lib/cn';

export type ToggleProps = ComponentProps<typeof SwitchPrimitive.Root>;

export function Toggle({ className, ...props }: ToggleProps) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        // 이슈 #8 규격 44×26: 너비는 control 토큰(44), 높이는 손잡이 18 + 안쪽 여백 4×2 = 26.
        // 손잡이가 정확히 자기 너비(18)만큼 움직이므로 translate-x-full을 쓴다.
        'inline-flex w-control shrink-0 cursor-pointer items-center rounded-full bg-bg-control-off p-4 transition-colors',
        'data-[state=checked]:bg-accent-tomato',
        'disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:data-[state=checked]:bg-bg-disabled',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="size-[18px] rounded-full bg-bg-card shadow-card transition-transform data-[state=checked]:translate-x-full" />
    </SwitchPrimitive.Root>
  );
}
