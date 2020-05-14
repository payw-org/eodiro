import { CafeteriaApi, CafeteriaMenus } from '@/api'
import React, { memo, useEffect, useMemo, useState } from 'react'

import $ from './style.module.scss'
import { ArrowBlock } from '@/components/ui'
import Body from '@/layouts/BaseLayout/Body'
import Grid from '@/layouts/Grid'
import Information from '@/components/global/Information'
import { NextPage } from 'next'
import { Restaurant } from '@payw/cau-cafeteria-menus-scraper-types'
import ServerError from '@/components/global/ServerError'
import Time from '@/modules/time'
import _ from 'lodash'
import classNames from 'classnames'
import dayjs from 'dayjs'

type CafeteriaPageProps = {
  menus: CafeteriaMenus
}

const TimeGroup: React.FC<{
  timeGroup: Restaurant[]
}> = memo(({ timeGroup }) => {
  return (
    <Grid>
      {timeGroup.length > 0 ? (
        timeGroup.map((restaurant) => {
          return (
            <ArrowBlock flat noArrow key={restaurant.name}>
              <div>
                <h2 className={$['restaurant-name']}>{restaurant.name}</h2>
                {restaurant.meals.length > 0 ? (
                  restaurant.meals.map((meal) => {
                    return (
                      <div className={$['meal']} key={meal.title}>
                        <h3 className={$['meal-title']}>{meal.title}</h3>
                        <div className={$['food-container']}>
                          {meal.menus.map((food) => {
                            return (
                              <div className={$['food-name']} key={food}>
                                {food}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className={$['no-menus']}>학식이 없습니다.</p>
                )}
              </div>
            </ArrowBlock>
          )
        })
      ) : (
        <Information title="정보가 없습니다." />
      )}
    </Grid>
  )
}, _.isEqual)

const EodiroCafeteria: React.FC<{ menus: CafeteriaMenus }> = memo(
  ({ menus }) => {
    const [now, setNow] = useState(dayjs())
    const [todayMenus, setTodayMenus] = useState(menus)

    useEffect(() => {
      ;(async (): Promise<void> => {
        const newMenus = await CafeteriaApi.menus({
          date: now.format('YYYY-MM-DD'),
        })

        setTodayMenus(newMenus)
      })()
    }, [now])

    return useMemo(
      () => (
        <div id={$['eodiro-cafeteria']}>
          {todayMenus ? (
            <>
              <div className={$['date-container']}>
                <button
                  className={classNames($['date-change-btn'], $['previous'])}
                  onClick={(): void => setNow(now.subtract(1, 'd'))}
                  onTouchStart={(e) => e.preventDefault()}
                >
                  <i className="octicon octicon-chevron-left" />
                </button>
                <p className={$['date']}>
                  {now.format('YYYY년 M월 D일')} ({Time.day(now.day())})
                </p>
                <button
                  className={classNames($['date-change-btn'], $['next'])}
                  onClick={(): void => setNow(now.add(1, 'd'))}
                  onTouchStart={(e) => e.preventDefault()}
                >
                  <i className="octicon octicon-chevron-right" />
                </button>
              </div>

              <div>
                <h1 className={$['time']}>조식</h1>
                <TimeGroup timeGroup={todayMenus.breakfast} />

                <h1 className={$['time']}>중식</h1>
                <TimeGroup timeGroup={todayMenus.lunch} />

                <h1 className={$['time']}>석식</h1>
                <TimeGroup timeGroup={todayMenus.supper} />
              </div>
            </>
          ) : (
            <ServerError />
          )}
        </div>
      ),
      [todayMenus]
    )
  }
)

const CafeteriaPage: NextPage<CafeteriaPageProps> = (props) => {
  return (
    <Body pageTitle="학식 메뉴">
      <EodiroCafeteria {...props} />
    </Body>
  )
}

CafeteriaPage.getInitialProps = async (): Promise<CafeteriaPageProps> => {
  const menus = await CafeteriaApi.menus({})

  return {
    menus,
  }
}

export default CafeteriaPage
