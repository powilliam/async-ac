export interface Pagination {
  page: number;
  nextPage?: number;
  previousPage?: number;
}
export interface PaginatedMembers {
  pagination: Pagination;
  members: string[];
}

export const MEMBERS = [
  "William",
  "Juliano",
  "Matheus",
  "Igão",
  "Italo",
  "Zaza",
  "Clebinho",
];

export const PAGINATED_MEMBERS: Record<number, PaginatedMembers> = {
  1: {
    pagination: { page: 1, nextPage: 2 },
    members: ["William", "Juliano", "Matheus", "Igão", "Italo"],
  },
  2: {
    pagination: { page: 2, previousPage: 1 },
    members: ["Zaza", "Clebinho"],
  },
};
