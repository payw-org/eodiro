import { GetServerSideProps, NextPage } from 'next'

import $ from './style.module.scss'
import ApiHost from '@/modules/api-host'
import Body from '@/layouts/BaseLayout/Body'
import { constants } from '@/constants'
import EodiroLink from '@/components/utils/EodiroLink'
import { GetTipDetail } from '@payw/eodiro-one-api/api/one/scheme'
import Information from '@/components/global/Information'
import LikeAndBookmark from './LikeAndBookmark'
import { OneApiError } from '@payw/eodiro-one-api/api/one/types'
import { PostViewerFileContainer } from '@/components/square/PostViewerFileContainer'
import RequireAuth from '@/components/global/RequireAuth'
import Time from '@/modules/time'
import { TipResponse } from '@payw/eodiro-one-api/database/models/tip'
import classNames from 'classnames'
import { getAccessToken } from '@/api'
import { oneApiClient } from '@payw/eodiro-one-api'
import { pathIds } from '@/config/paths'
import { useAuth } from '@/pages/_app'
import { useRouter } from 'next/router'
import { useState } from 'react'

type ContentProps = {
  tip: TipResponse
}

const Content: React.FC<ContentProps> = ({ tip }) => {
  const authInfo = useAuth()
  const router = useRouter()
  const boardName = router.query.boardName

  async function deletePost() {
    // Confirm
    if (
      !confirm(
        '삭제된 팁은 되돌릴 수 없으며 모든 댓글도 함께 삭제됩니다.\n정말 삭제하시겠습니까?'
      )
    )
      return

    // Delete
    // await oneApiClient(ApiHost.getHost(), {
    //   action: 'deletePost',
    //   data: {
    //     accessToken: (await Tokens.get()).accessToken,
    //     postId: tip.id,
    //   },
    // })
    // const { data: deletionData, err: deletionErr } = await oneApiClient(
    //   ApiHost.getHost(),
    //   {
    //     action: 'deleteTip',
    //     data: {
    //       accessToken: await getAccessToken(),
    //       tipId: tip.id,
    //     },
    //   }
    // )

    // if (deletionErr) {
    //   alert(`에러가 발생했습니다. ${deletionErr}`)
    // } else {
    // }

    alert('삭제되었습니다.')

    // Redirect to the list
    window.location.replace(`/square/${boardName}`)
  }

  return (
    <div>
      <div className={classNames($['post'], constants.OVERLAY_SENTINEL_SPOT)}>
        <div className={$['info']}>
          <span className={$['author']}>{tip.randomNickname}</span>

          <span className={$['time']}>
            {Time.yyyymmddhhmmss(tip.createdAt, true)}
          </span>

          {tip.userId === authInfo.userId && (
            <span className={$['actions']}>
              <button className={$['edit']}>
                <EodiroLink absolute href={`/tips/editor?tipId=${tip.id}`} />
                <i className="f7-icons">pencil_outline</i>
              </button>
              <button className={$['delete']} onClick={deletePost}>
                <i className="f7-icons">trash</i>
              </button>
            </span>
          )}
        </div>

        {/* Post title */}
        <h1 className={$['title']}>
          <span className="title-sentinel-spot">{tip.title}</span>
        </h1>

        {/* Post body */}
        {tip.body &&
          tip.body.split('\n').map((line, i) => {
            return line.length === 0 ? (
              <br key={`br-${i}`} className="line-break" />
            ) : (
              <p key={`p-${i}`} className={`paragraph-${i}`}>
                {line}
              </p>
            )
          })}

        {/* Files list */}
        {tip.tipFiles && tip.tipFiles.length > 0 && (
          <PostViewerFileContainer files={tip.tipFiles} />
        )}

        <LikeAndBookmark
          likeInfo={{
            isLiked: tip.isLiked,
            likes: tip.tipLikes,
          }}
          tipId={tip.id}
        />
      </div>

      {/* <Comments comments={comments} ownerId={post.user_id} /> */}
    </div>
  )
}

export type TipsDetailPageProps = {
  tip: TipResponse
  tipErr: GetTipDetail['payload']['err']
}

const TipDetailPage: NextPage<TipsDetailPageProps> = ({ tip, tipErr }) => {
  return (
    <Body
      pageTitle={tip?.title ?? '어디로 | 포스트'}
      titleHidden
      bodyClassName={$['eodiro-post-view']}
      hasTopGap={tipErr ? true : false}
    >
      {tip ? (
        <Content tip={tip} />
      ) : tipErr === OneApiError.UNAUTHORIZED ? (
        <div className="overlay-sentinel-spot title-sentinel-spot">
          <RequireAuth />
        </div>
      ) : tipErr === OneApiError.NO_CONTENT ? (
        <div className="overlay-sentinel-spot title-sentinel-spot">
          <Information title="존재하지 않는 포스트입니다." />
        </div>
      ) : null}
    </Body>
  )
}

export default TipDetailPage
