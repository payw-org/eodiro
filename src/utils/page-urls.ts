import queryString from 'query-string'

export const logInUrl = `/log-in`

export function communityBoardPageUrl({
  boardId,
  boardName,
  page,
}: {
  boardId: number
  boardName?: string
  page?: number
}) {
  return `/community/board/${boardId}?${queryString.stringify({
    boardName,
    page,
  })}`
}

export const communityPostPageUrl = (boardId: number, postId: number) =>
  `/community/board/${boardId}/post/${postId}`

export function postEditorPageUrl(boardId: number, postId?: number) {
  return `/community/board/${boardId}/editor${
    postId ? `?postId=${postId}` : ''
  }`
}
