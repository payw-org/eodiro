import Information from '@/components/global/Information'
import { Button } from '@/components/ui'
import { eodiroConsts } from '@/constants'
import Body from '@/layouts/BaseLayout/Body'
import EodiroDialog from '@/modules/client/eodiro-dialog'
import { eodiroRequest } from '@/modules/eodiro-request'
import { prisma } from '@/modules/prisma'
import { nextRequireAuthMiddleware } from '@/modules/server/ssr-middlewares/next-require-auth'
import {
  ApiCommunityUpsertPostReqData,
  ApiCommunityUpsertPostResData,
  apiCommunityUpsertPostUrl,
} from '@/pages/api/community/post'
import { communityPostPageUrl } from '@/utils/page-urls'
import classNames from 'classnames'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import $ from './editor.module.scss'

type PostEditorPageProps = {
  boardId: number
  post: {
    id: number
    title: string
    body: string
    userId: number
  } | null
}

export default function PostEditorPage({ boardId, post }: PostEditorPageProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post ? post.title : '')
  const [body, setBody] = useState(post ? post.body : '')

  if (!boardId) {
    return <Information title="잘못된 접근입니다." />
  }

  function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value)
  }

  function onChangeBody(e: ChangeEvent<HTMLTextAreaElement>) {
    setBody(e.currentTarget.value)
  }

  async function upsertPost() {
    const trimmedTitle = title.trim()
    const trimmedBody = body.trim()

    if (trimmedTitle.length < eodiroConsts.MIN_POST_TITLE_LENGTH) {
      new EodiroDialog().alert('제목을 입력해주세요.')
      return
    }

    if (trimmedTitle.length > eodiroConsts.MAX_POST_TITLE_LENGTH) {
      new EodiroDialog().alert('제목은 최대 100자입니다.')
      return
    }

    if (trimmedBody.length < eodiroConsts.MIN_POST_BODY_LENGTH) {
      new EodiroDialog().alert('내용을 입력해주세요.')
      return
    }

    try {
      const res = await eodiroRequest<
        ApiCommunityUpsertPostReqData,
        ApiCommunityUpsertPostResData
      >({
        url: apiCommunityUpsertPostUrl,
        method: 'POST',
        data: {
          title: trimmedTitle,
          body: trimmedBody,
          boardId,
          postId: post?.id,
        },
      })

      new EodiroDialog().vagabond(post ? '수정되었습니다.' : '작성되었습니다.')
      router.replace(communityPostPageUrl(boardId, res.postId))
    } catch (error) {
      console.error(error)
      console.error(error.response)

      // Alert error message sent from server
      if (error.reponse?.data) {
        new EodiroDialog().alert(error.response.data)
      }
    }
  }

  return (
    <Body
      pageTitle={title || (post ? '포스트 수정' : '새 포스트')}
      titleHidden
      bodyClassName={$['post-editor-page']}
    >
      <div
        className={classNames(
          eodiroConsts.OVERLAY_SENTINEL_SPOT,
          eodiroConsts.TITLE_SENTINEL_SPOT
        )}
      >
        <input
          className={$['title-input']}
          type="text"
          placeholder="제목을 입력하세요."
          spellCheck={false}
          autoComplete="off"
          value={title}
          onChange={onChangeTitle}
          maxLength={eodiroConsts.MAX_POST_TITLE_LENGTH}
        />
      </div>
      <textarea
        className={$['body-input']}
        spellCheck={false}
        placeholder="포스트 내용을 입력하세요."
        value={body}
        onChange={onChangeBody}
      />
      <div className={$['done-btn']}>
        <Button full onClick={upsertPost}>
          {post ? '수정 완료' : '작성 완료'}
        </Button>
      </div>
    </Body>
  )
}

export const getServerSideProps: GetServerSideProps<PostEditorPageProps> = async ({
  req,
  res,
  query,
}) => {
  await nextRequireAuthMiddleware(req, res)

  const boardId = query.boardId ? Number(query.boardId) : 0
  const postId = query.postId ? Number(query.postId) : undefined
  let post: {
    id: number
    title: string
    body: string
    userId: number
  } | null = null

  if (postId) {
    post = await prisma.communityPost.findUnique({
      where: { id: postId },
      select: {
        id: true,
        title: true,
        body: true,
        userId: true,
      },
    })
  }

  const board = await prisma.communityBoard.findUnique({
    where: { id: boardId },
  })

  if (!board || (postId && !post) || (post && post.userId !== req.user.id)) {
    res.writeHead(404)
    res.end()
  }

  return { props: { boardId, post } }
}
