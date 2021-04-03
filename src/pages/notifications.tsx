import { Tile } from '@/components/ui'
import { Icon } from '@/components/ui/Icon'
import Grid from '@/components/ui/layouts/Grid'
import Body from '@/layouts/BaseLayout/Body'
import Link from 'next/link'
import $ from './notifications.module.scss'

export default function NotificationsPage() {
  return (
    <Body pageTitle="실시간 알림 설정" bodyClassName={$['notifications-page']}>
      <p className="text-xl text-base-gray font-medium">
        어디로는{' '}
        <Link href="/notice-notifications">
          <a>학교 공지사항</a>
        </Link>
        , 커뮤니티 댓글 등을 텔레그램 봇을 통해 실시간으로 알려주는 서비스를
        제공합니다. 다음은 알림을 설정하는 간단한 방법입니다.
      </p>

      <div className={$['tutorial-step']}>
        <h2 className={$['tutorial-step-header']}>1. 텔레그램 앱 설치</h2>
        <p className={$['tutorial-step-description']}>
          어디로의 알림을 받으려면 텔레그램이 필요합니다.
        </p>

        <div className={$['installation-platforms']}>
          <Grid proportion="small" fit>
            <a
              className={$['platform-link']}
              target="_blank"
              rel="noreferrer"
              href="https://apps.apple.com/kr/app/telegram-messenger/id686449807"
            >
              <Tile flat className={$['platform']} customHeight>
                <Icon name="logo_apple" className={$['platform-logo']} />
                <span className={$['platform-name']}>iOS / iPadOS</span>
              </Tile>
            </a>
            <a
              className={$['platform-link']}
              target="_blank"
              rel="noreferrer"
              href="https://apps.apple.com/kr/app/telegram/id747648890?mt=12"
            >
              <Tile flat className={$['platform']} customHeight>
                <Icon name="logo_apple" className={$['platform-logo']} />
                <span className={$['platform-name']}>macOS</span>
              </Tile>
            </a>
            <a
              className={$['platform-link']}
              target="_blank"
              rel="noreferrer"
              href="https://play.google.com/store/apps/details?id=org.telegram.messenger&hl=ko&gl=US"
            >
              <Tile flat className={$['platform']} customHeight>
                <Icon name="logo_android" className={$['platform-logo']} />
                <span className={$['platform-name']}>Android</span>
              </Tile>
            </a>
            <a
              className={$['platform-link']}
              target="_blank"
              rel="noreferrer"
              href="https://www.microsoft.com/ko-kr/p/telegram-desktop/9nztwsqntd0s?activetab=pivot:overviewtab"
            >
              <Tile flat className={$['platform']} customHeight>
                <Icon name="logo_windows" className={$['platform-logo']} />
                <span className={$['platform-name']}>Windows</span>
              </Tile>
            </a>
          </Grid>
        </div>
      </div>

      <div className={$['tutorial-step']}>
        <h2 className={$['tutorial-step-header']}>2. 어디로 봇과 대화 시작</h2>
        <p className={$['tutorial-step-description']}>
          연락처에서{' '}
          <span className="font-semibold text-eodiro-primary-color">
            eodiro_bot
          </span>
          을 검색하고 대화를 시작합니다.
        </p>

        <img
          src="/images/search-eodiro-bot-in-telegram.jpg"
          alt="어디로봇 친구 추가"
          className="max-w-md w-full rounded-outer"
        />
      </div>

      <div className={$['tutorial-step']}>
        <h2 className={$['tutorial-step-header']}>3. 로그인</h2>
        <p className={$['tutorial-step-description']}>
          <span className="font-semibold text-eodiro-primary-color">
            /login
          </span>
          을 입력하여 어디로 아이디와 비밀번호로 로그인합니다.
        </p>

        <img
          src="/images/eodiro-bot-login.jpeg"
          alt="어디로봇 친구 추가"
          className="max-w-md w-full rounded-outer"
        />
      </div>

      <p className="mt-12 text-xl font-semibold">
        설정 끝! 이제부터 등록해둔 학교 공지사항이 새로 올라오거나 커뮤니티에
        댓글이 달리면 텔레그램으로 푸시 알림이 도착합니다.
      </p>

      <div className={$['tutorial-step']}>
        <h2 className={$['tutorial-step-header']}>4. 로그아웃</h2>
        <p className={$['tutorial-step-description']}>
          <span className="font-semibold text-eodiro-primary-color">
            /logout
          </span>
          을 입력하여 알림 받기를 중단할 수 있습니다.
        </p>
      </div>
    </Body>
  )
}
