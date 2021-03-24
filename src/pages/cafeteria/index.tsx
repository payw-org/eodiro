// import { CafeteriaApi, CafeteriaMenus } from '@/api'
// import Information from '@/components/global/Information'
// import { Tile } from '@/components/ui'
// import PageInfo from '@/components/utils/PageInfo'
// import Body from '@/layouts/BaseLayout/Body'
// import Grid from '@/layouts/Grid'
// import ApiHost from '@/modules/api-host'
// import Time from '@/modules/time'
// import { Restaurant } from '@payw/cau-cafeteria-menus-scraper-types'
// import classNames from 'classnames'
// import dayjs from 'dayjs'
// import _ from 'lodash'
// import { GetServerSideProps, NextPage } from 'next'
// import React, { memo, useState } from 'react'
// import useSWR from 'swr'
// import $ from './style.module.scss'

// type CafeteriaPageProps = {
//   menus: CafeteriaMenus
// }

// const TimeGroup: React.FC<{
//   timeGroup: Restaurant[]
// }> = memo(({ timeGroup }) => {
//   return (
//     <Grid>
//       {timeGroup.length > 0 ? (
//         timeGroup.map((restaurant) => {
//           return (
//             <Tile flat noArrow key={restaurant.name}>
//               <div>
//                 <h2 className={$['restaurant-name']}>{restaurant.name}</h2>
//                 {restaurant.meals.length > 0 ? (
//                   restaurant.meals.map((meal, i) => {
//                     return (
//                       <div
//                         className={$['meal']}
//                         key={meal.title + meal.menus.join('')}
//                       >
//                         <div className={$['title-and-price']}>
//                           <h3 className={$['meal-title']}>{meal.title}</h3>
//                           <span className={$['price']}>{meal.price}</span>
//                         </div>
//                         <div className={$['food-container']}>
//                           {meal.menus.map((food) => {
//                             return (
//                               <div className={$['food-name']} key={food}>
//                                 {food}
//                               </div>
//                             )
//                           })}
//                         </div>
//                       </div>
//                     )
//                   })
//                 ) : (
//                   <p className={$['no-menus']}>학식이 없습니다.</p>
//                 )}
//               </div>
//             </Tile>
//           )
//         })
//       ) : (
//         <Information title="정보가 없습니다." />
//       )}
//     </Grid>
//   )
// }, _.isEqual)

// const EodiroCafeteria: React.FC<{ menus: CafeteriaMenus }> = ({ menus }) => {
//   const [now, setNow] = useState(dayjs())
//   const { data: todayMenus } = useSWR(
//     `${ApiHost.getHost()}/cafeteria/${now.format(
//       'YYYY-MM-DD'
//     )}/${encodeURIComponent('서울')}/menus`
//   )

//   return (
//     <div id={$['eodiro-cafeteria']}>
//       <div className={$['date-container']}>
//         <button
//           type="button"
//           className={classNames($['date-change-btn'], $['previous'])}
//           onClick={(e) => {
//             e.preventDefault()
//             setNow(now.subtract(1, 'd'))
//           }}
//         >
//           <i className="octicon octicon-chevron-left" />
//         </button>
//         <p className={$['date']}>
//           {now.format('YYYY년 M월 D일')} ({Time.day(now.day())})
//         </p>
//         <button
//           type="button"
//           className={classNames($['date-change-btn'], $['next'])}
//           onClick={(e) => {
//             e.preventDefault()
//             setNow(now.add(1, 'd'))
//           }}
//         >
//           <i className="octicon octicon-chevron-right" />
//         </button>
//       </div>

//       <div>
//         <h1 className={$['time']}>조식</h1>
//         {todayMenus?.breakfast && (
//           <TimeGroup timeGroup={todayMenus.breakfast} />
//         )}

//         <h1 className={$['time']}>중식</h1>
//         {todayMenus?.lunch && <TimeGroup timeGroup={todayMenus.lunch} />}

//         <h1 className={$['time']}>석식</h1>
//         {todayMenus?.supper && <TimeGroup timeGroup={todayMenus.supper} />}
//       </div>
//     </div>
//   )
// }

// const CafeteriaPage: NextPage<CafeteriaPageProps> = (props) => {
//   return (
//     <Body pageTitle="학식 메뉴">
//       <PageInfo
//         title={{
//           subject: '학식 메뉴',
//         }}
//         description="오늘의 학식은 과연 무엇일까요?"
//       />
//       <EodiroCafeteria {...props} />
//     </Body>
//   )
// }

// export const getServerSideProps: GetServerSideProps<CafeteriaPageProps> = async () => {
//   const menus = (await CafeteriaApi.menus({})) as CafeteriaMenus

//   return {
//     props: {
//       menus,
//     },
//   }
// }

// export default CafeteriaPage

export default function Page() {
  return null
}
