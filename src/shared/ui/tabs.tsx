import { Tabs as TabsPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../lib/cn';

export type TabsProps = ComponentProps<typeof TabsPrimitive.Root>;

export function Tabs(props: TabsProps) {
  return <TabsPrimitive.Root {...props} />;
}

export type TabListProps = ComponentProps<typeof TabsPrimitive.List>;

export function TabList({ className, ...props }: TabListProps) {
  return (
    <TabsPrimitive.List
      className={cn('flex items-end gap-24 border-b border-border-subtle', className)}
      {...props}
    />
  );
}

export type TabItemProps = ComponentProps<typeof TabsPrimitive.Trigger>;

export function TabItem({ className, ...props }: TabItemProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'inline-flex h-48 shrink-0 cursor-pointer items-center border-b-2 border-transparent px-4 whitespace-nowrap transition-colors',
        'text-body text-text-secondary hover:text-text-primary',
        'data-[state=active]:border-border-focus data-[state=active]:text-body-bold data-[state=active]:text-text-primary',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
        className,
      )}
      {...props}
    />
  );
}

export type TabPanelProps = ComponentProps<typeof TabsPrimitive.Content>;

export function TabPanel({ className, ...props }: TabPanelProps) {
  return (
    <TabsPrimitive.Content
      className={cn(
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
        className,
      )}
      {...props}
    />
  );
}
