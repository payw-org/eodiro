// import { GetServerSideProps, NextPage } from 'next'
// import NoticeNotifications, {
//   NoticeNotificationsProps,
// } from '@/components/notice-notifications/NoticeNotifications'

// import ApiHost from '@/modules/api-host'
// import { oneApiClient } from '@payw/eodiro-one-api'

// export const getServerSideProps: GetServerSideProps<NoticeNotificationsProps> = async () => {
//   const { data } = await oneApiClient(ApiHost.getHost(), {
//     action: 'getNoticeCatalog',
//     data: undefined,
//   })

//   const { noticeCatalog } = data

//   return {
//     props: {
//       noticeCatalog,
//     },
//   }
// }

// const Page: NextPage<NoticeNotificationsProps> = ({ noticeCatalog }) => {
//   return <NoticeNotifications noticeCatalog={noticeCatalog} />
// }

// export default Page

export default function Page() {
  return null
}
