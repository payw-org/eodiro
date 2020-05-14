import {
  NavHiddenStateContext,
  NavMenuOpenDispatchContext,
  NavMenuOpenStateContext,
  NavScrollStateContext,
  NavTitleStateContext,
} from './navigation-context'
import React, { useContext } from 'react'

import $ from './style.module.scss'
import { AuthContext } from '@/pages/_app'
import EodiroLogo from '@/components/global/icons/EodiroLogo'
import Link from 'next/link'
import { VerticalThreeDotsIcon } from '@/components/global/icons'
import classNames from 'classnames'

export * from './navigation-context'

type NavItemProps = {
  className?: string
  to: string
  title: string
}

const NavItem: React.FC<NavItemProps> = ({ to, title, className }) => {
  return (
    <Link href={to}>
      <a className={classNames($['en-menu-link'], className)}>
        <li className={$['en-menu-item']}>{title}</li>
      </a>
    </Link>
  )
}

const BgBar: React.FC = () => {
  const isScrolled = useContext(NavScrollStateContext)
  const menuOpened = useContext(NavMenuOpenStateContext)

  return (
    <div
      className={classNames(
        $['en-bar'],
        (isScrolled || menuOpened) && $['scrolled']
      )}
    />
  )
}

const PageAppTitle: React.FC = () => {
  const hidden = useContext(NavHiddenStateContext)
  const title = useContext(NavTitleStateContext)

  return (
    <h1 className={classNames($['page-app-title'], !hidden && $['show'])}>
      {title}
    </h1>
  )
}

const NavMenus: React.FC = () => {
  const isSigned = useContext(AuthContext).isSigned
  const menuOpened = useContext(NavMenuOpenStateContext)

  return (
    <ul
      className={classNames(
        $['en-menus-container'],
        menuOpened ? $['opened'] : ''
      )}
    >
      <NavItem title="빈 강의실" to="/vacant" />
      <NavItem title="강의 검색" to="/lectures" />
      <NavItem title="학식 메뉴" to="/cafeteria" />
      <NavItem title="빼빼로 광장" to="/square" />
      <NavItem
        title={isSigned ? '마이페이지' : '로그인'}
        className={isSigned ? $['my'] : $['signin']}
        to={isSigned ? '/my' : '/signin'}
      />
    </ul>
  )
}

const Navigation: React.FC = () => {
  const setMenuOpen = useContext(NavMenuOpenDispatchContext)

  return (
    <nav id={$['eodiro-navigation']}>
      <BgBar />

      <div className={$['en-wrapper']}>
        <Link href="/">
          <a className={$['home-link']}>
            <EodiroLogo className={$['eodiro-logo']} fill="#ff3852" />
          </a>
        </Link>

        <PageAppTitle />

        <NavMenus />

        <div
          className={$['more-tappable']}
          onClick={(e): void => {
            e.preventDefault()
            setMenuOpen((open) => {
              return !open
            })
          }}
        >
          <VerticalThreeDotsIcon className={$['more-icon']} />
        </div>
      </div>
    </nav>
  )
}

export default React.memo(Navigation)
