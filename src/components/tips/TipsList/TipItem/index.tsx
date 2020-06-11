import $ from './style.module.scss'
import { ArrowBlock } from '@/components/ui'
import EodiroLink from '@/components/utils/EodiroLink'
import { Tip } from '../../types'
import classNames from 'classnames'

export type TipItemProps = {
  tipData: Tip
}

const TipItem: React.FC<TipItemProps> = ({ tipData }) => {
  return (
    <ArrowBlock className={$['tip-item']}>
      <EodiroLink absolute href={`tips/item/${tipData.tipId}`} />

      <span className={$['information']}>
        <span className={$['author']}>{tipData.author}</span>
        <span className={$['uploaded-at']}>{tipData.uploadedAt}</span>
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
