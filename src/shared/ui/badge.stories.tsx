import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './badge';

const tones = ['neutral', 'tomato', 'success', 'warning'] as const;

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: '디자인', tone: 'neutral' },
  argTypes: {
    tone: { control: 'inline-radio', options: tones },
  },
  parameters: {
    docs: {
      description: {
        component:
          '카테고리·결과(완료/중단)·상태를 보여 주는 읽기 전용 표시. 누를 수 있는 선택지는 `Chip`을 쓴다.',
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-12">
      <Badge tone="neutral">디자인</Badge>
      <Badge tone="tomato">진행 중</Badge>
      <Badge tone="success">완료</Badge>
      <Badge tone="warning">중단</Badge>
    </div>
  ),
};
