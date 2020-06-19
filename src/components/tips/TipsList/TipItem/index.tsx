import $ from './style.module.scss'
import { ArrowBlock } from '@/components/ui'
import EodiroLink from '@/components/utils/EodiroLink'
import { TipListResponse } from '@payw/eodiro-one-api/database/models/tip'
import classNames from 'classnames'

export type TipItemProps = {
  tipData: TipListResponse
}

const TipItem: React.FC<TipItemProps> = ({ tipData }) => {
  return (
    <ArrowBlock className={$['tip-item']}>
      <EodiroLink absolute href={`tips/item/${tipData.id}`} />

      <span className={$['information']}>
        <span className={$['author']}>{tipData.randomNickname}</span>
        <span className={$['uploaded-at']}>{tipData.createdAt}</span>
      </span>
      <h1 className={$['title']}>{tipData.title}</h1>
      <span className={$['responses']}>
        <span className={$['likes']}>
          <i className={classNames('f7-icons', $['thumsup'])}>hand_thumbsup</i>
          <span className={$['quantity']}>3</span>
        </span>

        <span className={$['scraps']}>
          <i className={classNames('f7-icons', $['star'])}>star</i>
          <span className={$['quantity']}>5</span>
        </span>
      </span>
    </ArrowBlock>
  )
}

export default TipItem
