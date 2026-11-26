import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';

import { Button } from './button';
import { iconGlyphs } from './icon-glyphs';

const variants = ['primary', 'secondary', 'ghost', 'soft'] as const;
const sizes = ['md', 'lg'] as const;

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: '집중 시작', icon: 'play', variant: 'primary', size: 'md', onClick: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    size: { control: 'inline-radio', options: sizes },
    icon: { control: 'select', options: [undefined, ...Object.keys(iconGlyphs)] },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '- **primary**: 토마토 CTA. 화면당 1개만 쓴다.',
          '- **secondary**: 흰 바탕 보조 버튼. 기본값.',
          '- **ghost**: 텍스트형 버튼.',
          '- **soft**: 뉴모피즘. `bg-bg-soft` 쟁반 위에서만 쓴다.',
          '',
          '상태: 마우스를 올리면 Hover, 누르는 동안 Pressed, `disabled`면 Disabled, 키보드로 이동하면 포커스 링이 보인다.',
          '폭은 컴포넌트가 정하지 않는다. 늘려야 하면 호출부에서 `className="w-full"` 등을 준다.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-32 font-sans">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-16">
          <code className="text-caption text-text-secondary">size=&quot;{size}&quot;</code>
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
              <Button {...args} variant={variant} size={size} />
              <Button {...args} variant={variant} size={size} disabled />
              <Button {...args} variant={variant} size={size} icon={undefined} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '열 순서: 기본 · Disabled · 아이콘 없음. Hover·Pressed는 직접 올리거나 눌러서 확인한다.',
      },
    },
  },
};

export const AsLink: Story = {
  args: { variant: 'secondary', icon: 'calendar', asChild: true },
  render: (args) => (
    <Button {...args}>
      <a href="#calendar">캘린더로 이동</a>
    </Button>
  ),
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: '캘린더로 이동' });
    await expect(link).not.toHaveAttribute('type');
    await expect(link.querySelector('svg')).toBeInTheDocument();
  },
};

export const KeyboardFocus: Story = {
  play: async ({ canvas }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: '집중 시작' })).toHaveFocus();
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: '집중 시작' });
    await expect(button).toBeDisabled();
    await userEvent.click(button, { pointerEventsCheck: 0 });
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const DisabledLink: Story = {
  args: { variant: 'secondary', asChild: true, disabled: true },
  render: (args) => (
    <Button {...args}>
      <a href="#calendar">캘린더로 이동</a>
    </Button>
  ),
  play: async ({ args, canvas }) => {
    // 링크는 disabled 속성이 없으므로 aria-disabled + 탭 순서 제외 + 클릭 차단으로 막는다.
    const link = canvas.getByRole('link', { name: '캘린더로 이동' });
    await expect(link).toHaveAttribute('aria-disabled', 'true');
    await expect(link).toHaveAttribute('tabindex', '-1');
    await userEvent.click(link, { pointerEventsCheck: 0 });
    await expect(args.onClick).not.toHaveBeenCalled();
    await expect(window.location.hash).not.toBe('#calendar');
  },
};

export const AriaDisabled: Story = {
  args: { 'aria-disabled': true },
  play: async ({ args, canvas }) => {
    // aria-disabled는 포커스는 받지만 Enter·Space로도 실행되지 않는다.
    const button = canvas.getByRole('button', { name: '집중 시작' });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
