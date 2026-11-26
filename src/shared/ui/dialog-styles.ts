// 오버레이가 대화상자를 감싸 가운데 정렬한다(Radix의 스크롤 가능한 오버레이 패턴).
export const dialogOverlayClass =
  'fixed inset-0 z-50 flex items-center justify-center bg-bg-overlay p-16';

export const dialogContentClass =
  'flex max-h-full w-full max-w-[440px] flex-col gap-24 overflow-y-auto rounded-2xl bg-bg-card p-32 shadow-dialog outline-none';

export const dialogHeaderClass = 'flex flex-col gap-8';

export const dialogTitleClass = 'text-heading-3 text-text-primary';

export const dialogDescriptionClass = 'text-label text-text-secondary';

export const dialogActionsClass = 'flex justify-end gap-8';
