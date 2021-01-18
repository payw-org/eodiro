import $$ from 'classnames'
import $ from './Separator.module.scss'

/**
 * @deprecated Use `<hr />` instead.
 */
export default function Separator({ className }: { className?: string }) {
  return <div className={$$($['separator'], className)} />
}
