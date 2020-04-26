import './index.scss'

import ApolloClient, { gql } from 'apollo-boost'
import {
  CafeteriaAppIcon,
  LecturesAppIcon,
  OpensourceAppIcon,
  SquareAppIcon,
  VacantAppIcon,
} from '@/components/global/icons'
import React, { useEffect, useState } from 'react'

import ApiHost from '@/modules/api-host'
import Body from '@/layouts/BaseLayout/Body'
import { ColorIcon } from '@/types'
import Grid from '@/layouts/Grid'
import Head from 'next/head'
import { NextPage } from 'next'
import classNames from 'classnames'

type HomeFeatureBoxProps = {
  title: string
  to: string
  Icon: ColorIcon
  label?: 'new' | 'update' | 'beta'
}

const HomeFeatureBox: React.FC<HomeFeatureBoxProps> = ({
  title,
  to,
  Icon,
  label,
}) => {
  return (
    <button className="feature-box">
      <div className="wrapper">
        <Icon className="icon" />
        <h2 className="feature-name">{title}</h2>
        <a className="absolute-link" href={to} />

        {label !== undefined && (
          <span className="label">{label.toUpperCase()}</span>
        )}
      </div>
    </button>
  )
}

const HomePage: NextPage = () => {
  const [isAnimated, setIsAnimated] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const documentFonts = (document as any).fonts

    if (!documentFonts) {
      setTimeout(() => {
        setAnimate(true)
      }, 200)
    } else {
      documentFonts.ready.then(() => {
        setAnimate(true)
      })
    }
  }, [])

  // useEffect(() => {
  //   const client = new ApolloClient({
  //     uri: ApiHost.getHost() + '/graphql',
  //   })
  //   const query = gql`
  //     query GET_USER {
  //       users {
  //         portalId
  //         randomNickname
  //       }
  //     }
  //   `
  //   client.query({ query }).then((result) => {
  //     console.log(result)
  //   })
  // }, [])

  return (
    <>
      <Head>
        <title>어디로</title>
      </Head>
      <Body pageTitle="어디로" titleHidden centered>
        <div id="eodiro-home">
          <h1 className="header overlay-sentinel-spot title-sentinel-spot">
            <div
              className={classNames('text-wrapper', { animate })}
              onAnimationEnd={() => {
                setIsAnimated(true)
              }}
            >
              <span className={classNames('name', { shadowed: isAnimated })}>
                어디로
              </span>
            </div>
          </h1>
          <p className="manifesto">
            <span className={classNames('text', { animate })}>
              중앙대 학생들만을 위한 특별한 서비스
            </span>
          </p>
          <div className="features">
            <Grid>
              <HomeFeatureBox
                title="빈 강의실"
                to="/vacant"
                Icon={VacantAppIcon}
              />
              <HomeFeatureBox
                title="강의 검색"
                to="/lectures"
                Icon={LecturesAppIcon}
              />
              <HomeFeatureBox
                title="학식 메뉴"
                to="/cafeteria"
                Icon={CafeteriaAppIcon}
              />
              <HomeFeatureBox
                title="빼빼로 광장"
                to="/square"
                Icon={SquareAppIcon}
                label="beta"
              />
              <HomeFeatureBox
                title="오픈 소스"
                to="/opensource"
                Icon={OpensourceAppIcon}
                label="update"
              />
            </Grid>
          </div>
        </div>
      </Body>
    </>
  )
}

export default HomePage
