// import { GetServerSideProps, NextPage } from 'next'
// import VacantClassroomsPage, {
//   VacantClassroomsPageProps,
// } from '@/components/vacant/VacantClassroomsPage'

// import { VacantApi } from '@/api'

// const Page: NextPage<VacantClassroomsPageProps> = (props) => {
//   return <VacantClassroomsPage {...props} />
// }

// export default Page

// export const getServerSideProps: GetServerSideProps<VacantClassroomsPageProps> = async (
//   ctx
// ) => {
//   const buildingNumber = ctx.query.buildingNumber as string

//   const data = await VacantApi.classrooms({
//     campus: '서울',
//     building: buildingNumber,
//   })

//   return {
//     props: {
//       buildingNumber,
//       classroomsInfo: data,
//     },
//   }
// }

export default function Page() {
  return null
}
