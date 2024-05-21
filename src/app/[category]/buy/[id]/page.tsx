import { db } from "@/lib/kysely";

import Container from "@/layouts/Container";
import { BuyDetail } from "@/components/front/item/BuyDetail";

interface ItemPageProps {
  params: {
    category: string;
    id: string;
  };
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { category, id } = params;
  const item = await db.selectFrom("Ticket").selectAll().where("Ticket.id", "=", id).execute();

  return (
    <Container type="main" subType="section">
      <BuyDetail item={item[0]} />
    </Container>
  );
}
