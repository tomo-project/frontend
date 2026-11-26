import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, screen, userEvent, waitFor } from 'storybook/test';

import { Button } from './button';
import { ConfirmDialog } from './confirm-dialog';

const meta = {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,
  args: {
    trigger: <Button>집중 종료</Button>,
    title: '집중을 종료할까요?',
    description:
      '지금까지 집중한 25분은 기록돼요. 단, 이번 세션은 뽀모도로 완료 횟수에 포함되지 않아요.',
    cancelLabel: '계속 집중하기',
    confirmLabel: '종료하기',
    onConfirm: fn(),
  },
  argTypes: {
    trigger: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          '확인만 받는 대화상자 프리셋(Radix AlertDialog). 바깥을 눌러도 닫히지 않고, 열리면 취소 버튼에 포커스가 간다. 파괴적 동작은 `confirmLabel`에 "종료하기"처럼 동사로 쓴다. `cancelLabel`을 빼면 확인 버튼만 보인다.',
      },
    },
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
};

export const ConfirmOnly: Story = {
  args: {
    defaultOpen: true,
    title: '세션이 종료됐어요',
    description: '5분 안에 다시 연결되지 않아 이번 세션을 중단으로 기록했어요.',
    cancelLabel: undefined,
    confirmLabel: '확인',
  },
};

export const Confirms: Story = {
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: '집중 종료' }));
    const dialog = await screen.findByRole('alertdialog', { name: '집중을 종료할까요?' });
    await waitFor(() =>
      expect(screen.getByRole('button', { name: '계속 집중하기' })).toHaveFocus(),
    );
    await userEvent.click(screen.getByRole('button', { name: '종료하기' }));
    await expect(args.onConfirm).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
  },
};

export const Cancels: Story = {
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: '집중 종료' }));
    await screen.findByRole('alertdialog');
    await userEvent.click(screen.getByRole('button', { name: '계속 집중하기' }));
    await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
    await expect(args.onConfirm).not.toHaveBeenCalled();
  },
};

export const WaitsForAsyncConfirm: Story = {
  args: {
    // 저장에 시간이 걸리는 상황: 끝날 때까지 버튼이 막히고, 끝나면 닫힌다.
    onConfirm: fn(() => new Promise<void>((resolve) => setTimeout(resolve, 300))),
  },
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: '집중 종료' }));
    const confirm = await screen.findByRole('button', { name: '종료하기' });
    await userEvent.click(confirm);
    await expect(confirm).toBeDisabled();
    await expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
    await expect(args.onConfirm).toHaveBeenCalledTimes(1);
  },
};

export const StaysOpenOnFailure: Story = {
  args: {
    onConfirm: fn(() => Promise.reject(new Error('네트워크 오류'))),
  },
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: '집중 종료' }));
    await userEvent.click(await screen.findByRole('button', { name: '종료하기' }));
    await waitFor(() => expect(screen.getByRole('button', { name: '종료하기' })).toBeEnabled());
    await expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    await expect(args.onConfirm).toHaveBeenCalledTimes(1);
  },
};
