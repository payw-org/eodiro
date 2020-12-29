import { friendlyTime } from '@/modules/time'
import classNames from 'classnames'
import $ from './FriendlyTime.module.scss'

export const FriendlyTime: React.FC<{
  time: string | Date
  className?: string
}> = ({ time, className }) => (
  <span className={classNames($['friendly-time'], className)}>
    {friendlyTime(time)}
  </span>
)

export default FriendlyTime
