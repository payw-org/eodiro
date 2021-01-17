import $$ from 'classnames'
import $ from './Separator.module.scss'

export default function Separator({ className }: { className?: string }) {
  return <div className={$$($['separator'], className)} />
}
