import Time from '@/modules/time'

export default function FriendlyTime({
  time,
  className,
}: {
  time: string | Date
  className?: string
}): JSX.Element {
  return <span className={className}>{Time.friendly(time)}</span>
}
