import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './button';
import { EmptyState } from './empty-state';
import { iconGlyphs } from './icon-glyphs';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  args: {
    icon: 'calendar',
    title: '이 날 마감인 To-do가 없어요',
    description: '할 일을 등록하면 캘린더와 홈에서 바로 볼 수 있어요.',
    action: (
      <Button variant="primary" icon="plus">
        To-do 등록
      </Button>
    ),
  },
  argTypes: {
    icon: { control: 'select', options: Object.keys(iconGlyphs) },
    action: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          '데이터가 없을 때 보여 주는 빈 상태. 사과 대신 다음 행동을 안내한다. 아이콘 · 제목 · 설명(선택) · 행동 버튼(선택)으로 된다. 폭은 감싸는 쪽을 따른다.',
      },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithoutAction: Story = {
  args: {
    icon: 'clock',
    title: '아직 집중 기록이 없어요',
    description: '첫 집중을 마치면 여기에 기록이 쌓여요.',
    action: undefined,
  },
};
