import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';

import { Chip, ChipGroup } from './chip';

const distractions = [
  '스마트폰·SNS',
  '주변 소음',
  '피로·졸림',
  '다른 생각·걱정',
  '사람의 방해',
  '기타',
];

const meta = {
  title: 'Components/Chip',
  component: ChipGroup,
  parameters: {
    docs: {
      description: {
        component: [
          '선택형 칩. `ChipGroup`(Radix ToggleGroup)으로 감싸서 쓴다.',
          '- `type="single"`: 하나만 선택(집중도 점수 등)',
          '- `type="multiple"`: 여러 개 선택(방해요소 등)',
          '',
          '그룹에는 `aria-label`로 무엇을 고르는지 적는다. 칩 사이로는 방향키로 이동하고 Space·Enter로 선택한다.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof ChipGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: { type: 'single', defaultValue: '3', 'aria-label': '집중도' },
  render: (args) => (
    <ChipGroup {...args}>
      {['1', '2', '3', '4', '5'].map((score) => (
        <Chip key={score} value={score}>
          {score}점
        </Chip>
      ))}
    </ChipGroup>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText('5점'));
    await expect(canvas.getByText('5점')).toHaveAttribute('data-state', 'on');
    await expect(canvas.getByText('3점')).toHaveAttribute('data-state', 'off');
  },
};

export const Multiple: Story = {
  args: { type: 'multiple', defaultValue: ['스마트폰·SNS'], 'aria-label': '방해요소' },
  render: (args) => (
    <ChipGroup {...args} className="max-w-[480px]">
      {distractions.map((label) => (
        <Chip key={label} value={label}>
          {label}
        </Chip>
      ))}
    </ChipGroup>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText('피로·졸림'));
    await expect(canvas.getByText('스마트폰·SNS')).toHaveAttribute('aria-pressed', 'true');
    await expect(canvas.getByText('피로·졸림')).toHaveAttribute('aria-pressed', 'true');
  },
};

export const KeyboardNavigation: Story = {
  args: { type: 'multiple', 'aria-label': '방해요소' },
  render: Multiple.render,
  play: async ({ canvas }) => {
    await userEvent.tab();
    await expect(canvas.getByText('스마트폰·SNS')).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByText('주변 소음')).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(canvas.getByText('주변 소음')).toHaveAttribute('aria-pressed', 'true');
  },
};
