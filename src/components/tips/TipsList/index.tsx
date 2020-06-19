import $ from './style.module.scss'
import TipItem from './TipItem'
import { TipListResponse } from '@payw/eodiro-one-api/database/models/tip'

export type TipsListProps = {
  tipsData: TipListResponse[]
}

const TipsList: React.FC<TipsListProps> = ({ tipsData: tips }) => {
  return (
    <div className={$['tips-list']}>
      {tips.map((tip, i) => (
        <TipItem key={i} tipData={tip} />
      ))}
    </div>
  )
}

export default TipsList
