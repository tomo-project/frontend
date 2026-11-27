import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, screen, userEvent, waitFor } from 'storybook/test';

import { IconButton } from '@/shared/ui';

import { NotificationItem } from './notification-item';
import {
  NotificationPanel,
  NotificationPanelContent,
  NotificationPanelTrigger,
} from './notification-panel';

const meta = {
  title: 'Entities/Notification/NotificationPanel',
  component: NotificationPanelContent,
  args: {
    onReadAll: fn(),
    onViewAll: fn(),
  },
  decorators: [
    (Story) => (
      <div className="flex h-[400px] justify-end p-24">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotificationPanelContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <NotificationPanel>
      <NotificationPanelTrigger asChild>
        <IconButton icon="bell" aria-label="알림" dot />
      </NotificationPanelTrigger>
      <NotificationPanelContent {...args} className="w-[400px]">
        <NotificationItem
          type="todo"
          state="unread"
          message="디자인 컨셉 정리 예정 시간이에요."
          time="25분 전"
        />
        <NotificationItem
          type="system"
          state="unread"
          message="11월 27일 02:00~04:00 서비스 점검이 있어요."
          time="4시간 전"
        />
        <NotificationItem
          type="todo"
          state="read"
          message="홈 화면 구성 다듬기 예정 시간이에요."
          time="어제 10:30"
        />
      </NotificationPanelContent>
    </NotificationPanel>
  ),
};

export const Empty: Story = {
  render: (args) => (
    <NotificationPanel>
      <NotificationPanelTrigger asChild>
        <IconButton icon="bell" aria-label="알림" />
      </NotificationPanelTrigger>
      <NotificationPanelContent {...args} className="w-[400px]" />
    </NotificationPanel>
  ),
};

export const ReturnsFocusOnClose: Story = {
  render: Default.render,
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: '알림' });
    await userEvent.click(trigger);
    await waitFor(() => expect(screen.getByText('모두 읽음')).toBeVisible());
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};
