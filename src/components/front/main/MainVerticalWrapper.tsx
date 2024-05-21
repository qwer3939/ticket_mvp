"use client";

import { ScrollArea, Scrollbar } from "@radix-ui/react-scroll-area";
import { LIstItem, LIstItemSkeleton } from "../item/ListItem";

type FirstSectionProps = {
  items: {
    id: string;
    category: string;
    title: string;
    user_id: string;
    ticket_type: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export function MainVerticalWrapper({ items }: FirstSectionProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md overflow-x-auto">
      <div className="flex w-max gap-4">
        {items.map((item) => (
          <LIstItem key={item.id} item={item} className="min-w-[240px]" />
        ))}
      </div>
      <Scrollbar orientation="horizontal" />
    </ScrollArea>
  );
}

export function MainVerticalWrapperSkeleton() {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md overflow-x-auto">
      <div className="flex w-max gap-4">
        {[...Array(20)].map((_, i) => (
          <LIstItemSkeleton key={i} className="min-w-[240px]" />
        ))}
      </div>
      <Scrollbar orientation="horizontal" />
    </ScrollArea>
  );
}
