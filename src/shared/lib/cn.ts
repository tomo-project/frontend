import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// 이름형 토큰은 tailwind-merge가 기본 규칙으로 분류하지 못해
// text-label을 색상으로 보고 text-text-primary와 합치는 식의 충돌이 생긴다.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'timer-xl',
        'display',
        'heading-1',
        'heading-2',
        'heading-3',
        'body',
        'body-bold',
        'label',
        'label-bold',
        'caption',
        'caption-bold',
        'logo',
      ],
      shadow: [
        'card',
        'popover',
        'dialog',
        'raised-sm',
        'raised-md',
        'raised-lg',
        'inset',
        'primary',
      ],
      spacing: ['control'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
