import { AuthContext, useAuth } from '@/pages/_app'
import {
  NavHiddenStateContext,
  NavMenuOpenDispatchContext,
  NavMenuOpenStateContext,
  NavScrollStateContext,
  NavTitleStateContext,
} from './navigation-context'
import React, { useContext } from 'react'

import $ from './style.module.scss'
import EodiroLink from '@/components/utils/EodiroLink'
import EodiroLogo from '@/components/global/icons/EodiroLogo'
import { VerticalThreeDotsIcon } from '@/components/global/icons'
import classNames from 'classnames'
import { isApp } from '@/modules/booleans/is-app'
import { reactNativeWebViewPostMessage } from '@/modules/native/react-native-webview'

export * from './navigation-context'

type NavItemProps = {
  className?: string
  to: string
  title: string
}

const NavItem: React.FC<NavItemProps> = ({ to, title, className }) => {
  const setMenuOpen = useContext(NavMenuOpenDispatchContext)

  return (
    <EodiroLink
      href={to}
      className={classNames($['en-menu-link'], className)}
      onClick={() => setMenuOpen(false)}
    >
      <li className={$['en-menu-item']}>{title}</li>
    </EodiroLink>
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
  const isSigned = useContext(AuthContext).isSigned
  const menuOpened = useContext(NavMenuOpenStateContext)

  return (
    <ul
      className={classNames($['en-menus-container'], {
        [$['opened']]: menuOpened,
      })}
    >
      <NavItem title="빈 강의실" to="/vacant" />
      <NavItem title="강의 검색" to="/lectures" />
      <NavItem title="공지 알림" to="/notice-notifications" />
      <NavItem title="학식 메뉴" to="/cafeteria" />
      <NavItem title="꿀팁" to="/tips" />
      <NavItem
        title={isSigned ? '마이페이지' : '로그인'}
        className={isSigned ? $['my'] : $['signin']}
        to={isSigned ? '/my' : '/signin'}
      />
    </ul>
  )
}

const Navigation: React.FC = () => {
  const isScrolled = useContext(NavScrollStateContext)
  const setMenuOpen = useContext(NavMenuOpenDispatchContext)
  const { isSigned } = useAuth()

  return (
    <nav
      id={$['eodiro-navigation']}
      className={classNames(isScrolled && $['scrolled'])}
    >
      <BgBar />

      <div className={$['en-wrapper']}>
        {isApp() && location.pathname === '/' ? (
          <div className={$['spacer']} />
        ) : isApp() ? (
          <button
            className={$['go-back']}
            onClick={() => {
              reactNativeWebViewPostMessage({
                key: 'goBack',
              })
            }}
          >
            <i
              className="f7-icons"
              style={{
                fontSize: 25,
              }}
            >
              arrow_left
            </i>
          </button>
        ) : (
          <EodiroLink href="/" className={$['home-link']}>
            <EodiroLogo className={$['eodiro-logo']} fill="#ff3852" />
          </EodiroLink>
        )}

        <PageAppTitle />

        <NavMenus />

        {isApp() ? (
          <EodiroLink href={isSigned ? '/my' : '/signin'}>
            <div className={$['app-nav-right-button']}>
              {location.pathname !== '/signin' && location.pathname !== '/my' && (
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
          </EodiroLink>
        ) : (
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
        )}
      </div>
    </nav>
  )
}

export default React.memo(Navigation)
