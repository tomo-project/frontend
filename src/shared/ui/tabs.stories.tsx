import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';

import { TabItem, TabList, TabPanel, Tabs } from './tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: { defaultValue: 'overview' },
  render: (args) => (
    <Tabs {...args} className="w-[640px]">
      <TabList aria-label="통계 보기">
        <TabItem value="overview">개요</TabItem>
        <TabItem value="calendar">캘린더</TabItem>
      </TabList>
      <TabPanel value="overview" className="py-24 text-body text-text-secondary">
        개요 내용
      </TabPanel>
      <TabPanel value="calendar" className="py-24 text-body text-text-secondary">
        캘린더 내용
      </TabPanel>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        component:
          '페이지 안에서 보기를 전환하는 밑줄형 탭(Radix Tabs). `Tabs` · `TabList` · `TabItem` · `TabPanel`로 조합한다. 활성 탭은 토마토 밑줄 + 굵은 글씨, 마우스를 올리면 글씨가 진해진다. 방향키로 탭 사이를 이동한다. 폭은 감싸는 쪽에서 정한다.',
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const KeyboardNavigation: Story = {
  play: async ({ canvas }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('tab', { name: '개요' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    const calendar = canvas.getByRole('tab', { name: '캘린더' });
    await expect(calendar).toHaveFocus();
    await expect(calendar).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('캘린더 내용');
  },
};
