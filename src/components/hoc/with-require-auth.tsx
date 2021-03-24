import { authState } from '@/atoms/auth'
import { eodiroConst } from '@/constants'
import Body from '@/layouts/BaseLayout/Body'
import { logInUrl } from '@/utils/page-urls'
import Link from 'next/link'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { Tile } from '../ui'
import { Icon } from '../ui/Icon'

export function withRequireAuth(Component: FC) {
  return function RequireAuthWrapperComponent() {
    const { isLoggedIn } = useRecoilValue(authState)

    if (isLoggedIn === undefined) {
      return <></>
    }

    if (isLoggedIn === true) {
      return <Component />
    }

    return (
      <Body pageTitle="로그인이 필요한 서비스" titleHidden centered>
        <div>
          <Link href={logInUrl}>
            <a>
              <Tile noArrow>
                <div
                  className={`${eodiroConst.TITLE_SENTINEL_SPOT} ${eodiroConst.OVERLAY_SENTINEL_SPOT} flex flex-col px-8 py-6`}
                >
                  <Icon
                    name="lock_fill"
                    className="text-eodiro-primary-color text-5xl"
                  />
                  <p className="text-xl font-semibold mt-4">
                    로그인이 필요한 서비스입니다.
                  </p>
                </div>
              </Tile>
            </a>
          </Link>
        </div>
      </Body>
    )
  }
}
