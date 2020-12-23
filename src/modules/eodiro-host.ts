export const eodiroHost =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3020'
    : 'https://eodiro.com'
