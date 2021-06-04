export interface Pagination {
  page?: number;
  totalResults?: number;
  size?: number;
}

export interface PaginationFilter {
  page: number;
  size: number;
}

export const defaultPagination: Pagination = {};

export const defaultPaginationFilter: PaginationFilter = {
  page: 0,
  size: 10,
};
