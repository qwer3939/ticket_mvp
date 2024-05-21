export type TicketItem = {
  id: string;
  user_id: string;
  ticket_type: string;
  category: string;
  title: string;
  description: string;
  image_url?: string | null;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
};
