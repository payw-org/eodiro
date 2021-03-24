// import $ from './style.module.scss'
// import { Tile } from '@/components/ui'
// import Body from '@/layouts/BaseLayout/Body'
// import EodiroLink from '@/components/utils/EodiroLink'
// import Grid from '@/layouts/Grid'
// import Information from '@/components/global/Information'
// import { NextPage } from 'next'
// import PageInfo from '@/components/utils/PageInfo'
// import React from 'react'
// import ServerError from '@/components/global/ServerError'
// import { VacantApi } from '@/api'
// import { VacantBuildings } from '@/api/vacant'
// import dayjs from 'dayjs'
// import getBuildingName from '@/modules/cau/get-building-name'
// import getSemester from '@/modules/get-semester'

// interface VacantBuildingsPageProps {
//   buildingsInfo: VacantBuildings
// }

// const VacantBuildingsPage: NextPage<VacantBuildingsPageProps> = ({
//   buildingsInfo,
// }) => {
//   return (
//     <>
//       <PageInfo
//         title={{
//           subject: '건물 선택',
//           feature: '빈 강의실',
//         }}
//         description="빈 강의실을 백번 활용해요!"
//       />
//       <Body pageTitle="빈 강의실">
//         <div id={$['eodiro-vacant']}>
//           {buildingsInfo && buildingsInfo.length > 0 ? (
//             <Grid className={$['building-container']}>
//               {buildingsInfo.map((info, i) => {
//                 return (
//                   <Tile key={info.building_number + i}>
//                     <div className={$['building-info-wrapper']}>
//                       <EodiroLink
//                         href={'/vacant/[buildingNumber]'}
//                         as={`/vacant/${info.building_number}`}
//                         absolute
//                       />
//                       <div className={$['building-number-and-name']}>
//                         <h1 className={$['building-number']}>
//                           {info.building_number}
//                         </h1>
//                         {getBuildingName(info.building_number) && (
//                           <h2 className={$['building-name']}>
//                             {getBuildingName(info.building_number)}
//                           </h2>
//                         )}
//                       </div>
//                       <div className={$['building-count']}>
//                         <span className={$['empty']}>{info.empty}</span>
//                         <span className={$['of']}> / </span>
//                         <span className={$['total']}>{info.total}</span>
//                       </div>
//                     </div>
//                   </Tile>
//                 )
//               })}
//             </Grid>
//           ) : buildingsInfo && buildingsInfo.length === 0 ? (
//             <Information title="오늘은 강의가 없습니다." />
//           ) : (
//             <ServerError />
//           )}
//         </div>
//       </Body>
//     </>
//   )
// }

// VacantBuildingsPage.getInitialProps = async (): Promise<
//   VacantBuildingsPageProps
// > => {
//   const now = dayjs()
//   const data = await VacantApi.buildings({
//     year: now.year(),
//     semester: getSemester(),
//     campus: '서울',
//   })

//   // Remove 810 and 801 buildings
//   const filteredData = data
//     ? data.filter((item) => {
//         return item.building_number !== 810 && item.building_number !== 801
//       })
//     : data

//   return {
//     buildingsInfo: filteredData,
//   }
// }

// export default VacantBuildingsPage

export default function VacantBuildingsPage() {
  return null
}
