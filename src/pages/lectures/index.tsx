import { ArrowBlock, LineInput, LineInputOnChangeHook } from '@/components/ui'
import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'

import $ from './style.module.scss'
import Body from '@/layouts/BaseLayout/Body'
import Grid from '@/layouts/Grid'
import InfiniteScrollContainer from '@/components/utils/InfiniteScrollContainer'
import { LecturesApi } from '@/api'
import { LecturesWithMajorCode } from '@/types'
import PageInfo from '@/components/utils/PageInfo'
import ServerError from '@/components/global/ServerError'
import classNames from 'classnames'
import getState from '@/modules/get-state'
import { getSyllabusUrl } from '@/modules/cau/get-syllabus-url'
import { useAuth } from '../_app'

interface LecturesPageProps {
  lectures: LecturesWithMajorCode
}

const LecturesContent: React.FC<LecturesPageProps> = ({ lectures }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [defaultLectures, setDefaultLectures] = useState(lectures)
  const [displayLectures, setDisplayLectures] = useState(lectures)

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>(null)

  const { isSigned } = useAuth()

  useEffect(() => {
    setDisplayLectures(defaultLectures)
  }, [defaultLectures, setDisplayLectures])

  const onChange: LineInputOnChangeHook = (value: string): void => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    const timeout = setTimeout(async () => {
      const query = value
      if (query.trim() === '') {
        setSearchQuery('')
        setDisplayLectures(defaultLectures)
      } else {
        const searched = await LecturesApi.search(query, {
          campus: '서울',
          offset: 0,
        })
        setDisplayLectures(searched)
      }
    }, 300)
    setSearchTimeout(timeout)
  }

  const containerRef = useRef<HTMLDivElement>(null)

  async function loadMore(): Promise<boolean> {
    if (!lectures) {
      return false
    }

    const searchQuery = await getState(setSearchQuery)
    const defaultLectures = await getState(setDefaultLectures)
    const displayLectures = await getState(setDisplayLectures)

    let moreLectures: LecturesWithMajorCode

    if (searchQuery.length === 0) {
      // Load more default lectures
      moreLectures = await LecturesApi.lectures({
        campus: '서울',
        offset: defaultLectures.length,
      })

      setDefaultLectures([...defaultLectures, ...moreLectures])
    } else {
      moreLectures = await LecturesApi.search(searchQuery, {
        campus: '서울',
        offset: displayLectures.length,
      })

      setDisplayLectures([...displayLectures, ...moreLectures])
    }

    if (moreLectures.length === 0) {
      return false
    }

    return true
  }

  return (
    <div id={$['eodiro-lectures']}>
      {displayLectures ? (
        <>
          <LineInput
            value={searchQuery}
            setValue={setSearchQuery}
            className={$['search-field']}
            placeholder="강의명, 학과, 교수, 강의실, 과목코드"
            type="search"
            onChangeHook={onChange}
          />
          <div ref={containerRef}>
            <InfiniteScrollContainer strategy={loadMore}>
              <Grid className={$['lecture-container']}>
                {displayLectures.map((lecture, i) => {
                  return (
                    <ArrowBlock
                      noArrow
                      flat
                      key={i}
                      className={$['lecture-item']}
                    >
                      <div className={$['li-content']}>
                        <div className={$['name-and-code']}>
                          <div>
                            <h1 className={$['name']}>{lecture.name}</h1>
                            {lecture.professor && (
                              <p
                                className={classNames(
                                  $['professor'],
                                  $['info-item']
                                )}
                              >
                                {lecture.professor}
                              </p>
                            )}
                          </div>
                          <p className={$['code']}>{lecture.code}</p>
                        </div>
                        {(lecture.college || lecture.major) && (
                          <p className={$['major']}>
                            {lecture.college + ' '}
                            {lecture.major}
                          </p>
                        )}
                        {lecture.credit && (
                          <p className={$['credit']}>{lecture.credit}학점</p>
                        )}
                        {lecture.schedule && lecture.schedule !== '/' && (
                          <p
                            className={classNames(
                              $['schedule'],
                              $['info-item']
                            )}
                          >
                            {lecture.schedule}
                          </p>
                        )}
                        {lecture.note && (
                          <div className={$['note']}>
                            <div className={$['data']}>
                              <h3>비고</h3>
                              <p>{lecture.note}</p>
                            </div>
                          </div>
                        )}

                        <a
                          href={isSigned ? getSyllabusUrl(lecture) : undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={$['syllabus']}
                          onClick={() => {
                            if (!isSigned) {
                              alert('로그인이 필요합니다.')
                            }
                          }}
                        >
                          <i className="icon octicon octicon-file" />
                          강의 계획서
                        </a>
                      </div>
                    </ArrowBlock>
                  )
                })}
              </Grid>
            </InfiniteScrollContainer>
          </div>
        </>
      ) : (
        <ServerError />
      )}
    </div>
  )
}

const LecturesPage: NextPage<LecturesPageProps> = (props) => {
  return (
    <>
      <Body pageTitle="강의 검색" bodyClassName={$['lectures-body']}>
        <PageInfo
          title={{
            subject: '강의 검색',
          }}
          description="포탈보다 100배 빠른 강의 검색"
        />
        <LecturesContent {...props} />
      </Body>
    </>
  )
}

export default LecturesPage

export const getServerSideProps: GetServerSideProps = async () => {
  const lectures = await LecturesApi.lectures({
    campus: '서울',
    offset: 0,
  })

  return {
    props: {
      lectures,
    },
  }
}
