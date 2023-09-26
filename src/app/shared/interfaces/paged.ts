import { Tag } from '@features/articles/articles.store';

export interface PaginationParams {
  page: number;
  size: number;
  tagId?: Tag['id'];
}

export interface PaginationResponse<T> {
  page: number;
  size: number;
  sort: string[];
  totalElements: number;
  totalPages: number;
  content: T;
}
