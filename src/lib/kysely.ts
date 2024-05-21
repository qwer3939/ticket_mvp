import { Generated, ColumnType } from "kysely";
import { createKysely } from "@vercel/postgres-kysely";
import type { DB } from "@/types/database";

export const db = createKysely<DB>();
export { sql } from "kysely";
