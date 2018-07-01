export interface PagedList<T> {
  skip: number;
  take: number;
  more: boolean;
  data: T[];
}
