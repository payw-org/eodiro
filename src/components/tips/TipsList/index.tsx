import $ from './style.module.scss'
import { Tip } from '../types'
import TipItem from './TipItem'

export type TipsListProps = {
  tipsData: Tip[]
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
