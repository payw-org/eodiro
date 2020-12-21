export const sanitizePoralId = (portalId: string) => {
  const trimmedPortalId = portalId.trim()

  if (portalId.endsWith('@cau.ac.kr')) {
    return trimmedPortalId
  }
  return `${trimmedPortalId}@cau.ac.kr`
}
