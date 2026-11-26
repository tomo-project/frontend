import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';

import { Checkbox } from './checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { shape: 'square', 'aria-label': '이용약관 동의' },
  argTypes: {
    shape: { control: 'inline-radio', options: ['circle', 'square'] },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '- **circle** (22px): To-do 완료',
          '- **square** (20px): 약관·동의',
          '',
          '라벨은 바깥에 둔다. `<label>`로 감싸거나 `aria-label`을 준다. 누를 수 있는 영역은 44px로 넓혀져 있다.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      {(['circle', 'square'] as const).map((shape) => (
        <div key={shape} className="flex items-center gap-32">
          <code className="w-[64px] text-caption text-text-secondary">{shape}</code>
          <Checkbox shape={shape} aria-label="꺼짐" />
          <Checkbox shape={shape} aria-label="켜짐" defaultChecked />
          <Checkbox shape={shape} aria-label="비활성" disabled />
          <Checkbox shape={shape} aria-label="비활성 켜짐" disabled defaultChecked />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: { description: { story: '순서: 꺼짐 · 켜짐 · 비활성 · 비활성+켜짐' } },
  },
};

export const WithLabel: Story = {
  render: () => (
    <label className="flex cursor-pointer items-center gap-12 text-label text-text-primary">
      <Checkbox />
      [필수] 이용약관에 동의해요
    </label>
  ),
  play: async ({ canvas }) => {
    const box = canvas.getByRole('checkbox', { name: '[필수] 이용약관에 동의해요' });
    await userEvent.click(canvas.getByText('[필수] 이용약관에 동의해요'));
    await expect(box).toBeChecked();
    await userEvent.keyboard(' ');
    await expect(box).not.toBeChecked();
  },
};
