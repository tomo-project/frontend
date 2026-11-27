import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, screen, userEvent, waitFor } from 'storybook/test';

import { Button } from '@/shared/ui';

import { alertToast } from './alert-toast';
import { AlertToaster } from './alert-toaster';

const onStart = fn();

const meta = {
  title: 'Entities/Notification/AlertToast',
  component: AlertToaster,
  decorators: [
    (Story) => (
      <div className="h-[320px]">
        <Story />
      </div>
    ),
  ],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AlertToaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <div className="p-24">
      <AlertToaster />
      <Button onClick={() => alertToast('디자인 컨셉 정리 예정 시간이에요.', { onStart })}>
        일정 알림
      </Button>
    </div>
  ),
};

export const StartsFocus: Story = {
  render: Playground.render,
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: '일정 알림' }));
    await waitFor(() => expect(screen.getByRole('status')).toBeVisible());
    await userEvent.click(screen.getByRole('button', { name: '바로 집중 시작' }));
    await expect(onStart).toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  },
};
