"use client";

import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TicketIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import type { TicketItem } from "@/types/ticket";

type SellDetailProps = {
  item: TicketItem;
};

export function SellDetail({ item }: SellDetailProps) {
  const route = useRouter();
  return (
    <section>
      <section className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4 mb-12 lg:mb-16">
        <div className="col-span-12 md:col-span-8 lg:col-span-7">
          <div className="bg-primary/10 rounded">
            <div className="w-full h-full min-h-[240px] md:min-h-[360px] flex items-center justify-center">
              <TicketIcon className="w-[80px] h-[80px] group-hover:w-[90px] group-hover:h-[90px] transition-all" />
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 lg:col-span-5 flex flex-col ">
          <Heading type="h1">{item.title}</Heading>
          {/* <p>{item.ticket_type}</p> */}
          <p>{item.status}</p>
          <p>{item.user_id}</p>
        </div>
      </section>
      <Separator className="mb-12" />
      <section className="mb-12">
        <Heading type="h2">내용</Heading>
        <p>{item.description}</p>
      </section>
      <Separator className="mb-24" />
      <section className="flex items-center justify-center gap-4">
        <Button type="button" variant="default" onClick={() => alert("제가 살게요 액션!")}>
          제가 살게요!
        </Button>
        <Button type="button" variant="outline" onClick={() => route.back()}>
          뒤로
        </Button>
      </section>
    </section>
  );
}
