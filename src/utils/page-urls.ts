export function communityBoardPageUrl(boardId: number, page?: number) {
  return `/community/board/${boardId}${page ? `?page=${page}` : ''}`
}

export const communityPostPageUrl = (boardId: number, postId: number) =>
  `/community/board/${boardId}/post/${postId}`

export function postEditorPageUrl(boardId: number, postId?: number) {
  return `/community/board/${boardId}/editor${
    postId ? `?postId=${postId}` : ''
  }`
}
