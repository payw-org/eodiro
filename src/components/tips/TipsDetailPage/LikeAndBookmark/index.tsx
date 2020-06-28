import $ from './style.module.scss'
import ApiHost from '@/modules/api-host'
import classNames from 'classnames'
import { getAccessToken } from '@/api'
import { oneApiClient } from '@payw/eodiro-one-api'
import { useState } from 'react'

export type LikeAndBookmarkProps = {
  tipId: number
  likeInfo: {
    isLiked: boolean
    likes: number
  }
}

const LikeAndBookmark: React.FC<LikeAndBookmarkProps> = (props) => {
  const { tipId } = props
  const [likeInfo, setLikeInfo] = useState(props.likeInfo)

  return (
    <div className={$['like-and-bookmark']}>
      <button
        className={classNames($['like'], {
          [$['is-liked']]: likeInfo.isLiked,
        })}
        onClick={async () => {
          const { err, data } = await oneApiClient(ApiHost.getHost(), {
            action: 'likeTip',
            data: {
              accessToken: await getAccessToken(),
              tipId,
            },
          })

          if (!err) {
            const { isLiked, likes } = data
            setLikeInfo({
              isLiked,
              likes,
            })
          }
        }}
      >
        <i className="f7-icons">
          {likeInfo.isLiked ? 'hand_thumbsup_fill' : 'hand_thumbsup'}
        </i>
        <span className={$['count']}>{likeInfo.likes}</span>
      </button>
    </div>
  )
}

export default LikeAndBookmark
