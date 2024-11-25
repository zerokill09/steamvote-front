export interface ListData<T> {
    content: T[];
    first: boolean;
    last: boolean;
    pageNumber: number;
    size: number;
    totalElements: number;
    totalPages: number;
  }