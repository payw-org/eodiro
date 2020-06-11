export type TipsPageProps = unknown

import $ from './style.module.scss'
import { ArrowBlock } from '../../ui'
import Body from '@/layouts/BaseLayout/Body'
import EodiroLink from '@/components/utils/EodiroLink'
import { LyingDownIllust } from '../../illustrations'
import Time from '@/modules/time'
import { Tip } from '../types'
import TipsList from '../TipsList'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useState } from 'react'

const TipsPage: React.FC<TipsPageProps> = () => {
  const [tipsData, setTipsData] = useState<Tip[]>(
    [...new Array(10)].fill({
      tipId: 0,
      title: '나만 알고 있는 중앙대 꿀팁',
      author: 'Garden Lee',
      uploadedAt: Time.friendly(dayjs().toDate()),
    })
  )

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
              <div className={classNames($['topic'], $['chosen'])}>전체</div>
            </div>
            <div className={$['topic-wrapper']}>
              <div className={$['topic']}>새내기</div>
            </div>
            <div className={$['topic-wrapper']}>
              <div className={$['topic']}>대학생활</div>
            </div>
            <div className={$['topic-wrapper']}>
              <div className={$['topic']}>면접</div>
            </div>
            <div className={$['topic-wrapper']}>
              <div className={$['topic']}>인턴</div>
            </div>
            <div className={$['topic-wrapper']}>
              <div className={$['topic']}>취업</div>
            </div>
            <div className={$['topic-wrapper']}>
              <div className={$['topic']}>동아리</div>
            </div>
            <div className={$['topic-wrapper']}>
              <div className={$['topic']}>맛집</div>
            </div>
            <div className={$['topic-wrapper']}>
              <div className={$['topic']}>팀플</div>
            </div>
            <div className={$['topic-wrapper']}>
              <div className={$['topic']}>강의평가</div>
            </div>
            <div className={$['topic-wrapper']}>
              <div className={$['topic']}>벌꿀</div>
            </div>
            <div className={$['topic-wrapper']}>
              <div className={$['topic']}>오소리</div>
            </div>
            <div className={$['topic-wrapper']}>
              <div className={$['topic']}>리얼후라이</div>
            </div>
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
