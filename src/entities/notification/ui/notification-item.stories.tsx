import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { NotificationItem } from './notification-item';

const meta = {
  title: 'Entities/Notification/NotificationItem',
  component: NotificationItem,
  args: {
    type: 'todo',
    state: 'unread',
    message: '디자인 컨셉 정리 예정 시간이에요.',
    time: '25분 전',
  },
  decorators: [
    (Story) => (
      <div className="w-[384px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TodoUnread: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /안 읽음/ })).toBeVisible();
  },
};

export const TodoRead: Story = {
  args: { state: 'read' },
  play: async ({ canvas }) => {
    await expect(canvas.queryByText('안 읽음')).not.toBeInTheDocument();
  },
};

export const SystemUnread: Story = {
  args: {
    type: 'system',
    message: '11월 27일 02:00~04:00 서비스 점검이 있어요.',
    time: '4시간 전',
  },
};

export const SystemRead: Story = {
  args: { ...SystemUnread.args, state: 'read' },
};
