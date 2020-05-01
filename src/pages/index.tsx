import './index.scss'

import React, { useEffect, useState } from 'react'

import Blocks from '@/components/global/icons/Blocks'
// import ApiHost from '@/modules/api-host'
import Body from '@/layouts/BaseLayout/Body'
import Door from '@/components/global/icons/Door'
import EodiroColors from '@/modules/styles/EodiroColors'
import Grid from '@/layouts/Grid'
import Head from 'next/head'
import Heart from '@/components/global/icons/Heart'
// import ApolloClient, { gql } from 'apollo-boost'
import { Magnifier } from '@/components/global/icons'
import { NextPage } from 'next'
import Spoon from '@/components/global/icons/Spoon'
import classNames from 'classnames'

type HomeFeatureBoxProps = {
  title: string
  to: string
  Icon: JSX.Element
  label?: 'new' | 'update' | 'beta'
}

const HomeFeatureBox: React.FC<HomeFeatureBoxProps> = ({
  title,
  to,
  Icon,
  label,
}) => {
  return (
    <button className="feature-box" data-component="">
      <div className="wrapper">
        {Icon}
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
                Icon={<Door fill={EodiroColors.secondary} className="icon" />}
              />
              <HomeFeatureBox
                title="강의 검색"
                to="/lectures"
                Icon={<Magnifier fill={EodiroColors.green1} className="icon" />}
              />
              <HomeFeatureBox
                title="학식 메뉴"
                to="/cafeteria"
                Icon={<Spoon fill={EodiroColors.blue1} className="icon" />}
              />
              <HomeFeatureBox
                title="빼빼로 광장"
                to="/square"
                Icon={<Blocks fill={EodiroColors.pink1} className="icon" />}
                label="beta"
              />
              <HomeFeatureBox
                title="오픈 소스"
                to="/opensource"
                Icon={<Heart fill={EodiroColors.violet1} className="icon" />}
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
