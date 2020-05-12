import '@/assets/styles/global/globalstyle.scss'
import './_document.scss'

import App, { AppContext, AppInitialProps } from 'next/app'
import { NextComponentType, NextPageContext } from 'next'
import React, { createContext, useContext, useState } from 'react'
import { Tokens, TokensPack } from '@/api'

import BaseLayout from '@/layouts/BaseLayout'
import Head from 'next/head'
import { Router } from 'next/router'
import { getAuthState } from '@/modules/server/get-auth-state'
import { isClient } from '@/modules/utils/is-client'
import { isDev } from '@/modules/utils/is-dev'

if (isClient()) {
  const w = globalThis as any
  const topbar = w.topbar
  topbar.config({
    barThickness: 2,
    barColors: {
      '0': '#ff3852',
      '1': '#ff3852',
    },
  })
  Router.events.on('routeChangeStart', topbar.show)
  Router.events.on('routeChangeComplete', topbar.hide)
  Router.events.on('routeChangeError', topbar.hide)
}

type AuthProps = {
  tokens: TokensPack
  isSigned: boolean
  isAdmin: boolean
  userId: number
}
export const AuthContext = createContext({} as AuthProps)

export const useAuth = (): AuthProps => {
  const authContext = useContext(AuthContext)
  return authContext
}

export const AuthProvider: React.FC<AuthProps> = (props) => {
  const [tokens] = useState(
    props.tokens || { accessToken: undefined, refreshToken: undefined }
  )
  const [isSigned] = useState(props.isSigned)
  const [isAdmin] = useState(props.isAdmin)
  const [userId] = useState(props.userId)

  return (
    <AuthContext.Provider
      value={{
        tokens,
        isSigned,
        isAdmin,
        userId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

interface EodiroAppInitialProps extends AppInitialProps {
  authProps: AuthProps
}

interface EodiroPageContext extends NextPageContext {
  isSigned: boolean
  isAdmin: boolean
}

interface EodiroAppContext extends AppContext {
  ctx: EodiroPageContext
}

export type EodiroPage<P = {}, IP = P> = NextComponentType<
  EodiroPageContext,
  IP,
  P & AuthProps
>

export default class EodiroApp extends App<EodiroAppInitialProps> {
  static async getInitialProps({
    Component,
    ctx,
  }: EodiroAppContext): Promise<EodiroAppInitialProps> {
    const { req, res } = ctx

    const tokens = await Tokens.get(ctx.req)
    const authProps: AuthProps = {
      tokens,
      isSigned: false,
      isAdmin: false,
      userId: null,
    }

    const authState = await getAuthState({ req, res })
    authProps.isSigned = authState.isSigned
    authProps.isAdmin = authState.isAdmin
    authProps.userId = authState.userId

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps, authProps }
  }

  componentDidMount(): void {
    const currentpage = sessionStorage.getItem('currentpage')
    if (currentpage) {
      sessionStorage.setItem('lastpage', currentpage)
    }
    sessionStorage.setItem('currentpage', location.pathname)
  }

  public render(): JSX.Element {
    const { Component, pageProps, authProps } = this.props

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>어디로</title>
          <meta
            key="description"
            property="desciption"
            content="중앙대 학생들만을 위한 특별한 서비스"
          />
          <meta
            property="og:image"
            content="https://eodiro.com/open-graph/open_graph.png"
          />
          <script src="/modules/topbar.min.js"></script>

          {/* Google Analytics */}
          {!isDev() && (
            <script
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
        <AuthProvider {...authProps}>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </AuthProvider>
      </>
    )
  }
}
