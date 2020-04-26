export function isClient(): boolean {
  try {
    window.localStorage.getItem('')
    return true
  } catch (error) {
    return false
  }
}
