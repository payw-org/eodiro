/**
 * @param {number} ms
 */
export default function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
