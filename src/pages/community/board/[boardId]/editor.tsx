import Information from '@/components/global/Information'
import { Spinner } from '@/components/global/Spinner'
import { ArrowBlock, Button } from '@/components/ui'
import { Icon } from '@/components/ui/Icon'
import { eodiroConst } from '@/constants'
import Body from '@/layouts/BaseLayout/Body'
import ApiHost from '@/modules/api-host'
import EodiroDialog from '@/modules/client/eodiro-dialog'
import EodiroMarkup from '@/modules/client/eodiro-markup'
import { eodiroRequest } from '@/modules/eodiro-request'
import { prisma } from '@/modules/prisma'
import { nextRequireAuthMiddleware } from '@/modules/server/ssr-middlewares/next-require-auth'
import { communityPostPageUrl } from '@/utils/page-urls'
import {
  ApiCommunityUpsertPostReqBody,
  ApiCommunityUpsertPostResData,
} from '@payw/eodiro-server-types/api/community/post'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import $$ from 'classnames'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
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
  const [isTutorialOpen, setIsTutorialOpen] = useState(false)

  const tutorialContent = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isTutorialOpen && tutorialContent.current) {
      disableBodyScroll(tutorialContent.current)
    } else {
      clearAllBodyScrollLocks()
    }
  }, [isTutorialOpen])

  const [title, setTitle] = useState(post ? post.title : '')
  const [body, setBody] = useState(post ? post.body : '')
  const bodyTextAreaRef = useRef<HTMLTextAreaElement>(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)

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

    if (trimmedTitle.length < eodiroConst.MIN_POST_TITLE_LENGTH) {
      new EodiroDialog().alert('제목을 입력해주세요.')
      return
    }

    if (trimmedTitle.length > eodiroConst.MAX_POST_TITLE_LENGTH) {
      new EodiroDialog().alert('제목은 최대 100자입니다.')
      return
    }

    if (trimmedBody.length < eodiroConst.MIN_POST_BODY_LENGTH) {
      new EodiroDialog().alert('내용을 입력해주세요.')
      return
    }

    try {
      const res = await eodiroRequest<
        ApiCommunityUpsertPostReqBody,
        ApiCommunityUpsertPostResData
      >({
        url: ApiHost.resolve('/community/post'),
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

  async function onImageChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.currentTarget
    const { files } = e.currentTarget

    if (!files || !files[0]) return

    const file = files[0]

    const formData = new FormData()
    formData.append('image', file)

    setIsUploadingImage(true)

    try {
      const result = await eodiroRequest({
        method: 'post',
        url: '/api/upload-image',
        data: formData,
      })

      if (!result.link) {
        new EodiroDialog().alert(
          '이미지 업로드에 실패했습니다. 문제가 반복될시 문의바랍니다.'
        )
      } else {
        const imgSrc = result.link as string

        setBody((prevBody) => {
          const cursorPosition =
            bodyTextAreaRef.current?.selectionEnd ?? prevBody.length
          return `${prevBody.slice(
            0,
            cursorPosition
          )}\n${EodiroMarkup.generateImageMarkup(imgSrc)}\n${prevBody.slice(
            cursorPosition
          )}`
        })
        // `${prevBody}\n${EodiroMarkup.generateImageMarkup(imgSrc)}`
      }
    } catch (error) {
      // Upload error
      console.error(error)
      new EodiroDialog().alert(
        '이미지 업로드에 실패했습니다. 문제가 반복될시 문의바랍니다.'
      )
    }

    target.value = ''
    setIsUploadingImage(false)
  }

  return (
    <Body
      pageTitle={title || (post ? '게시물 수정' : '새 게시물')}
      titleHidden
      width="small"
    >
      <div className={`${eodiroConst.OVERLAY_SENTINEL_SPOT}`}>
        <ArrowBlock flat noPadding customHeight>
          <button
            type="button"
            className="p-2 text-center"
            onClick={() => setIsTutorialOpen(true)}
          >
            <Icon name="info_circle_fill" /> 어디로 에디터 도움말
          </button>
        </ArrowBlock>
      </div>

      <div className={$$(eodiroConst.TITLE_SENTINEL_SPOT, 'mt-4')}>
        <input
          type="text"
          placeholder="제목을 입력하세요."
          spellCheck={false}
          autoComplete="off"
          value={title}
          onChange={onChangeTitle}
          maxLength={eodiroConst.MAX_POST_TITLE_LENGTH}
        />
      </div>

      <div className="mt-4">
        <div
          className="relative"
          style={{
            display: isPreviewMode ? 'none' : undefined,
          }}
        >
          <textarea
            ref={bodyTextAreaRef}
            className="pb-12"
            spellCheck={false}
            placeholder="게시물 내용을 입력하세요."
            value={body}
            onChange={onChangeBody}
            style={{
              height: 300,
            }}
          />

          <div className="image-upload flex items-center justify-center absolute right-3 bottom-2 w-10 h-10 bg-base-white-blue dark:bg-black rounded-inner">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="image-upload-input"
              className="flex items-center justify-center w-full h-full"
            >
              <Icon name="photo" size={24} />
            </label>
            <input
              id="image-upload-input"
              type="file"
              accept="image/*"
              tabIndex={-1}
              className="pointer-events-none opacity-0 fixed"
              onChange={onImageChange}
            />
          </div>

          <div
            className="flex items-center justify-center bg-black bg-opacity-10 absolute top-0 left-0 w-full h-full rounded-outer"
            style={{
              display: !isUploadingImage ? 'none' : undefined,
            }}
          >
            <Spinner />
          </div>
        </div>

        {/* Markup Preview */}
        {isPreviewMode && (
          <div className="preview">
            <ArrowBlock flat>
              <article
                className="preview"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: EodiroMarkup.parse(body),
                }}
              />
            </ArrowBlock>
          </div>
        )}
      </div>

      <div className={`${$['bottom-buttons']} flex items-center mt-4`}>
        <Button
          accent="default"
          className="flex-1"
          onClick={() => setIsPreviewMode((prev) => !prev)}
        >
          {isPreviewMode ? (
            <span>
              <Icon name="square_pencil" /> 편집
            </span>
          ) : (
            <span>
              <Icon name="eye" /> 미리보기
            </span>
          )}
        </Button>
        <Button onClick={upsertPost} className="flex-1 ml-4">
          {post ? '수정 완료' : '작성 완료'}
        </Button>
      </div>

      <div
        className={$$($['tutorial'], {
          [$['open']]: isTutorialOpen,
        })}
      >
        <div
          role="button"
          tabIndex={0}
          aria-label="Close"
          className={`${$['bg']} cursor-default`}
          onClick={() => setIsTutorialOpen(false)}
        />
        <div className={$['body']}>
          <div className="flex items-center justify-between p-7 pb-3 bg-white dark:bg-base-black-soft">
            <h1 className="text-3xl font-semibold">어디로 에디터 도움말</h1>
            <button type="button" onClick={() => setIsTutorialOpen(false)}>
              <Icon name="xmark_circle_fill" size={40} />
            </button>
          </div>

          <div
            ref={tutorialContent}
            className={`${$['content']} absolute top-0 left-0 h-full w-full overflow-y-auto px-7 pt-28`}
          >
            <section>
              <h2>줄바꿈</h2>
              <p>
                엔터를 입력한만큼 줄바꿈이 일어납니다. 게시물의 시작과 끝의
                줄바꿈은 무시됩니다.
              </p>
            </section>
            <section>
              <h2>이미지 업로드</h2>
              <p>
                이미지를 업로드하면 에디터에 다음과 같은 형태로 입력됩니다.
                <br />
                <br />
                <b>
                  <span className="text-eodiro-green-2">
                    [ 이미지 | f2M4UHI.png ]
                  </span>
                </b>
                <br />
                <br />
                같은 줄에 다른 내용을 함께 입력하거나 이미지 코드를 임의로
                변경/훼손하면 이미지가 올바르게 표시되지 않습니다.
                <br />
                <br />
                <b>
                  <span className="text-eodiro-primary-color">
                    <Icon name="xmark_circle_fill" />
                  </span>{' '}
                  [ 이미지 | f2M4UHI.png ]{' '}
                  <span className="text-eodiro-primary-color">안녕하세요</span>{' '}
                </b>
                <br />
                <b>
                  <span className="text-eodiro-primary-color">
                    <Icon name="xmark_circle_fill" />
                  </span>{' '}
                  <span className="text-eodiro-primary-color">[이</span>미지{' '}
                  <span className="text-eodiro-primary-color">|f</span>
                  2M4UHI.png ]
                </b>
                <br />
                <b>
                  <span className="text-eodiro-primary-color">
                    <Icon name="xmark_circle_fill" />
                  </span>{' '}
                  [{' '}
                  <span className="text-eodiro-primary-color">이미지히히</span>{' '}
                  | f2M4UHI.png ]{' '}
                </b>
                <br />
                <br />
                이미지 코드를 유실한 경우 내용을 삭제하고 이미지를 새로
                업로드해주세요.
              </p>
            </section>
          </div>
        </div>
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
