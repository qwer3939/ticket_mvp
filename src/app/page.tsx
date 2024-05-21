import { Suspense } from "react";
import { db } from "@/lib/kysely";

import Container from "@/layouts/Container";

import { Link } from "@/components/ui/link";
import { Skeleton } from "@/components/ui/skeleton";

import { MainCarousel } from "@/components/front/main/Carousel";
import { MainBanners } from "@/components/front/main/Banners";

import { MainVerticalWrapper, MainVerticalWrapperSkeleton } from "@/components/front/main/MainVerticalWrapper";

export default function Home() {
  return (
    <Container type="main" subType="section">
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-12 lg:mb-16 ">
        <MainCarousel className="md:col-span-2 lg:col-span-2" />
        <MainBanners className="" />
      </section>
      <section className="mb-12 lg:mb-16">
        <Suspense fallback={<TicketSectionSkeleton />}>
          <TicketSection title="급하게 구해요!!" ticketType="buy" ticketStatus="Available" href="/all/buy" />
        </Suspense>
      </section>
      <section className="mb-12 lg:mb-16">
        <Suspense fallback={<TicketSectionSkeleton />}>
          <TicketSection
            title="콘서트 티켓 양도해요"
            ticketType="sell"
            category="Concert"
            ticketStatus="Available"
            href="/concert/sell"
          />
        </Suspense>
      </section>
      <section className="mb-12 lg:mb-16">
        <Suspense fallback={<TicketSectionSkeleton />}>
          <TicketSection
            title="팬싸인회 티켓 양도해요"
            ticketType="sell"
            category="Fansign"
            ticketStatus="Available"
            href="/fansign/sell"
          />
        </Suspense>
      </section>
      <section className="mb-12 lg:mb-16">
        <Suspense fallback={<TicketSectionSkeleton />}>
          <TicketSection
            title="캠핑장 티켓 양도해요"
            ticketType="sell"
            category="Camping"
            ticketStatus="Available"
            href="/camping/sell"
          />
        </Suspense>
      </section>
      <section className="mb-12 lg:mb-16">
        <Suspense fallback={<TicketSectionSkeleton />}>
          <TicketSection
            title="식당 상품권 양도해요"
            ticketType="sell"
            category="Restaurant"
            ticketStatus="Available"
            href="/restaurant/sell"
          />
        </Suspense>
      </section>
      <section className="mb-12 lg:mb-16">
        <Suspense fallback={<TicketSectionSkeleton />}>
          <TicketSection
            title="호텔 숙박권 양도해요"
            ticketType="sell"
            category="Hotel"
            ticketStatus="Available"
            href="/hotel/sell"
          />
        </Suspense>
      </section>
    </Container>
  );
}

type TicketSectionProps = {
  category?: "Concert" | "Camping" | "Fansign" | "Restaurant" | "Hotel";
  ticketType: "buy" | "sell";
  ticketStatus: "Available" | "Sold" | "Canceled" | "Expired";
  title: string;
  limit?: number;
  href?: string;
};

async function TicketSection({
  category,
  ticketType,
  limit = 20,
  title,
  ticketStatus,
  href = "#",
}: TicketSectionProps) {
  let query = db
    .selectFrom("Ticket")
    .select([
      "Ticket.id",
      "Ticket.title",
      "Ticket.createdAt",
      "Ticket.status",
      "Ticket.ticket_type",
      "Ticket.user_id",
      "Ticket.category",
      "Ticket.updatedAt",
    ]);
  query = query.where("Ticket.ticket_type", "=", ticketType);
  query = query.where("Ticket.status", "=", ticketStatus);
  if (category) {
    query = query.where("Ticket.category", "=", category);
  }
  query = query.limit(limit);
  const items = await query.execute();
  const randomDelay = [250, 500, 750, 1000, 1500][Math.floor(Math.random() * 5)];
  await new Promise((resolve) => setTimeout(resolve, randomDelay));
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link className="text-primary" href={href}>
          더 보기
        </Link>
      </div>
      <MainVerticalWrapper items={items} />
    </>
  );
}

async function TicketSectionSkeleton() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="w-60 h-6" />
        <Skeleton className="w-16 h-5" />
      </div>
      <MainVerticalWrapperSkeleton />
    </>
  );
}
