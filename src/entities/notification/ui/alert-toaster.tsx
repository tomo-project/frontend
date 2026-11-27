import type { CSSProperties } from 'react';
import { Toaster as SonnerToaster } from 'sonner';

import { ALERT_TOASTER_ID } from './alert-toaster-id';

// alertToast가 뜨는 자리. 화면 어딘가에 한 번 있어야 보인다.
// 직접 그리는(custom) 토스트는 sonner가 내용 폭으로 붙이므로 칸을 자리 폭으로 넓힌다.
export function AlertToaster() {
  return (
    <SonnerToaster
      id={ALERT_TOASTER_ID}
      position="top-right"
      style={{ '--width': '380px' } as CSSProperties}
      toastOptions={{ className: 'w-full' }}
    />
  );
}
