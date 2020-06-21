import $ from './style.module.scss'
import { Spinner } from '@/components/global/Spinner'
import TipItem from './TipItem'
import { TipListResponse } from '@payw/eodiro-one-api/database/models/tip'
import classNames from 'classnames'

export type TipsListProps = {
  tipsData: TipListResponse[]
  isLoading: boolean
}

const TipsList: React.FC<TipsListProps> = ({ tipsData: tips, isLoading }) => {
  return (
    <div className={$['tips-list']}>
      {isLoading ? (
        <div className={$['is-loading']}>
          <Spinner />
        </div>
      ) : tips.length > 0 ? (
        tips.map((tip, i) => <TipItem key={i} tipData={tip} />)
      ) : (
        <div className={$['empty']}>
          <i className={classNames('f7-icons', $['icon'])}>tray_fill</i>
          <span className={$['msg']}>아직 꿀팁이 없습니다.</span>
        </div>
      )}
    </div>
  )
}

export default TipsList
