export const sanitizePoralId = (portalId: string) => {
  if (portalId.endsWith('@cau.ac.kr')) {
    return portalId
  }
  return `${portalId}@cau.ac.kr`
}
