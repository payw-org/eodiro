import EodiroLink from '@/components/utils/EodiroLink'
import classNames from 'classnames'
import $ from './style.module.scss'

export type LiveEntranceProps = unknown

const LiveEntrance: React.FC<LiveEntranceProps> = () => {
  return (
    <div className={classNames($['live-entrance'], 'position-relative')}>
      <EodiroLink absolute href="/live" />

      <div className={$['blink']} />
      <span className={$['label']}>어디로 LIVE</span>
    </div>
  )
}

export default LiveEntrance
