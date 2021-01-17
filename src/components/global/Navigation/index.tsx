import { authState } from '@/atoms/auth'
import {
  navHiddenState,
  navScrolledState,
  navTitleState,
} from '@/atoms/navigation'
import EodiroLogo from '@/components/global/icons/EodiroLogo'
import { Icon } from '@/components/ui/Icon'
import classNames from 'classnames'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useRecoilValue } from 'recoil'
import {
  NavMenuOpenDispatchContext,
  NavMenuOpenStateContext,
} from './navigation-context'
import $ from './style.module.scss'

export * from './navigation-context'

type NavItemProps = {
  className?: string
  to: string
  title: string
}

const NavItem: React.FC<NavItemProps> = ({ to, title, className }) => {
  const setMenuOpen = useContext(NavMenuOpenDispatchContext)

  return (
    <Link href={to}>
      <button
        type="button"
        className={classNames($['en-menu-link'], className)}
        onClick={() => setMenuOpen(false)}
      >
        <li className={$['en-menu-item']}>{title}</li>
      </button>
    </Link>
  )
}

const BgBar: React.FC = () => {
  return <div className={classNames('en-bar', $['en-bar'])} />
}

const PageAppTitle: React.FC = () => {
  const navHidden = useRecoilValue(navHiddenState)
  const pageTitle = useRecoilValue(navTitleState)

  return (
    <h1 className={classNames($['page-app-title'], !navHidden && $['show'])}>
      {pageTitle}
    </h1>
  )
}

const NavMenus: React.FC = () => {
  const { userId } = useRecoilValue(authState)
  const menuOpened = useContext(NavMenuOpenStateContext)

  return (
    <ul
      className={classNames($['en-menus-container'], {
        [$['opened']]: menuOpened,
      })}
    >
      {/* <NavItem title="빈 강의실" to="/vacant" /> */}
      {/* <NavItem title="강의 검색" to="/lectures" /> */}
      {/* <NavItem title="공지 알림" to="/notice-notifications" /> */}
      <NavItem title="커뮤니티" to="/community" />
      {/* <NavItem title="학식 메뉴" to="/cafeteria" /> */}
      <NavItem title="오픈소스" to="/opensource" />
      {/* <NavItem title="꿀팁" to="/tips" /> */}
      <NavItem
        title={userId ? '마이페이지' : '로그인'}
        className={userId ? $['my'] : $['signin']}
        to={userId ? '/my' : '/login'}
      />
    </ul>
  )
}

const Navigation: React.FC = () => {
  const navScrolled = useRecoilValue(navScrolledState)
  const setMenuOpen = useContext(NavMenuOpenDispatchContext)

  return (
    <nav
      id={$['eodiro-navigation']}
      className={classNames({
        [$['scrolled']]: navScrolled,
      })}
    >
      <BgBar />

      <div className={$['en-wrapper']}>
        <div className="flex items-center justify-center w-10 ml-3 mr-4">
          <Link href="/">
            <a className="flex">
              <EodiroLogo fill="#ff3852" className="w-full h-full" />
            </a>
          </Link>
        </div>

        <PageAppTitle />

        <NavMenus />

        <button
          type="button"
          className={$['more-tappable']}
          onClick={(e): void => {
            e.preventDefault()
            setMenuOpen((open) => {
              return !open
            })
          }}
        >
          <Icon name="ellipsis_vertical" className={$['more-icon']} />
        </button>
      </div>
    </nav>
  )
}

export default React.memo(Navigation)
