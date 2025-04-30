export type INetworkErrorResponse = {
  status: number;
  message: string;
  data: null;
};

export type INetworkSuccessResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export type IPaginatedResponse<T> = {
  data: { count: number; page: number; totalPages: number; data: T[] };
};
