import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { Avatar } from './avatar';

const sizes = ['sm', 'md', 'lg'] as const;

// 외부 이미지 없이 확인하려고 만든 단색 이미지
const sampleImage =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" fill="#86b06c"/><circle cx="48" cy="40" r="18" fill="#eef4ea"/><rect x="20" y="64" width="56" height="40" rx="28" fill="#eef4ea"/></svg>',
  );

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: { name: '토모', size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: sizes },
  },
  parameters: {
    docs: {
      description: {
        component:
          '프로필 이미지. `src`가 없거나 이미지를 불러오지 못하면 닉네임(`name`) 첫 글자를 보여 준다. 이미지 대체 텍스트와 이니셜의 읽기 이름은 `name`이다.',
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-24">
      {sizes.map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
      {sizes.map((size) => (
        <Avatar key={`img-${size}`} {...args} size={size} src={sampleImage} />
      ))}
    </div>
  ),
};

export const BrokenImage: Story = {
  args: { src: '/not-found.png', size: 'lg' },
  play: async ({ canvas }) => {
    await expect(await canvas.findByRole('img', { name: '토모' })).toHaveTextContent('토');
  },
};

export const WithImage: Story = {
  args: { src: sampleImage, size: 'lg' },
  play: async ({ canvas }) => {
    // 이미지를 불러오는 동안에는 이니셜이 먼저 보이므로, 이미지로 바뀔 때까지 기다린다.
    await waitFor(() => expect(canvas.getByRole('img', { name: '토모' }).tagName).toBe('IMG'));
  },
};
