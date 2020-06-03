import Link from 'next/link'
import cn from 'classnames'
import { isApp } from '@/modules/booleans/is-app'

export type EodiroLinkProps = {
  as?: string
  href: string
  absolute?: boolean
  className?: any
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const EodiroLink: React.FC<EodiroLinkProps> = ({
  children,
  as,
  href,
  absolute,
  className,
  onClick,
}) => {
  return (
    <a
      href={as || href}
      className={cn(className, {
        'absolute-link': absolute,
      })}
      onClick={onClick}
    >
      {children}
    </a>
  )
  // return isApp() ? (
  //   <a
  //     href={as || href}
  //     className={cn(className, {
  //       'absolute-link': absolute,
  //     })}
  //   >
  //     {children}
  //   </a>
  // ) : (
  //   <Link as={as} href={href}>
  //     <a
  //       className={cn(className, {
  //         'absolute-link': absolute,
  //       })}
  //       onClick={onClick}
  //     >
  //       {children}
  //     </a>
  //   </Link>
  // )
}

export default EodiroLink
