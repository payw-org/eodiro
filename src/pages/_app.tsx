import PageInfo from '@/components/utils/PageInfo'
import { eodiroConsts } from '@/constants'
import { phrases } from '@/constants/phrases'
import BaseLayout from '@/layouts/BaseLayout'
import { eodiroRequest } from '@/modules/eodiro-request'
import { reactNativeWebViewPostMessage } from '@/modules/native/react-native-webview'
import { isDev } from '@/modules/utils/is-dev'
import 'intersection-observer'
import { AppProps } from 'next/app'
import { AppContextType } from 'next/dist/next-server/lib/utils'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import 'swiper/swiper.scss'
import { SWRConfig } from 'swr'
import 'tailwindcss/tailwind.css'
import { getCookie } from './api/cookie'
import './_document.scss'
// Always put this line after any other library styles.
// In VSCode, run command "Save without formatting". (cmd K + S)
import '@/assets/styles/global/globalstyle.scss'

type EdrAppProps = AppProps & {
  shouldCheckAuth: boolean
}

const cachedScrollPositions: [x: number, y: number][] = []

export default function EdrApp({
  Component,
  pageProps,
  shouldCheckAuth,
}: EdrAppProps) {
  const router = useRouter()

  useEffect(() => {
    let f: (e: MessageEvent) => void
    window.addEventListener(
      'message',
      (f = (e: MessageEvent) => {
        if (e.data === 'reload') {
          router.reload()
        } else {
          try {
            const parsed = JSON.parse(e.data)

            if (parsed.type === 'redirect') {
              const splitted = parsed.url.split('?')
              const pathnameOnly = splitted[0]
              const query = splitted[1]

              if (window.location.pathname === pathnameOnly) {
                window.location.search = `?${query}`
              } else {
                router.push(parsed.url)
              }
            }
          } catch (parseError) {
            //
          }
        }
      })
    )

    return () => {
      window.removeEventListener('message', f)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Set topbar
    const w = globalThis as any
    const { topbar } = w
    topbar.config({
      barThickness: 3,
      barColors: {
        '0': '#ff3852',
        '1': '#ff3852',
      },
      shadowBlur: 0,
      shadowColor: 'rgba(0, 0, 0, 0)',
      className: 'eodiro-topbar',
    })
    Router.events.on('routeChangeStart', topbar.show)
    Router.events.on('routeChangeComplete', () => {
      ;(document.activeElement as any)?.blur()
      topbar.hide()
    })
    Router.events.on('routeChangeError', () => {
      ;(document.activeElement as any)?.blur()
      topbar.hide()
    })

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
      let shouldScrollRestore: { x: number; y: number } | false = false

      Router.events.on('routeChangeStart', () => {
        if (!shouldScrollRestore) {
          cachedScrollPositions.push([window.scrollX, window.scrollY])
        }
      })

      Router.events.on('routeChangeComplete', () => {
        if (shouldScrollRestore) {
          const { x, y } = shouldScrollRestore
          window.scrollTo(x, y)
          shouldScrollRestore = false
        } else {
          window.scrollTo(0, 0)
        }
      })

      Router.beforePopState(() => {
        if (cachedScrollPositions.length > 0) {
          const [x, y] = cachedScrollPositions.pop() as [number, number]
          shouldScrollRestore = { x, y }
        }

        return true
      })
    }

    reactNativeWebViewPostMessage({
      isLoaded: true,
    })
  }, [])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"
        />
        {/* @deprecated */}
        <script src="/modules/topbar.min.js" />

        {/* Google Analytics */}
        {!isDev() && (
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
              
              ga('create', 'UA-140443623-1', 'auto');
              ga('send', 'pageview');`,
            }}
          />
        )}
      </Head>
      <PageInfo
        title={{
          subject: '어디로',
          onlySubject: true,
        }}
        description={phrases.SLOGAN}
        ogImage="https://eodiro.com/open-graph/open_graph.png"
      />
      <RecoilRoot>
        <SWRConfig
          value={{
            fetcher: async (url) => {
              const data = await eodiroRequest({
                method: 'GET',
                url,
              })

              return data
            },
          }}
        >
          <BaseLayout shouldCheckAuth={shouldCheckAuth}>
            <Component {...pageProps} />
          </BaseLayout>
        </SWRConfig>
      </RecoilRoot>
    </>
  )
}

EdrApp.getInitialProps = async ({ ctx }: AppContextType) => {
  const { req } = ctx

  let shouldCheckAuth = false

  if (req) {
    const cookie = getCookie(req)

    if (
      cookie[eodiroConsts.EDR_ACCESS_TOKEN_NAME] ||
      cookie[eodiroConsts.EDR_REFRESH_TOKEN_NAME]
    ) {
      shouldCheckAuth = true
    }
  }

  return { shouldCheckAuth }
}
