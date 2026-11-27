import { toast as sonnerToast } from 'sonner';

import { Button, Icon, IconButton } from '@/shared/ui';

import { ALERT_TOASTER_ID } from './alert-toaster-id';

export type AlertToastOptions = {
  onStart: () => void;
};

// To-do 알림 시각에 오른쪽 위에 띄우는 알림창. 버튼을 누를 때까지 남아 있다.
// 정책상 집중 세션 중에는 띄우지 않는다(호출부에서 막는다).
export function alertToast(message: string, { onStart }: AlertToastOptions) {
  return sonnerToast.custom(
    (id) => (
      <div
        role="status"
        className="flex w-full flex-col gap-16 rounded-lg border border-border-subtle bg-bg-card p-20 font-sans shadow-popover"
      >
        <div className="flex items-start gap-12">
          <span className="flex size-40 shrink-0 items-center justify-center rounded-full bg-accent-tomato-soft text-accent-tomato">
            <Icon name="bell" className="size-20" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <p className="text-caption-bold text-accent-tomato">일정 알림 · 지금</p>
            <p className="text-body-bold text-text-primary">{message}</p>
          </div>
          <IconButton icon="close" aria-label="닫기" onClick={() => sonnerToast.dismiss(id)} />
        </div>
        <div className="flex justify-end gap-8">
          <Button variant="ghost" onClick={() => sonnerToast.dismiss(id)}>
            나중에
          </Button>
          <Button
            variant="primary"
            icon="play"
            onClick={() => {
              onStart();
              sonnerToast.dismiss(id);
            }}
          >
            바로 집중 시작
          </Button>
        </div>
      </div>
    ),
    { toasterId: ALERT_TOASTER_ID, duration: Infinity },
  );
}
