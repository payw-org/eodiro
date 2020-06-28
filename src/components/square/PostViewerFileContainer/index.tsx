import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import { useEffect, useRef, useState } from 'react'

import $ from './style.module.scss'
import ApiHost from '@/modules/api-host'
import { GetPostById } from '@payw/eodiro-one-api/api/one/scheme'
import ImageViewer from '../ImageViewer'
import classNames from 'classnames'

type PostViewerFileContainerProps = {
  files: GetPostById['payload']['data']['files']
}

export const PostViewerFileContainer: React.FC<PostViewerFileContainerProps> = (
  props
) => {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)
  const [initialImageIndex, setInitialImageIndex] = useState(0)
  const imageViewerWrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isImageViewerOpen) {
      disableBodyScroll(imageViewerWrapper.current)
    } else {
      clearAllBodyScrollLocks()
    }
  }, [isImageViewerOpen])

  const imageFiles = props.files.filter((file) =>
    file.mimeType.startsWith('image/')
  )

  const otherFiles = props.files.filter(
    (file) => !file.mimeType.startsWith('image/')
  )

  return (
    <div id={$['post-viewer-file-container']}>
      {/* Images */}
      <div className={$['images']}>
        {imageFiles.map((image, i) => {
          return (
            <div
              className={$['image-container']}
              key={image.fileId}
              onClick={() => {
                setInitialImageIndex(i)
                setIsImageViewerOpen(true)
              }}
            >
              <img src={ApiHost.getHost(true) + image.path} alt={image.name} />
            </div>
          )
        })}
      </div>

      <div
        ref={imageViewerWrapper}
        style={{
          visibility: isImageViewerOpen ? 'visible' : 'hidden',
        }}
      >
        <ImageViewer
          srcs={imageFiles.map((image) => ApiHost.getHost(true) + image.path)}
          close={() => {
            setIsImageViewerOpen(false)
          }}
          initialIndex={initialImageIndex}
        />
      </div>

      {/* Other downloadable files */}
      {otherFiles.map((file) => {
        return (
          <a
            href={ApiHost.getHost(true) + file.path}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(
              $['file'],
              'display-flex',
              'align-items-center'
            )}
            key={file.fileId}
          >
            <i className={classNames($['icon'], 'f7-icons')}>doc</i>
            {file.name}
          </a>
        )
      })}
    </div>
  )
}
