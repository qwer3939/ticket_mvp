import { Suspense } from "react";
import { db } from "@/lib/kysely";

import Container from "@/layouts/Container";
import { getRange } from "@/lib/pagination";
import { Heading } from "@/components/Heading";
import { getTitle } from "@/lib/ticket";
import { capitalize } from "@/lib/string";
import { LIstItem, LIstItemSkeleton } from "@/components/front/item/ListItem";
import { Pagination } from "@/components/pagination";

interface CategorySellPageProps {
  params: {
    category: "all" | "concert" | "camping" | "fansign" | "restaurant" | "hotel";
  };
  searchParams: {
    status: "Available" | "Sold" | "Canceled" | "Expired";
    page?: number;
    limit?: number;
    // [key: string]: string | string[] | undefined
  };
}

export default async function CategorySellPage({ params, searchParams }: CategorySellPageProps) {
  return (
    <Container type="main" subType="section">
      <Heading type="h1">판매해요 - {getTitle(params.category)}</Heading>
      <Suspense fallback={<CategorySellListSkeleton />}>
        <CategorySellList params={params} searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}

async function CategorySellList({ params, searchParams }: CategorySellPageProps) {
  let countQuery = db.selectFrom("Ticket").select((eb) => eb.fn.count<number>("id").as("count"));
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
  query = query.where("Ticket.ticket_type", "=", "sell");
  countQuery = countQuery.where("Ticket.ticket_type", "=", "sell");
  if (searchParams.status) {
    query = query.where("Ticket.status", "=", searchParams.status);
    countQuery = countQuery.where("Ticket.status", "=", searchParams.status);
  }
  if (params.category !== "all") {
    query = query.where("Ticket.category", "=", capitalize(params.category));
    countQuery = countQuery.where("Ticket.category", "=", capitalize(params.category));
  }
  const limit = searchParams.limit || 20;
  const page = searchParams.page || 1;
  const { from, to } = getRange(page, limit);
  query = query.offset(from).limit(limit);
  const items = await query.execute();
  const countQueryResult = await countQuery.execute();
  const totalCount = countQueryResult[0].count;
  const randomDelay = [1000, 1500, 2000][Math.floor(Math.random() * 3)];
  await new Promise((resolve) => setTimeout(resolve, randomDelay));

  return (
    <>
      <section className="grid grid-cols-12 gap-4">
        {items.map((item) => (
          <LIstItem key={item.id} item={item} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" />
        ))}
      </section>
      <div className="my-16">
        <Pagination total={totalCount} page={page} limit={limit} />
      </div>
    </>
  );
}

async function CategorySellListSkeleton() {
  return (
    <section className="grid grid-cols-12 gap-4">
      {[...Array(20)].map((_, i) => (
        <LIstItemSkeleton key={i} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" />
      ))}
    </section>
  );
}
