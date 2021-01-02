import { authState } from '@/atoms/auth'
import { VerticalThreeDotsIcon } from '@/components/global/icons'
import EodiroLogo from '@/components/global/icons/EodiroLogo'
import { isApp } from '@/modules/booleans/is-app'
import classNames from 'classnames'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useRecoilValue } from 'recoil'
import {
  NavHiddenStateContext,
  NavMenuOpenDispatchContext,
  NavMenuOpenStateContext,
  NavScrollStateContext,
  NavTitleStateContext,
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
  const hidden = useContext(NavHiddenStateContext)
  const title = useContext(NavTitleStateContext)

  return (
    <h1 className={classNames($['page-app-title'], !hidden && $['show'])}>
      {title}
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
  const isScrolled = useContext(NavScrollStateContext)
  const setMenuOpen = useContext(NavMenuOpenDispatchContext)
  const { userId } = useRecoilValue(authState)

  return (
    <nav
      id={$['eodiro-navigation']}
      className={classNames(isScrolled && $['scrolled'])}
    >
      <BgBar />

      <div className={$['en-wrapper']}>
        {isApp() && window.location.pathname === '/' ? (
          <div className={$['spacer']} />
        ) : (
          <Link href="/">
            <a className={$['home-link']}>
              <EodiroLogo className={$['eodiro-logo']} fill="#ff3852" />
            </a>
          </Link>
        )}

        <PageAppTitle />

        <NavMenus />

        {isApp() ? (
          <Link href={userId ? '/my' : '/login'}>
            <div className={$['app-nav-right-button']}>
              {window.location.pathname !== '/login' &&
                window.location.pathname !== '/my' && (
                  <i
                    className="f7-icons"
                    style={{
                      fontSize: 25,
                    }}
                  >
                    person_crop_circle
                  </i>
                )}
            </div>
          </Link>
        ) : (
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
            <VerticalThreeDotsIcon className={$['more-icon']} />
          </button>
        )}
      </div>
    </nav>
  )
}

export default React.memo(Navigation)
