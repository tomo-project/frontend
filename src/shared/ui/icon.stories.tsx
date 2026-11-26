import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Icon } from './icon';
import { iconGlyphs, type IconName } from './icon-glyphs';

const iconNames = Object.keys(iconGlyphs) as IconName[];

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: { name: 'bell' },
  argTypes: {
    name: { control: 'select', options: iconNames },
  },
  parameters: {
    docs: {
      description: {
        component:
          '24px 라인 아이콘. 색은 `currentColor`를 따르므로 부모나 `className`의 `text-*`로 바꾼다. `aria-label`이 없으면 장식용으로 보고 `aria-hidden` 처리한다.',
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-16 font-sans text-text-primary">
      {iconNames.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center gap-8 rounded-md border border-border-subtle p-16"
        >
          <Icon name={name} />
          <code className="text-caption text-text-secondary">{name}</code>
        </div>
      ))}
    </div>
  ),
};

export const Color: Story = {
  render: () => (
    <div className="flex gap-24 font-sans">
      {[
        ['text-text-primary', 'text-primary'],
        ['text-text-secondary', 'text-secondary'],
        ['text-text-muted', 'text-muted'],
        ['text-text-disabled', 'text-disabled'],
        ['text-accent-tomato', 'accent-tomato'],
        ['text-status-done', 'status-done'],
      ].map(([cls, label]) => (
        <div key={cls} className={`flex flex-col items-center gap-8 ${cls}`}>
          <Icon name="flame" />
          <code className="text-caption text-text-secondary">{label}</code>
        </div>
      ))}
    </div>
  ),
};

export const Decorative: Story = {
  args: { name: 'clock' },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg');
    await expect(svg).toHaveAttribute('aria-hidden', 'true');
    await expect(svg).not.toHaveAttribute('role');
  },
};

export const Labelled: Story = {
  args: { name: 'wifi-off', 'aria-label': '오프라인' },
  play: async ({ canvas }) => {
    const svg = canvas.getByRole('img', { name: '오프라인' });
    await expect(svg).not.toHaveAttribute('aria-hidden');
  },
};
