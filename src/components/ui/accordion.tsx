import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
interface AccordionItem {
  title: string;
  content: string;
}
interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}
export function Accordion({
  items,
  allowMultiple = false,
  className
}: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ?
          prev.filter((i) => i !== index) :
          [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => prev.includes(index) ? [] : [index]);
    }
  };
  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div
            key={index}
            className="border rounded-lg overflow-hidden bg-card">

            <button
              onClick={() => toggleItem(index)}
              className="flex w-full items-center justify-between px-4 py-4 text-left font-medium transition-all hover:bg-muted/50">

              <span className="text-sm md:text-base">{item.title}</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground',
                  isOpen && 'rotate-180'
                )} />

            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}>

              <div className="px-4 pb-4 pt-0 text-sm text-muted-foreground border-t bg-muted/20">
                <div className="pt-4">{item.content}</div>
              </div>
            </div>
          </div>);

      })}
    </div>);

}