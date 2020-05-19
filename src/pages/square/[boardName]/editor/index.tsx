// TODO Replace updload and edit with universal savePost One API

import { GetServerSideProps, NextPage } from 'next'
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import $ from './style.module.scss'
import ApiHost from '@/modules/api-host'
import Axios from 'axios'
import Body from '@/layouts/BaseLayout/Body'
import { NavTitleDispatchContext } from '@/components/global/Navigation'
import NoFooter from '@/components/utils/NoFooter'
import { PostAttrs } from '@payw/eodiro-one-api/database/models/post'
import { Spinner } from '@/components/global/Spinner'
import { Tokens } from '@/api'
import WhiteBody from '@/components/utils/WhiteBody'
import _ from 'lodash'
import { availableMimeTypes } from '@/config/available-mime-types'
import classNames from 'classnames'
import mergeClassNames from '@/modules/merge-class-name'
import { oneAPIClient } from '@payw/eodiro-one-api'
import { redirect } from '@/modules/server/redirect'
import { useAuth } from '@/pages/_app'
import { useRouter } from 'next/router'

type NewPostPageProps = {
  title: string
  body: string
  files: {
    mimeType: string
    fileId: number
    path: string
    name: string
    status: 'uploaded'
  }[]
  boardId: number
  postId: number
}
const NewPostPage: NextPage<NewPostPageProps> = (props) => {
  const { title, body, boardId, postId } = props
  const mode = title.length === 0 ? 'new' : 'edit'
  const isEditMode = mode === 'edit'
  const router = useRouter()
  const auth = useAuth()

  const titleRef = useRef<HTMLTextAreaElement>(null)
  const titleShadowRef = useRef<HTMLTextAreaElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const bodyShadowRef = useRef<HTMLTextAreaElement>(null)

  const setNavTitle = useContext(NavTitleDispatchContext)

  function autoResize(
    ref: MutableRefObject<HTMLTextAreaElement>,
    shadowRef: MutableRefObject<HTMLTextAreaElement>
  ): void {
    shadowRef.current.value = ref.current.value
    shadowRef.current.style.height = ''
    shadowRef.current.style.height = shadowRef.current.scrollHeight + 'px'
    ref.current.style.height = shadowRef.current.style.height
  }

  // Initialize the editor
  useEffect(() => {
    // history.replaceState({}, document.title, location.pathname)

    // Calculate proper height of title input field
    // by preset dummy data to the shadow input field
    const loadHandler = () => {
      titleShadowRef.current.value = '제목'
      titleShadowRef.current.style.height =
        titleShadowRef.current.scrollHeight + 'px'
      titleRef.current.style.height = titleShadowRef.current.scrollHeight + 'px'
      titleShadowRef.current.value = title
    }

    window.addEventListener('load', loadHandler)

    // Auto resize the input fields' height when window is resized
    autoResize(titleRef, titleShadowRef)
    autoResize(bodyRef, bodyShadowRef)

    const resizeHandler = () => {
      autoResize(titleRef, titleShadowRef)
      autoResize(bodyRef, bodyShadowRef)
    }

    window.addEventListener('resize', resizeHandler)

    // Warn when try to leave the page
    window.onbeforeunload = function () {
      return '작성 중인 내용이 모두 사랍니다. 페이지를 나가시겠습니까?'
    }

    return () => {
      window.removeEventListener('load', loadHandler)
      window.removeEventListener('resize', resizeHandler)
      window.onbeforeunload = undefined
    }
  }, [])

  // Files
  const [filesState, setFilesState] = useState<
    {
      name: string
      mimeType?: string
      path: string
      fileId?: number
      status: 'pending' | 'uploaded' | 'failed'
      errMsg?: string
    }[]
  >(props.files || [])
  const uploadSection = useRef<HTMLElement>(null)

  // Upload or edit post
  async function uploadPost(): Promise<void> {
    // Upload post first
    const { err, data: inserId } = await oneAPIClient(ApiHost.getHost(), {
      action: 'savePost',
      data: {
        accessToken: auth.tokens.accessToken,
        boardId: boardId,
        title: titleRef.current.value,
        body: bodyRef.current.value,
        fileIds: filesState
          .filter((fileState) => {
            return fileState.status === 'uploaded'
          })
          .map((fileState) => fileState.fileId),
        update: mode === 'edit',
        postId,
      },
    })

    if (!err) {
      alert(mode === 'edit' ? '수정되었습니다.' : '업로드되었습니다.')

      // If edit mode, update the cached posts
      if (mode === 'edit') {
        const cached: PostAttrs[] = JSON.parse(sessionStorage.getItem('sbpd'))
        // If no cached data, no update
        if (cached) {
          const index = cached.findIndex(
            (cachedPost) => cachedPost.id === postId
          )

          if (index !== -1) {
            // Only if it exists in the cache
            const newOne = cached[index]
            newOne.title = titleRef.current.value
            newOne.body = bodyRef.current.value
            cached.splice(index, 1, newOne)
            sessionStorage.setItem('sbpd', JSON.stringify(cached))
          }
        }
      }

      // Detach preventing event before redirection
      window.onbeforeunload = undefined
      location.replace(`/square/${router.query.boardName}/${postId || inserId}`)
      return
    }

    if (err === 'No Title') {
      alert('제목을 입력해주세요.')
      titleRef.current.focus()
    } else if (err === 'No Body') {
      alert('내용을 입력해주세요.')
      bodyRef.current.focus()
    }

    return
  }

  return (
    <>
      <WhiteBody />
      <NoFooter />
      <Body
        pageTitle={title.length === 0 ? '새 포스트' : title}
        titleHidden
        bodyClassName={$['eodiro-new-post']}
      >
        <div className="display-flex flex-direction-row">
          <section className={$['edit-section']}>
            <div className={$['title-container']}>
              {/* Shadow */}
              <textarea
                ref={titleShadowRef}
                className={classNames($['title'], $['shadow'])}
              />
              {/* Real title field */}
              <textarea
                defaultValue={title}
                ref={titleRef}
                className={classNames(
                  $['title'],
                  'overlay-sentinel-spot',
                  'title-sentinel-spot'
                )}
                spellCheck={false}
                placeholder="제목"
                maxLength={100}
                onKeyDown={(e): void => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    bodyRef.current.focus()
                  }
                }}
                onChange={(e): void => {
                  setNavTitle(e.target.value)
                  autoResize(titleRef, titleShadowRef)
                }}
              />
            </div>
            <div className={$['body-container']}>
              {/* Shadow */}
              <textarea
                ref={bodyShadowRef}
                className={classNames($['title'], $['shadow'])}
              />
              {/* Real body field */}
              <textarea
                defaultValue={body}
                ref={bodyRef}
                className={$['body']}
                spellCheck={false}
                placeholder="내용"
                onChange={(): void => {
                  autoResize(bodyRef, bodyShadowRef)
                }}
              />
            </div>
          </section>

          <section
            ref={uploadSection}
            className={classNames($['upload-section'], 'align-self-flex-start')}
          >
            <button
              className={$['close']}
              onClick={() => {
                uploadSection.current.classList.remove('opened')
                enableBodyScroll(uploadSection.current)
              }}
            >
              <i className="octicon octicon-triangle-down" />
            </button>
            <h2 className={$['header']}>파일</h2>

            {/* File input */}
            <input
              type="file"
              className={$['input-file']}
              id="file-upload"
              multiple={true}
              accept={availableMimeTypes.join(',')}
              // File upload
              onChange={(e) => {
                const files = e.target.files

                for (let i = 0; i < files.length; i += 1) {
                  const file = files[i]
                  const formData = new FormData()
                  formData.append('file', file)

                  let index: number

                  setFilesState((prevState) => {
                    const newState = [...prevState]
                    index =
                      newState.push({
                        name: file.name,
                        mimeType: file.type,
                        path: '',
                        status: 'pending',
                      }) - 1
                    return newState
                  })

                  Axios.post(ApiHost.getHost() + '/upload', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  })
                    .then((res) => {
                      const result = res.data.result[0]

                      // Error occurs
                      if (result.err) {
                        if (result.err === 'File Too Large') {
                          setFilesState((prevState) => {
                            const newState = [...prevState]
                            newState[index].status = 'failed'
                            newState[index].errMsg =
                              '파일이 너무 큽니다. 3MB 이하의 파일만 업로드할 수 있습니다.'
                            return newState
                          })
                          return
                        } else if (result.err === 'Unsupported MIME Type') {
                          setFilesState((prevState) => {
                            const newState = [...prevState]
                            newState[index].status = 'failed'
                            newState[index].errMsg =
                              '지원하지 않는 파일 종류입니다.'
                            return newState
                          })
                          return
                        }
                      } else {
                        // Successfully uploaded to CDN server
                        setFilesState((prevState) => {
                          const newState = [...prevState]
                          // Copy the information to the files state
                          newState[index].status = 'uploaded'
                          newState[index].path = result.path
                          newState[index].fileId = result.fileId
                          return newState
                        })
                      }
                    })
                    .catch((err) => {
                      // Failed to upload a file
                      console.error(err)
                      alert(err)

                      setFilesState((prevState) => {
                        const newState = [...prevState]
                        newState[index].status = 'failed'
                        return newState
                      })
                    })
                }
              }}
            />
            <label
              htmlFor="file-upload"
              className={classNames($['file-upload-label'], 'line-height-1')}
            >
              <span
                className="octicon octicon-plus"
                style={{
                  marginRight: '0.3rem',
                }}
              />
            </label>

            {/* File containers */}
            <div className={$['files-container']}>
              {filesState.length > 0 ? (
                filesState
                  .slice(0)
                  .reverse()
                  .map((fileState, i) => {
                    return (
                      // File
                      <div
                        className={classNames(
                          $['file'],
                          'display-flex',
                          'align-items-center',
                          'justify-content-space-between'
                        )}
                        key={i}
                      >
                        <div className="display-flex align-items-center">
                          {/* Remove item btn */}
                          <button
                            className={classNames(
                              $['remove'],
                              'octicon',
                              'octicon-x',
                              'font-weight-bold',
                              'flex-none'
                            )}
                            onClick={() => {
                              setFilesState((prevState) => {
                                const newState = [...prevState]
                                _.pullAt(newState, filesState.length - 1 - i)
                                return newState
                              })
                            }}
                          />
                          <div>
                            {/* Display image file if possible */}
                            {fileState.mimeType.startsWith('image/') &&
                              fileState.status === 'uploaded' &&
                              fileState.path && (
                                <img
                                  src={ApiHost.getHost(true) + fileState.path}
                                  alt={fileState.name}
                                  style={{
                                    width: '100%',
                                    borderRadius: '0.5rem',
                                    overflow: 'hidden',
                                  }}
                                />
                              )}
                            {fileState.errMsg && (
                              <p className={$['err-msg']}>{fileState.errMsg}</p>
                            )}
                            {!fileState.mimeType.startsWith('image/') && (
                              <span
                                className={classNames(
                                  $['file-name'],
                                  fileState.errMsg && $['failed']
                                )}
                              >
                                {fileState.name}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Display spinner while uploading */}
                        {fileState.status === 'pending' && (
                          <div
                            style={{
                              marginLeft: '0.5rem',
                            }}
                          >
                            <Spinner />
                          </div>
                        )}
                      </div>
                    )
                  })
              ) : (
                // Display file upload information
                // when there is no file ready
                <div className={$['information']}>
                  <p>
                    이미지와 도큐멘트, 압축 파일 등을 업로드 할 수 있습니다.
                  </p>
                  <button className={classNames($['more'], 'text-align-left')}>
                    지원되는 파일 포맷 및 파일 업로드에 대해 자세히 보기
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Upload or finish edit */}
        <button className={$['upload-btn']} onClick={uploadPost}>
          <i className="octicon octicon-check" />
        </button>

        {/* File upload button on mobile */}
        <button
          className={$['upload-file-btn']}
          onClick={() => {
            disableBodyScroll(uploadSection.current)
            uploadSection.current.classList.add('opened')
          }}
        >
          <i className="octicon octicon-cloud-upload" />
        </button>
      </Body>
    </>
  )
}

export default NewPostPage

// Get init data from server side
export const getServerSideProps: GetServerSideProps<NewPostPageProps> = async ({
  query,
  req,
  res,
}) => {
  let title = ''
  let body = ''
  let files = null

  // Check if there is auto saved version

  // Edit mode when post ID is given as URL query
  const postId = Number(query['post_id']) || null
  if (postId) {
    const { err, data } = await oneAPIClient(ApiHost.getHost(), {
      action: 'getPostById',
      data: {
        postId: postId,
        edit: true,
        accessToken: (await Tokens.get(req)).accessToken,
      },
    })

    if (err) {
      redirect(res, `/square/${encodeURIComponent(query.boardName as string)}`)
      return
    }

    title = data.title
    body = data.body
    files = data.files
      ? data.files.map((file) => {
          file['status'] = 'uploaded'
          return file
        })
      : null
  }

  // Get board ID
  const { err, data: boardId } = await oneAPIClient(ApiHost.getHost(), {
    action: 'getBoardId',
    data: {
      boardName: query.boardName as string,
    },
  })

  if (err) {
    redirect(res)
    return
  }

  return {
    props: {
      title,
      body,
      boardId,
      postId,
      files,
    },
  }
}
