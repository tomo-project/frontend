import { cva } from 'class-variance-authority';

export type FieldStatus = 'default' | 'error' | 'success';

export const fieldControlVariants = cva(
  'flex h-[48px] w-full items-center gap-8 rounded-md border bg-bg-card px-16 text-body text-text-primary transition-colors',
  {
    variants: {
      status: {
        default: 'border-border-strong',
        error: 'border-border-danger ring-[0.5px] ring-border-danger ring-inset',
        success: 'border-border-strong',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  },
);

// Chrome은 테두리 두께를 정수 px로 반올림하므로 1.5px 테두리는 1px 테두리 + 0.5px 안쪽 링으로 그린다.
// 오류 상태는 빨간 테두리를 유지하므로, 포커스는 바깥 외곽선으로 따로 보여 준다.
export const errorFocusRing = {
  within: 'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-text-danger',
  visible:
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-danger data-[state=open]:outline-2 data-[state=open]:outline-offset-2 data-[state=open]:outline-text-danger',
};

export const focusRing = {
  within:
    'focus-within:border-border-focus focus-within:ring-[0.5px] focus-within:ring-border-focus focus-within:ring-inset',
  visible:
    'focus-visible:border-border-focus focus-visible:ring-[0.5px] focus-visible:ring-border-focus focus-visible:ring-inset data-[state=open]:border-border-focus data-[state=open]:ring-[0.5px] data-[state=open]:ring-border-focus data-[state=open]:ring-inset',
};

export const helperTone: Record<FieldStatus, string> = {
  default: 'text-text-secondary',
  error: 'text-text-danger',
  success: 'text-text-success',
};

export function helperId(id: string) {
  return `${id}-helper`;
}

// 호출부가 넘긴 aria-describedby를 덮어쓰지 않고 도움말 id와 함께 건다.
export function describedBy(id: string, hasHelper: boolean, extra?: string) {
  return [hasHelper ? helperId(id) : undefined, extra].filter(Boolean).join(' ') || undefined;
}
