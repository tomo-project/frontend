import { AlertDialog } from 'radix-ui';
import { type ReactNode, useState } from 'react';

import { Button } from './button';
import {
  dialogActionsClass,
  dialogContentClass,
  dialogDescriptionClass,
  dialogHeaderClass,
  dialogOverlayClass,
  dialogTitleClass,
} from './dialog-styles';

export type ConfirmDialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  // 파괴적 동작이면 "종료하기"처럼 동사로 쓴다.
  confirmLabel: string;
  cancelLabel?: string;
  // Promise를 돌려주면 끝날 때까지 버튼을 막고, 성공하면 닫는다. 실패하면 열어 둔다.
  // 실패 안내(토스트 등)는 onConfirm 안에서 처리한다.
  onConfirm: () => void | Promise<unknown>;
};

export function ConfirmDialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
}: ConfirmDialogProps) {
  const [innerOpen, setInnerOpen] = useState(defaultOpen ?? false);
  const [pending, setPending] = useState(false);
  const isControlled = open !== undefined;

  const setOpen = (next: boolean) => {
    if (!isControlled) setInnerOpen(next);
    onOpenChange?.(next);
  };

  const handleConfirm = async () => {
    setPending(true);
    try {
      await onConfirm();
      setOpen(false);
    } catch {
      // 실패하면 다시 시도할 수 있도록 열어 둔다.
    } finally {
      setPending(false);
    }
  };

  return (
    <AlertDialog.Root
      open={isControlled ? open : innerOpen}
      onOpenChange={(next) => {
        // 처리 중에는 Esc 등으로 닫히지 않게 한다.
        if (!pending) setOpen(next);
      }}
    >
      {trigger && <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>}
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={dialogOverlayClass}>
          <AlertDialog.Content
            className={dialogContentClass}
            // 설명이 없으면 Radix 경고가 뜨지 않도록 aria-describedby를 비운다는 걸 명시한다.
            {...(!description && { 'aria-describedby': undefined })}
          >
            <div className={dialogHeaderClass}>
              <AlertDialog.Title className={dialogTitleClass}>{title}</AlertDialog.Title>
              {description && (
                <AlertDialog.Description className={dialogDescriptionClass}>
                  {description}
                </AlertDialog.Description>
              )}
            </div>
            <div className={dialogActionsClass}>
              {cancelLabel && (
                <AlertDialog.Cancel asChild>
                  <Button variant="secondary" disabled={pending}>
                    {cancelLabel}
                  </Button>
                </AlertDialog.Cancel>
              )}
              <AlertDialog.Action asChild>
                <Button
                  variant="primary"
                  disabled={pending}
                  aria-busy={pending || undefined}
                  onClick={(event) => {
                    // Action은 누르면 바로 닫히므로 막고, 끝난 뒤 직접 닫는다.
                    event.preventDefault();
                    void handleConfirm();
                  }}
                >
                  {confirmLabel}
                </Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
