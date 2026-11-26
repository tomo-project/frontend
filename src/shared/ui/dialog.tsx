import { Dialog as DialogPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../lib/cn';
import {
  dialogActionsClass,
  dialogContentClass,
  dialogDescriptionClass,
  dialogHeaderClass,
  dialogOverlayClass,
  dialogTitleClass,
} from './dialog-styles';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content>;

export function DialogContent({ className, ...props }: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={dialogOverlayClass}>
        <DialogPrimitive.Content className={cn(dialogContentClass, className)} {...props} />
      </DialogPrimitive.Overlay>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn(dialogHeaderClass, className)} {...props} />;
}

export function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={cn(dialogTitleClass, className)} {...props} />;
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description className={cn(dialogDescriptionClass, className)} {...props} />
  );
}

export function DialogActions({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn(dialogActionsClass, className)} {...props} />;
}
