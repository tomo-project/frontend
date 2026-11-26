import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Button } from './button';
import { Card, CardAction, CardHeader } from './card';
import { EmptyState } from './empty-state';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: [
          '흰 바탕 위 플랫 정보 카드. 바탕·테두리·모서리(24)·카드 그림자·여백 32를 정한다.',
          '안쪽 간격과 위아래 여백은 화면마다 달라서 호출부에서 준다(예: `gap-8`, `gap-16`, `py-24`). 폭도 감싸는 레이아웃에서 정한다.',
          '',
          '`CardHeader`: 제목(H3) + 오른쪽 `action`. 보조 링크는 `CardAction`(마우스를 올리면 진해짐, 라우터 링크는 `asChild`)을 쓴다.',
          '뉴모피즘 조작부는 카드가 아니라 `bg-bg-soft` 쟁반 위에 둔다.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHeader: Story = {
  render: () => (
    <Card className="w-[564px] gap-8">
      <CardHeader title="오늘의 To-do" action={<CardAction href="#todo">전체 보기</CardAction>} />
      <p className="text-label text-text-secondary">카드 내용</p>
    </Card>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 2, name: '오늘의 To-do' })).toBeVisible();
    await expect(canvas.getByRole('link', { name: '전체 보기' })).toBeVisible();
  },
};

export const HomeTodoEmpty: Story = {
  render: () => (
    <Card className="w-[564px] gap-8">
      <CardHeader title="오늘의 To-do" action={<CardAction href="#todo">전체 보기</CardAction>} />
      <EmptyState
        icon="check-square"
        title="오늘 할 일이 없어요"
        description="할 일을 등록하고 집중을 시작해 보세요."
        action={
          <Button variant="primary" icon="plus">
            To-do 등록
          </Button>
        }
      />
    </Card>
  ),
  parameters: {
    docs: { description: { story: '홈 대시보드 "오늘의 To-do" 카드에 빈 상태를 넣은 조합 예시.' } },
  },
};
