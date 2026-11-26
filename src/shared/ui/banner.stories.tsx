import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';

import { Banner } from './banner';
import { iconGlyphs } from './icon-glyphs';

const message = '연결이 끊어졌어요. 4:32 안에 다시 연결되면 집중을 이어갈 수 있어요.';

const meta = {
  title: 'Components/Banner',
  component: Banner,
  args: { tone: 'warning', icon: 'wifi-off', children: message },
  argTypes: {
    tone: { control: 'inline-radio', options: ['warning', 'danger', 'info'] },
    icon: { control: 'select', options: Object.keys(iconGlyphs) },
  },
  decorators: [
    (Story) => (
      <div className="w-[560px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: [
          '화면 안에 고정해서 보여 주는 안내(세션 복구·오류). 폭은 감싸는 쪽을 따른다.',
          '- `tone`: warning · danger · info. danger는 `role="alert"`로 바로 읽히고, 나머지는 `role="status"`.',
          '- `icon`: 기본 info. 상황에 맞게 바꾼다(연결 끊김은 wifi-off).',
          '- `action`: 오른쪽 액션 자리(예: 다시 시도). `onClose`를 주면 닫기 버튼이 생긴다.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      <Banner tone="warning" icon="wifi-off">
        {message}
      </Banner>
      <Banner tone="danger">저장하지 못했어요. 잠시 후 다시 시도해 주세요.</Banner>
      <Banner tone="info">오늘은 아직 집중 기록이 없어요.</Banner>
    </div>
  ),
};

export const WithActionAndClose: Story = {
  args: {
    tone: 'danger',
    icon: 'info',
    children: '기록을 불러오지 못했어요.',
    onClose: fn(),
    action: (
      <button
        type="button"
        className="shrink-0 cursor-pointer text-label-bold underline underline-offset-2"
      >
        다시 시도
      </button>
    ),
  },
  play: async ({ args, canvas }) => {
    await expect(canvas.getByRole('alert')).toHaveTextContent('기록을 불러오지 못했어요.');
    await expect(canvas.getByRole('button', { name: '다시 시도' })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: '닫기' }));
    await expect(args.onClose).toHaveBeenCalledTimes(1);
  },
};
