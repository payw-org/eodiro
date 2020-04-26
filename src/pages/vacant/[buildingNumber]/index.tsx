import './style.scss'

import { ArrowBlock } from '@/components/ui'
import Body from '@/layouts/BaseLayout/Body'
import Grid from '@/layouts/Grid'
import Head from 'next/head'
import { NextPage } from 'next'
import React from 'react'
import ServerError from '@/components/global/ServerError'
import { VacantApi } from '@/api'
import { VacantClassrooms } from '@/api/vacant'
import dayjs from 'dayjs'
import mergeClassNames from '@/modules/merge-class-name'

type VacantClassroomsPageProps = {
  buildingNumber: string
  classroomsInfo: VacantClassrooms
}

const VacantClassroomsPage: NextPage<VacantClassroomsPageProps> = ({
  buildingNumber,
  classroomsInfo,
}) => {
  const now = dayjs()
  const nowAccumMin = now.hour() * 60 + now.minute()
  // const nowAccumMin = 720

  return (
    <>
      <Head>
        <title>빈 강의실 - 강의실</title>
      </Head>
      <Body pageTitle={buildingNumber}>
        <div id="eodiro-vacant-classrooms">
          {classroomsInfo ? (
            <Grid>
              {classroomsInfo.map((info) => {
                let inClass = false
                let percentage = 0
                let remainingHour = 0
                let remainingMin = Infinity
                let currentLectureName = ''

                for (let i = 0; i < info.lectures.length; i += 1) {
                  const lecture = info.lectures[i]
                  const startAccumMin = lecture.start_h * 60 + lecture.start_m
                  const endAccumMin = lecture.end_h * 60 + lecture.end_m

                  if (
                    startAccumMin <= nowAccumMin &&
                    endAccumMin >= nowAccumMin
                  ) {
                    inClass = true
                    currentLectureName = lecture.name
                    percentage =
                      ((nowAccumMin - startAccumMin) /
                        (endAccumMin - startAccumMin)) *
                      100
                  } else {
                    const sub = startAccumMin - nowAccumMin
                    if (sub >= 0 && sub < remainingMin) {
                      remainingMin = sub
                    }
                  }
                }

                if (remainingMin !== Infinity) {
                  const calcHour = Math.floor(remainingMin / 60)
                  if (calcHour) {
                    remainingHour = calcHour
                    remainingMin -= remainingHour * 60
                  }
                }

                return (
                  <ArrowBlock
                    noArrow
                    key={info.classroom_number}
                    className={mergeClassNames(
                      'classroom-info-container',
                      inClass ? 'in-class' : 'vacant'
                    )}
                  >
                    <div>
                      <h1 className="classroom-number">
                        {info.classroom_number}
                        <span className="unit">호</span>
                      </h1>
                      {inClass ? (
                        <>
                          <p className="current-lecture-name">
                            {currentLectureName}
                          </p>
                          <div className="gauge-shell">
                            <div
                              className="gauge-value"
                              style={{
                                width: `${100 - percentage}%`,
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <p className="remaining">
                          {remainingMin === Infinity
                            ? '더 이상 강의 없음'
                            : `${remainingHour ? `${remainingHour}시간` : ''}${
                                remainingMin ? ` ${remainingMin}분` : ''
                              } 동안 비어 있음`}
                        </p>
                      )}
                    </div>
                  </ArrowBlock>
                )
              })}
            </Grid>
          ) : (
            <ServerError />
          )}
        </div>
      </Body>
    </>
  )
}

VacantClassroomsPage.getInitialProps = async (
  ctx
): Promise<VacantClassroomsPageProps> => {
  const buildingNumber = ctx.query.buildingNumber as string

  const data = await VacantApi.classrooms({
    campus: '서울',
    building: buildingNumber,
  })

  return {
    buildingNumber,
    classroomsInfo: data,
  }
}

export default VacantClassroomsPage
