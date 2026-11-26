import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';

import { Segmented, SegmentedItem } from './segmented';

const meta = {
  title: 'Components/Segmented',
  component: Segmented,
  args: { defaultValue: 'week', 'aria-label': '캘린더 보기' },
  render: (args) => (
    <Segmented {...args}>
      <SegmentedItem value="day">일</SegmentedItem>
      <SegmentedItem value="week">주</SegmentedItem>
      <SegmentedItem value="month">월</SegmentedItem>
    </Segmented>
  ),
  parameters: {
    docs: {
      description: {
        component:
          '일·주·월처럼 한 화면의 보기 방식을 바꾸는 전환(Radix ToggleGroup 단일 선택). 항상 하나가 선택돼 있고, 선택된 항목을 다시 눌러도 풀리지 않는다. 방향키로 항목 사이를 이동한다. 그룹에는 `aria-label`을 준다.',
      },
    },
  },
} satisfies Meta<typeof Segmented>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const KeepsSelection: Story = {
  play: async ({ canvas }) => {
    const week = canvas.getByRole('radio', { name: '주' });
    await userEvent.click(week);
    await expect(week).toHaveAttribute('data-state', 'on');
    await userEvent.click(canvas.getByRole('radio', { name: '월' }));
    await expect(canvas.getByRole('radio', { name: '월' })).toHaveAttribute('data-state', 'on');
    await expect(week).toHaveAttribute('data-state', 'off');
  },
};

export const KeyboardNavigation: Story = {
  play: async ({ canvas }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('radio', { name: '주' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('radio', { name: '월' })).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(canvas.getByRole('radio', { name: '월' })).toHaveAttribute('data-state', 'on');
  },
};
