// import { Tokens } from '@/api'
// import PageInfo from '@/components/utils/PageInfo'
// import Body from '@/layouts/BaseLayout/Body'
// import ApiHost from '@/modules/api-host'
// import { isApp } from '@/modules/booleans/is-app'
// import { useAuth } from '@/pages/_app'
// import { oneApiClient } from '@payw/eodiro-one-api'
// import { NoticeItem } from '@payw/eodiro-one-api/api/one/scheme/notice/get-notice-catalog.action/interface'
// import classNames from 'classnames'
// import { useEffect, useState } from 'react'
// import $ from './style.module.scss'

// export type NoticeNotificationsProps = {
//   noticeCatalog: NoticeItem[]
// }

// const NoticeWatcher: React.FC<NoticeNotificationsProps> = ({
//   noticeCatalog,
// }) => {
//   const { isSigned } = useAuth()
//   const [subscriptions, setSubsciptions] = useState(
//     noticeCatalog.map(({ displayName, key }) => ({
//       displayName,
//       key,
//       isSubscribed: false,
//     }))
//   )
//   const [isSyncing, setIsSyncing] = useState(true)

//   useEffect(() => {
//     async function init() {
//       if (!isSigned) return

//       const { data } = await oneApiClient(ApiHost.getHost(), {
//         action: 'getMySubscriptions',
//         data: {
//           accessToken: (await Tokens.get()).accessToken,
//         },
//       })

//       const { subscriptions: mySubs } = data

//       mySubs.forEach((sub) => {
//         const index = subscriptions.findIndex((s) => s.key === sub)

//         if (index !== -1) {
//           const subscriptionsClone = [...subscriptions]
//           subscriptionsClone[index].isSubscribed = true
//           setSubsciptions(subscriptionsClone)
//         }
//       })

//       setIsSyncing(false)
//     }

//     init()
//   }, [])

//   return (
//     <Body pageTitle="공지사항 알림" bodyClassName={$['app-body']}>
//       <PageInfo
//         title={{
//           subject: '공지사항 알림',
//         }}
//         description="이제 더 이상 학교 공지사항을 놓치지 마세요."
//       />

//       {!isApp() && (
//         <div className={$['not-app-tip']}>
//           이 기능은 앱에서만 이용할 수 있습니다.
//           <br />
//           iOS는 현재 베타 테스트 중이며, Android는 준비 중입니다.
//         </div>
//       )}

//       <h2 className={$['subtitle']}>더 이상 학교 공지사항을 놓치지 마세요.</h2>
//       <p className={$['paragraph']}>
//         어디로 공지사항 알림은 학교 홈페이지 곳곳에 올라오는 공지사항을 최대
//         15분 이내에 어디로 앱을 통해 알려주는 기능입니다. 매번 새로운 공지사항을
//         확인하기 위해 웹사이트를 들락날락할 필요가 없어지죠.
//       </p>

//       <h2 className={$['subtitle']}></h2>

//       <div className={$['config-box']}>
//         <h2 className={$['subtitle']}>
//           알림 설정
//           {!isSigned && (
//             <span>
//               (<i className="f7-icons">lock_fill</i>
//               <a href="/login">로그인</a> 필요)
//             </span>
//           )}
//         </h2>

//         {subscriptions.map((noticeItem, index) => (
//           <div key={noticeItem.key} className={$['notice-item']}>
//             <input
//               type="checkbox"
//               id={`checkbox-${noticeItem.key}`}
//               disabled={isSyncing || !isSigned}
//               checked={noticeItem.isSubscribed}
//               onChange={async () => {
//                 if (!isSigned) return

//                 setIsSyncing(true)

//                 const { err, data: subscriptionResult } = await oneApiClient(
//                   ApiHost.getHost(),
//                   {
//                     action: 'updateNoticeSubscription',
//                     data: {
//                       accessToken: (await Tokens.get()).accessToken,
//                       noticeKey: noticeItem.key,
//                     },
//                   }
//                 )

//                 if (err) {
//                   alert(`에러가 발생했습니다. ${err}`)
//                   return
//                 }

//                 const newSubs = [...subscriptions]
//                 newSubs[index].isSubscribed = subscriptionResult[noticeItem.key]

//                 setSubsciptions(newSubs)
//                 setIsSyncing(false)
//               }}
//             />
//             <label
//               className={$['display-name']}
//               htmlFor={`checkbox-${noticeItem.key}`}
//             >
//               {noticeItem.displayName}
//             </label>
//           </div>
//         ))}
//       </div>

//       <hr />

//       <h2 className={classNames($['subtitle'], $['more'])}>
//         알림을 받고싶은 공지사항이 목록에 없거나 알림이 제대로 오지 않나요?
//       </h2>
//       <p className={$['paragraph']}>
//         <a href="mailto:support@eodiro.com">support@eodiro.com</a>으로
//         문의주시면 빠른 시일 내에 해결하겠습니다.
//       </p>

//       <h2 className={classNames($['subtitle'], $['more'])}>개발자이신가요?</h2>
//       <p className={$['paragraph']}>
//         JavaScript와 TypeScript, 그리고 HTML에 대한 약간의 지식만 있으면{' '}
//         <a
//           href="https://github.com/payw-org/eodiro-server/tree/master/src/modules/cau-notice-watcher"
//           target="_blank"
//           rel="noreferrer"
//         >
//           개발 가이드
//         </a>
//         를 따라 중앙대학교의 다양한 공지사항 알림을 손쉽게 직접 구축할 수
//         있습니다. 다른 과의 공지사항 알림을 추가하고 친구들에게 뽐내세요!
//       </p>
//     </Body>
//   )
// }

// export default NoticeWatcher

export default function NoticeWatcher() {
  return null
}
