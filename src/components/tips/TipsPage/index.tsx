import { useEffect, useState } from 'react'

import $ from './style.module.scss'
import ApiHost from '@/modules/api-host'
import { ArrowBlock } from '../../ui'
import Body from '@/layouts/BaseLayout/Body'
import EodiroLink from '@/components/utils/EodiroLink'
import { LyingDownIllust } from '../../illustrations'
import PageInfo from '@/components/utils/PageInfo'
import Pagination from '@/components/ui/Pagination'
import RequireAuth from '@/components/global/RequireAuth'
import { TipListResponse } from '@payw/eodiro-one-api/database/models/tip'
import { TipTopic } from '@prisma/client'
import TipsList from '../TipsList'
import classNames from 'classnames'
import { getAccessToken } from '@/api'
import { oneApiClient } from '@payw/eodiro-one-api'
import { useAuth } from '@/pages/_app'
import { useRouter } from 'next/router'

type TipsPageQuery = {
  topic?: TipTopic
  page?: number
}

export type TipsPageProps = {
  topics: Record<TipTopic, string>
  topic: TipTopic
  page: number
}

const TipsPage: React.FC<TipsPageProps> = ({ topics, topic, page }) => {
  const { isSigned } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [tipsData, setTipsData] = useState<TipListResponse[]>([])
  const [totalPage, setTotalPage] = useState<number>(0)

  const [pageState, setPageState] = useState<TipsPageQuery>({
    topic,
    page,
  })

  const router = useRouter()

  function movePage(topic: string, page: number) {
    router.replace({
      pathname: router.pathname,
      query: {
        topic,
        page,
      },
    })
  }

  async function fetchNewData(topic: TipTopic, page: number) {
    if (isLoading) return

    setIsLoading(true)

    const { data } = await oneApiClient(ApiHost.getHost(), {
      action: 'getTips',
      data: {
        accessToken: await getAccessToken(),
        topic,
        page,
      },
    })

    setTipsData(data.tips)
    setTotalPage(data.totalPage)

    setTimeout(() => {
      setIsLoading(false)
    }, 100)
  }

  useEffect(() => {
    if (!isSigned) return

    fetchNewData(topic, page)

    router.events.on('routeChangeComplete', async () => {
      const parsed = new URLSearchParams(window.location.search)
      const topic = (parsed.get('topic') as TipTopic) || null
      const page = parseInt(parsed.get('page') as string) || 1

      fetchNewData(topic, page)

      setPageState({
        topic,
        page,
      })
    })
  }, [])

  return (
    <Body
      pageTitle="꿀팁"
      titleAlign="center"
      bodyClassName={$['archive-page']}
    >
      <PageInfo
        title={{
          subject: '꿀팁',
        }}
        description="중앙대 학생들을 위한 유용하고 유익한 정보 보관소."
      />
      <h2 className={$['description']}>
        어디로 꿀팁은 중앙대 학생들을 위한 유용하고 유익한 정보를 서로 공유하는
        곳입니다.
      </h2>

      <ArrowBlock className={$['archived']}>
        <EodiroLink absolute href="tips/archives" />

        <div>
          <i className={classNames('f7-icons', $['icon'])}>archivebox_fill</i>
          <span className={$['label']}>아카이브</span>
        </div>

        <p className={$['caption']}>
          일정량 이상의 추천을 받은 인기 꿀팁은 아카이브에 따로 보관됩니다.
        </p>
      </ArrowBlock>

      {/* Tips List */}
      <section className={$['tips-list-container']}>
        <h2>최신 꿀팁들</h2>

        {/* Topics */}
        <div className={$['scroll-wrapper']}>
          <div className={classNames($['scroll-shadow'], $['left-shadow'])} />
          <div className={classNames($['scroll-shadow'], $['right-shadow'])} />

          <div className={$['topics']}>
            <div className={$['topic-wrapper']}>
              <div
                className={classNames($['topic'], {
                  [$['chosen']]: !pageState.topic,
                })}
                onClick={() => {
                  movePage(null, 1)
                }}
              >
                전체
              </div>
            </div>

            {Object.keys(topics).map((topicKey: TipTopic) => (
              <div className={$['topic-wrapper']} key={topicKey}>
                <div
                  className={classNames($['topic'], {
                    [$['chosen']]: pageState.topic === topicKey,
                  })}
                  onClick={() => {
                    movePage(topicKey, 1)
                  }}
                >
                  {topics[topicKey]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {isSigned ? (
          <>
            <TipsList tipsData={tipsData} isLoading={isLoading} />
            <Pagination
              currentPage={pageState.page}
              totalPage={totalPage}
              onPressPage={(page) => {
                movePage(pageState.topic, page)
              }}
            />
          </>
        ) : (
          <RequireAuth className={$['auth']} />
        )}
      </section>

      {isSigned && (
        <div className={$['new-wrapper']}>
          <button className={$['new']}>
            <EodiroLink
              href={`tips/editor?topic=${
                pageState.topic ? pageState.topic : 'etc'
              }`}
              absolute
            />
            <i className={classNames('f7-icons', $['pencil'])}>square_pencil</i>
            새 꿀팁 작성
          </button>
        </div>
      )}

      <div className={$['illustration-wrapper']}>
        <LyingDownIllust className={$['illustration']} />
      </div>
    </Body>
  )
}

export default TipsPage
