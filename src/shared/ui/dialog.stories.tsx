import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor } from 'storybook/test';

import { Button } from './button';
import {
  Dialog,
  DialogActions,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>세션 설정 열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>세션 설정</DialogTitle>
          <DialogDescription>집중 시간과 휴식 시간을 정해 주세요.</DialogDescription>
        </DialogHeader>
        <DialogActions>
          <DialogClose asChild>
            <Button variant="secondary">닫기</Button>
          </DialogClose>
          <Button variant="primary">저장하기</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        component: [
          '`bg-bg-overlay` 위 가운데에 뜨는 대화상자(Radix Dialog). 폭 440px, 화면이 좁으면 양옆 16px을 남기고 줄어든다.',
          '`Dialog` · `DialogTrigger` · `DialogContent` · `DialogHeader`(`DialogTitle` + `DialogDescription`) · `DialogActions`로 조합한다.',
          '열리면 포커스가 안에 갇히고, ESC나 바깥 클릭으로 닫히며, 닫히면 포커스가 열었던 버튼으로 돌아간다.',
          '',
          '"정말 할까요?"처럼 확인만 받는 경우는 `ConfirmDialog`를 쓴다.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
};

export const FocusAndEscape: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: '세션 설정 열기' });
    await userEvent.click(trigger);
    const dialog = await screen.findByRole('dialog', { name: '세션 설정' });
    await expect(dialog).toHaveAccessibleDescription('집중 시간과 휴식 시간을 정해 주세요.');
    await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement));
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await expect(dialog).toContainElement(document.activeElement as HTMLElement);
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await expect(trigger).toHaveFocus();
  },
};
