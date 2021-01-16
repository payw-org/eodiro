// Reference
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// Successfull
export const OK = 200

// Client errors
export const BAD_REQUEST = 400
export const UNAUTHORIZED = 401
export const FORBIDDEN = 403
export const NOT_FOUND = 404

// Server errors
export const INTERNAL_SERVER_ERROR = 500

export const statusCode = {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
}
