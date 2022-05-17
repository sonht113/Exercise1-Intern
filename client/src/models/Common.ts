export interface PaginationParam {
    page: number;
    limit: number;
}

export interface ListResponse<T> {
    products: T[];
    pagination: PaginationParam;
}