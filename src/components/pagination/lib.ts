export { getRange } from "@/lib/pagination";

// export const getPaginationRange = (page: number, limit: number = 10) => {
//   limit = limit ? +limit : 3;
//   const from = page ? (page - 1) * limit : 0;
//   const to = page ? from + limit - 1 : limit - 1;

//   return { from, to };
// };

// export const getPagination = (page, size) => {
//   const limit = size ? +size : 3;
//   const from = page ? page * limit : 0;
//   const to = page ? from + size : size;

//   return { from, to };
// };
