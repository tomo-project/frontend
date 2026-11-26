import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor } from 'storybook/test';

import { Select, SelectItem } from './select';

const meta = {
  title: 'Components/Select',
  component: Select,
  args: { label: '우선순위', placeholder: '없음' },
  argTypes: {
    status: { control: 'inline-radio', options: ['default', 'error', 'success'] },
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem value="high">높음</SelectItem>
      <SelectItem value="medium">보통</SelectItem>
      <SelectItem value="low">낮음</SelectItem>
    </Select>
  ),
  decorators: [
    (Story) => (
      <div className="h-[280px] w-[360px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Input과 같은 모양의 목록 선택(Radix Select). 오른쪽에 ChevronDown이 붙는다. 목록은 To-do 메뉴와 같은 팝오버 모양이고, 선택된 항목과 마우스를 올리거나 방향키로 이동한 항목은 연한 토마토 배경 + 토마토 글씨로 표시된다.',
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-32">
      {(['default', 'error', 'success'] as const).map((status) => (
        <Select
          key={status}
          {...args}
          status={status}
          defaultValue={status === 'default' ? undefined : 'high'}
          helper={status === 'error' ? '우선순위를 골라 주세요' : undefined}
        >
          <SelectItem value="high">높음</SelectItem>
          <SelectItem value="medium">보통</SelectItem>
        </Select>
      ))}
      <Select {...args} disabled defaultValue="high">
        <SelectItem value="high">높음</SelectItem>
      </Select>
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
};

export const KeyboardSelect: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('combobox', { name: '우선순위' });
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(screen.getByRole('listbox')).toBeVisible());
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await waitFor(() => expect(trigger).toHaveTextContent('보통'));
  },
};
