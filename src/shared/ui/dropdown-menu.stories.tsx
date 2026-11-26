import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, screen, userEvent, waitFor } from 'storybook/test';

import { Badge } from './badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuSeparator,
} from './dropdown-menu';
import { IconButton } from './icon-button';

const meta = {
  title: 'Components/DropdownMenu',
  component: MenuItem,
  args: { onSelect: fn() },
  parameters: {
    docs: {
      description: {
        component: [
          '드롭다운 메뉴(Radix DropdownMenu). `DropdownMenu` · `DropdownMenuTrigger` · `DropdownMenuContent` 안에 `MenuItem`을 둔다.',
          '- `MenuItem`: 마우스를 올리거나 방향키로 이동하면 연한 토마토. `icon`은 왼쪽 18px 아이콘, `meta`는 오른쪽 정보(배지·시간 등).',
          '- `tone="danger"`: 삭제·탈퇴처럼 되돌리기 어려운 동작.',
          '- `MenuLabel`은 묶음 제목, `MenuSeparator`는 구분선.',
          '',
          '폭은 내용에 맞춰지고, 고정하려면 `DropdownMenuContent`에 `className`으로 준다. ESC로 닫히고 포커스는 연 버튼으로 돌아간다.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ItemActions: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton icon="more" aria-label="할 일 메뉴" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        <MenuItem icon="edit" onSelect={args.onSelect}>
          수정하기
        </MenuItem>
        <MenuItem icon="play">이 할 일로 집중 시작</MenuItem>
        <MenuSeparator />
        <MenuItem icon="trash" tone="danger">
          삭제하기
        </MenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const TodoPicker: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <IconButton icon="list" aria-label="할 일 고르기" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[440px]">
        <MenuGroup>
          <MenuLabel>오늘 마감</MenuLabel>
          <MenuItem
            meta={
              <>
                <Badge>디자인</Badge>25분
              </>
            }
          >
            홈 화면 와이어프레임 다듬기
          </MenuItem>
          <MenuItem
            meta={
              <>
                <Badge>개발</Badge>25분
              </>
            }
          >
            컴포넌트 상태 정리
          </MenuItem>
        </MenuGroup>
        <MenuGroup>
          <MenuLabel>예정</MenuLabel>
          <MenuItem
            meta={
              <>
                <Badge>토익</Badge>11/26
              </>
            }
          >
            토익 RC 파트 5 풀기
          </MenuItem>
        </MenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  parameters: { docs: { story: { inline: false, iframeHeight: 320 } } },
};

export const KeyboardSelect: Story = {
  render: ItemActions.render,
  play: async ({ args, canvas }) => {
    const trigger = canvas.getByRole('button', { name: '할 일 메뉴' });
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    const menu = await screen.findByRole('menu');
    await waitFor(() => expect(screen.getByRole('menuitem', { name: '수정하기' })).toHaveFocus());
    await userEvent.keyboard('{ArrowDown}');
    await expect(screen.getByRole('menuitem', { name: '이 할 일로 집중 시작' })).toHaveFocus();
    await userEvent.keyboard('{ArrowUp}{Enter}');
    await expect(args.onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(menu).not.toBeInTheDocument());
    await expect(trigger).toHaveFocus();
  },
};
