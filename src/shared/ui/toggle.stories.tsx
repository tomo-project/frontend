import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';

import { Toggle } from './toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  args: { 'aria-label': '알림 받기' },
  parameters: {
    docs: {
      description: {
        component:
          '즉시 적용되는 켜기/끄기(Radix Switch). 알림 수신 설정 등에 쓴다. 끌 수 없는 필수 시스템 알림은 `disabled`로 둔다. 라벨은 `<label>`로 감싸거나 `aria-label`을 준다.',
      },
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-24">
      <Toggle aria-label="켜짐" defaultChecked />
      <Toggle aria-label="꺼짐" />
      <Toggle aria-label="비활성" disabled />
      <Toggle aria-label="비활성 켜짐" disabled defaultChecked />
    </div>
  ),
  parameters: {
    docs: { description: { story: '순서: 켜짐 · 꺼짐 · 비활성 · 비활성+켜짐' } },
  },
};

export const WithLabel: Story = {
  render: () => (
    <label className="flex w-[320px] cursor-pointer items-center justify-between text-label text-text-primary">
      To-do 알림
      <Toggle />
    </label>
  ),
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole('switch', { name: 'To-do 알림' });
    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
    await userEvent.keyboard(' ');
    await expect(toggle).not.toBeChecked();
  },
};
