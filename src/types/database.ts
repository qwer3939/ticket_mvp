import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Ticket = {
    id: string;
    user_id: string;
    ticket_type: string;
    category: string;
    title: string;
    description: string;
    status: string;
    image_url: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type DB = {
    Ticket: Ticket;
};
