export interface PaginationParams {
  page: number;
  size: number;
}

export interface PaginationResponse<T> {
  page: number;
  size: number;
  sort: string[];
  totalElements: number;
  totalPages: number;
  content: T;
}
