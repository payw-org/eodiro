import Link from 'next/link'
import cn from 'classnames'
import { isApp } from '@/modules/booleans/is-app'

export type EodiroLinkProps = {
  as?: string
  href: string
  absolute?: boolean
  className?: any
}

const EodiroLink: React.FC<EodiroLinkProps> = ({
  children,
  as,
  href,
  absolute,
  className,
}) => {
  return isApp() ? (
    <a
      href={href}
      className={cn(className, {
        'absolute-link': absolute,
      })}
    >
      {children}
    </a>
  ) : (
    <Link as={as} href={href}>
      <a
        className={cn(className, {
          'absolute-link': absolute,
        })}
      >
        {children}
      </a>
    </Link>
  )
}

export default EodiroLink
