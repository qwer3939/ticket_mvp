import { Suspense } from "react";
import { db } from "@/lib/kysely";

import Container from "@/layouts/Container";

import { Link } from "@/components/ui/link";
import { Skeleton } from "@/components/ui/skeleton";

import { MainCarousel } from "@/components/front/main/Carousel";
import { MainBanners } from "@/components/front/main/Banners";

import { MainVerticalWrapper, MainVerticalWrapperSkeleton } from "@/components/front/main/MainVerticalWrapper";
import { ItemForm } from "@/components/front/item/form";
import { TicketItem } from "@/types/ticket";
import { Heading } from "@/components/Heading";

interface TicketItemPageProps {
  params: {
    ticket_id: string;
  };
}

export default async function TicketItemPage({ params }: TicketItemPageProps) {
  const { ticket_id } = params;

  let formType: "new" | "edit" = "edit";
  let item: TicketItem | undefined;
  if (ticket_id === "new") {
    formType = "new";
  } else {
    const itemResult = await db.selectFrom("Ticket").selectAll().where("Ticket.id", "=", ticket_id).execute();
    item = itemResult[0];
  }

  return (
    <Container type="main" subType="section">
      <Heading type="h1" className="mb-4" decoration="underline">
        {formType === "new" ? "등록" : "수정"}
      </Heading>
      {formType === "new" ? <ItemForm type="new" /> : <ItemForm type="edit" item={item as TicketItem} />}
    </Container>
  );
}
