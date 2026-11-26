import type { CSSProperties } from 'react';
import { Toaster as SonnerToaster, type ToasterProps as SonnerToasterProps } from 'sonner';

import { cn } from '../lib/cn';

export type ToasterProps = SonnerToasterProps;

// Figma: 화면 아래 가운데, 아래에서 104px, 2초 후 사라짐.
// 토스트 폭은 내용에 맞추므로 자리(--width)는 넉넉하게 두고 안에서 가운데 정렬한다.
// 직접 그리는(custom) 토스트는 sonner가 내용 폭으로 왼쪽에 붙이므로 칸을 자리 폭으로 넓힌다.
export function Toaster({
  position = 'bottom-center',
  offset = { bottom: 104 },
  duration = 2000,
  containerAriaLabel = '알림',
  style,
  toastOptions,
  ...props
}: ToasterProps) {
  return (
    <SonnerToaster
      position={position}
      offset={offset}
      duration={duration}
      containerAriaLabel={containerAriaLabel}
      style={{ '--width': 'min(560px, calc(100vw - 32px))', ...style } as CSSProperties}
      toastOptions={{ ...toastOptions, className: cn('w-full', toastOptions?.className) }}
      {...props}
    />
  );
}
