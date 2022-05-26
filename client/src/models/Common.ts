export interface PaginationParam {
    page: number;
    limit: number;
    totalPage: number;
}

export interface ListResponse<T> {
    products: T[];
    pagination: PaginationParam;
}
