import type { ReactNode } from 'react';
import { type ExternalToast, toast as sonnerToast } from 'sonner';

import { Icon, type IconName } from './icon';

export type ToastOptions = Pick<ExternalToast, 'id' | 'duration'> & {
  icon?: IconName;
};

// 짧은 완료 알림. 실패 안내는 icon: 'info'로 바꿔 쓴다.
// 화면 어딘가에 <Toaster />가 한 번 있어야 보인다.
// sonner가 토스트 영역에 시스템 글꼴을 지정하므로 font-sans로 앱 글꼴을 다시 건다.
export function toast(message: ReactNode, { icon = 'check', ...options }: ToastOptions = {}) {
  return sonnerToast.custom(
    () => (
      <div className="mx-auto flex w-fit max-w-full items-center gap-8 rounded-md bg-text-primary px-20 py-12 font-sans text-label text-text-on-accent shadow-popover">
        <Icon name={icon} className="size-[18px]" />
        <span>{message}</span>
      </div>
    ),
    options,
  );
}
