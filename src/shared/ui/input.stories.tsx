import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';

import { Input } from './input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    label: '닉네임',
    placeholder: '닉네임을 입력해 주세요',
    helper: '다른 사람에게 보이는 이름이에요',
    status: 'default',
  },
  argTypes: {
    status: { control: 'inline-radio', options: ['default', 'error', 'success'] },
  },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: [
          '라벨 · 입력칸 · 도움말로 된 텍스트 입력. 폭은 감싸는 쪽에서 정한다.',
          '- `status="error"`: 빨간 테두리, `helper`에 오류 문구, `aria-invalid`',
          '- `status="success"`: 초록 도움말',
          '- 포커스는 토마토 테두리, 값이 없으면 placeholder(text-muted)가 보인다.',
          '',
          '목록에서 고르는 입력은 `Select`를 쓴다.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-32">
      <Input {...args} />
      <Input {...args} defaultValue="토모" />
      <Input {...args} defaultValue="토모!" status="error" helper="한글·영문·숫자만 쓸 수 있어요" />
      <Input {...args} defaultValue="토모" status="success" helper="사용할 수 있는 닉네임이에요" />
      <Input {...args} defaultValue="토모" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '순서: 기본(placeholder) · 입력됨 · 오류 · 성공 · 비활성. 포커스는 직접 눌러서 확인한다.',
      },
    },
  },
};

export const TrailingIcon: Story = {
  args: { label: '예상 소요 시간', placeholder: '25', helper: undefined, trailingIcon: 'clock' },
};

export const Accessibility: Story = {
  args: { status: 'error', helper: '2자 이상 입력해 주세요', defaultValue: '토' },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('닉네임');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAccessibleDescription('2자 이상 입력해 주세요');
    await userEvent.click(input);
    await expect(input).toHaveFocus();
  },
};
