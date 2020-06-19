import { useEffect, useState } from 'react'

import $ from './style.module.scss'
import ApiHost from '@/modules/api-host'
import { ArrowBlock } from '../../ui'
import Body from '@/layouts/BaseLayout/Body'
import EodiroLink from '@/components/utils/EodiroLink'
import { LyingDownIllust } from '../../illustrations'
import { TipListResponse } from '@payw/eodiro-one-api/database/models/tip'
import { TipTopic } from '@prisma/client'
import TipsList from '../TipsList'
import classNames from 'classnames'
import { getAccessToken } from '@/api'
import { oneApiClient } from '@payw/eodiro-one-api'
import { useRouter } from 'next/router'

type TipsPageQuery = {
  topic?: TipTopic
  page?: number
}

export type TipsPageProps = {
  topics: Record<string, string>
}

const TipsPage: React.FC<TipsPageProps> = ({ topics }) => {
  const [tipsData, setTipsData] = useState<TipListResponse[]>([])

  const [pageState, setPageState] = useState<TipsPageQuery>({
    topic: undefined,
    page: undefined,
  })

  useEffect(() => {
    const { topic, page } = pageState

    async function fetchNewData() {
      const response = await oneApiClient(ApiHost.getHost(), {
        action: 'getTips',
        data: {
          accessToken: await getAccessToken(),
          topic,
          page,
        },
      })

      setTipsData(response.data.tips)
    }

    fetchNewData()

    router.replace({
      pathname: router.pathname,
      query: {
        topic,
        page,
      },
    })
  }, [pageState])

  const router = useRouter()

  useEffect(() => {
    const { topic, page: pageInQuery } = router.query as {
      topic: TipTopic
      page: string
    }
    const page = parseInt(pageInQuery as string) || 1

    router.replace({
      pathname: router.pathname,
      query: {
        topic,
        page,
      },
    })

    setPageState({
      topic,
      page,
    })
  }, [])

  return (
    <Body
      pageTitle="꿀팁"
      titleAlign="center"
      browserTitle="어디로 | 꿀팁"
      bodyClassName={$['archive-page']}
    >
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
                  setPageState({
                    ...pageState,
                    topic: undefined,
                  })
                }}
              >
                전체
              </div>
            </div>

            {Object.keys(topics).map((topicKey) => (
              <div className={$['topic-wrapper']} key={topicKey}>
                <div
                  className={classNames($['topic'], {
                    [$['chosen']]: pageState.topic === topicKey,
                  })}
                  onClick={() => {
                    setPageState({
                      ...pageState,
                      topic: topicKey as TipTopic,
                    })
                  }}
                >
                  {topics[topicKey]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <TipsList tipsData={tipsData} />
      </section>

      <div className={$['new-wrapper']}>
        <button className={$['new']}>
          <EodiroLink href="tips/editor" absolute />
          <i className={classNames('f7-icons', $['pencil'])}>square_pencil</i>새
          꿀팁 작성
        </button>
      </div>

      <div className={$['illustration-wrapper']}>
        <LyingDownIllust className={$['illustration']} />
      </div>
    </Body>
  )
}

export default TipsPage
