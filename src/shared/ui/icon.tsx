import type { SVGProps } from 'react';

import { cn } from '../lib/cn';
import { iconGlyphs, type IconName } from './icon-glyphs';

export type { IconName };

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  name: IconName;
};

// aria-label이 없으면 장식용으로 보고 보조 기술에서 숨긴다.
export function Icon({ name, className, 'aria-label': ariaLabel, ...props }: IconProps) {
  const labelled = Boolean(ariaLabel);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      focusable="false"
      role={labelled ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={labelled ? undefined : true}
      className={cn('size-24 shrink-0', className)}
      {...props}
    >
      {iconGlyphs[name]}
    </svg>
  );
}
