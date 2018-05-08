export class ResponsePagingWrapper<T> {
  total: number;
  rows: T[];

  constructor(total: number, rows: T[]) {
    this.total = total;
    this.rows = rows;
  };
}
