import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor } from 'storybook/test';

import { Button } from './button';
import { toast } from './toast';
import { Toaster } from './toaster';

const meta = {
  title: 'Components/Toast',
  component: Toaster,
  decorators: [
    (Story) => (
      <div className="h-[320px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          '짧은 완료 알림(sonner). 앱 최상단에 `<Toaster />`를 한 번 두고, 어디서든 `toast("회고를 저장했어요")`를 부른다.',
          '- 기본 아이콘은 체크. 실패 안내는 `toast("…다시 시도해 주세요", { icon: "info" })`.',
          '- 화면 아래 가운데에 뜨고 2초 뒤 사라진다. 보조 기술에는 polite로 읽힌다.',
          '- 정책상 집중 세션 중에는 띄우지 않는다(호출부에서 막는다).',
          '- 버튼이 있는 알림 카드(AlertToast)는 B-3 알림에서 따로 만든다.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="flex gap-12 p-24">
      <Toaster {...args} />
      <Button onClick={() => toast('회고를 저장했어요')}>완료 알림</Button>
      <Button
        onClick={() =>
          toast('카카오 로그인을 마치지 못했어요. 다시 시도해 주세요', { icon: 'info' })
        }
      >
        실패 안내
      </Button>
    </div>
  ),
};

export const ShowsAndHides: Story = {
  render: Playground.render,
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: '완료 알림' }));
    // sonner가 나타나는 동안 내용을 다시 그리므로, 찾은 요소를 들고 있지 않고 매번 새로 찾는다.
    await waitFor(() => expect(screen.getByText('회고를 저장했어요')).toBeVisible());
    await waitFor(() => expect(screen.queryByText('회고를 저장했어요')).not.toBeInTheDocument(), {
      timeout: 4000,
    });
  },
};
