import classNames from 'classnames'
import Link from 'next/link'

export type EodiroLinkProps = {
  /** @deprecated */
  as?: string
  href: string
  absolute?: boolean
  className?: any
  /** @deprecated */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

/**
 * @deprecated
 */
const EodiroLink: React.FC<EodiroLinkProps> = ({
  children,
  as,
  href,
  absolute,
  className,
  onClick,
}) => {
  return (
    <Link href={href} as={as}>
      <a
        href={href}
        className={classNames(className, {
          'absolute-link': absolute,
        })}
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
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
