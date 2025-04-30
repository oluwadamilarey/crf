export const BASE_URL = process.env.API_URL;

// METHODS CONSTANTS START
export const GET_METHOD = 'GET' as const;
export const POST_METHOD = 'POST' as const;
export const PUT_METHOD = 'PUT' as const;
export const DELETE_METHOD = 'DELETE' as const;
export const PATCH_METHOD = 'PATCH' as const;
// METHODS CONSTANTS END

// UNAUTHENTICATED GLOBAL API REDUCER PATH START
export const UNAUTHENTICATED_GLOBAL_API_REDUCER_PATH =
  'unauthenticated_global_api' as const;
// UNAUTHENTICATED GLOBAL API REDUCER PATH END

// AUTHENTICATED GLOBAL API REDUCER PATH START
export const AUTHENTICATED_GLOBAL_API_REDUCER_PATH =
  'authenticated_global_api' as const;
// AUTHENTICATED GLOBAL API REDUCER PATH END

export const SERVER_ACTION_TIMEOUT = 180000; // 3 minutes;

export const POLLING_INTERVAL_CONSTANT = 60000; // 1 minute;

export const DEFAULT_LIMIT_PER_PAGE = 10;

export const API_METHODS = [
  GET_METHOD,
  POST_METHOD,
  PUT_METHOD,
  DELETE_METHOD,
  PATCH_METHOD,
] as const;
