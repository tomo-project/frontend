import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controller, useForm } from 'react-hook-form';
import { expect, fn, userEvent, waitFor } from 'storybook/test';
import { z } from 'zod';

import { Button } from './button';
import { Checkbox } from './checkbox';
import { Input } from './input';
import { Select, SelectItem } from './select';
import { Toggle } from './toggle';

// 닉네임 규칙은 서비스 정책(2~12자, 완성형 한글·영문·숫자)을 따른다.
// 금칙어·중복 검사는 서버가 한다.
const profileSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(2, '2자 이상 입력해 주세요')
    .max(12, '12자 이하로 입력해 주세요')
    .regex(/^[가-힣A-Za-z0-9]+$/, '한글·영문·숫자만 쓸 수 있어요'),
  priority: z.string().min(1, '우선순위를 골라 주세요'),
  notify: z.boolean(),
  terms: z.literal(true, { error: '이용약관에 동의해 주세요' }),
});

type ProfileForm = z.input<typeof profileSchema>;

function ProfileFormExample({ onSubmit }: { onSubmit: (values: ProfileForm) => void }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: { nickname: '', priority: '', notify: true, terms: false as true },
  });

  const nicknameOk = dirtyFields.nickname && !errors.nickname;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex w-[360px] flex-col gap-24">
      <Input
        label="닉네임"
        placeholder="닉네임을 입력해 주세요"
        status={errors.nickname ? 'error' : nicknameOk ? 'success' : 'default'}
        helper={
          errors.nickname?.message ??
          (nicknameOk ? '사용할 수 있는 형식이에요' : '다른 사람에게 보이는 이름이에요')
        }
        {...register('nickname')}
      />
      <Controller
        control={control}
        name="priority"
        render={({ field, fieldState }) => (
          <Select
            label="우선순위"
            placeholder="선택해 주세요"
            value={field.value}
            onValueChange={field.onChange}
            name={field.name}
            status={fieldState.error ? 'error' : 'default'}
            helper={fieldState.error?.message}
          >
            <SelectItem value="high">높음</SelectItem>
            <SelectItem value="medium">보통</SelectItem>
            <SelectItem value="low">낮음</SelectItem>
          </Select>
        )}
      />
      <Controller
        control={control}
        name="notify"
        render={({ field }) => (
          <label className="flex cursor-pointer items-center justify-between text-label text-text-primary">
            To-do 알림 받기
            <Toggle checked={field.value} onCheckedChange={field.onChange} />
          </label>
        )}
      />
      <Controller
        control={control}
        name="terms"
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-8">
            <label className="flex cursor-pointer items-center gap-12 text-label text-text-primary">
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                aria-invalid={fieldState.invalid || undefined}
              />
              [필수] 이용약관에 동의해요
            </label>
            {fieldState.error && (
              <p className="text-caption text-text-danger">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
        시작하기
      </Button>
    </form>
  );
}

const meta = {
  title: 'Examples/React Hook Form',
  component: ProfileFormExample,
  args: { onSubmit: fn() },
  parameters: {
    docs: {
      description: {
        component:
          'React Hook Form + Zod로 Input·Select·Toggle·Checkbox를 묶는 예제. 텍스트 입력은 `register`, Radix 기반 컴포넌트(Select·Toggle·Checkbox)는 `Controller`로 연결한다. 오류는 `status="error"`와 `helper`로 보여 준다.',
      },
    },
  },
} satisfies Meta<typeof ProfileFormExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ShowsErrors: Story = {
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: '시작하기' }));
    await expect(await canvas.findByText('2자 이상 입력해 주세요')).toBeVisible();
    await expect(canvas.getByText('우선순위를 골라 주세요')).toBeVisible();
    await expect(canvas.getByText('이용약관에 동의해 주세요')).toBeVisible();
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const Submits: Story = {
  play: async ({ args, canvas }) => {
    await userEvent.type(canvas.getByLabelText('닉네임'), '토모');
    await expect(await canvas.findByText('사용할 수 있는 형식이에요')).toBeVisible();
    canvas.getByRole('combobox', { name: '우선순위' }).focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await userEvent.click(canvas.getByRole('checkbox', { name: '[필수] 이용약관에 동의해요' }));
    await userEvent.click(canvas.getByRole('button', { name: '시작하기' }));
    await waitFor(() =>
      expect(args.onSubmit).toHaveBeenCalledWith(
        { nickname: '토모', priority: 'medium', notify: true, terms: true },
        expect.anything(),
      ),
    );
  },
};
