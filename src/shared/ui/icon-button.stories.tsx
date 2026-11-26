import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';

import { IconButton } from './icon-button';
import { iconGlyphs } from './icon-glyphs';

const variants = ['ghost', 'secondary', 'soft'] as const;

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: { icon: 'plus', 'aria-label': '추가', variant: 'ghost', onClick: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    icon: { control: 'select', options: Object.keys(iconGlyphs) },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '40px 원형 아이콘 버튼. `aria-label`은 필수다.',
          '- **ghost**: 흰 바탕(헤더 등). 기본값.',
          '- **secondary**: 테두리가 있는 보조 버튼.',
          '- **soft**: `bg-bg-soft` 쟁반 위(스테퍼 등).',
          '',
          '`dot`은 안 읽음 표시다. 점은 보조 기술에 읽히지 않으므로 `aria-label`에 상태를 함께 적는다(예: "알림, 새 알림 있음").',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-16 font-sans">
      {variants.map((variant) => (
        <div
          key={variant}
          className={
            variant === 'soft'
              ? 'flex items-center gap-24 rounded-2xl bg-bg-soft p-24'
              : 'flex items-center gap-24 px-24'
          }
        >
          <code className="w-[96px] text-caption text-text-secondary">{variant}</code>
          <IconButton {...args} variant={variant} />
          <IconButton {...args} variant={variant} disabled />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '열 순서: 기본 · Disabled. Hover·Pressed는 직접 올리거나 눌러서 확인한다.',
      },
    },
  },
};

export const WithDot: Story = {
  args: { icon: 'bell', 'aria-label': '알림, 새 알림 있음', dot: true },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: '알림, 새 알림 있음' });
    // 점은 장식이라 보조 기술에서는 숨기고, 화면에는 보여야 한다.
    const dot = button.querySelector('span[aria-hidden]');
    await expect(dot).toBeInTheDocument();
    await expect(dot).toBeVisible();
  },
};

export const KeyboardFocus: Story = {
  play: async ({ canvas }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: '추가' })).toHaveFocus();
  },
};
