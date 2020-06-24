import { GetServerSideProps, NextPage } from 'next'
import TipsDetailPage, {
  TipsDetailPageProps,
} from '@/components/tips/TipsDetailPage'

import ApiHost from '@/modules/api-host'
import { getAccessToken } from '@/api'
import { oneApiClient } from '@payw/eodiro-one-api'
import { redirect } from '@/modules/server/redirect'

export const getServerSideProps: GetServerSideProps<TipsDetailPageProps> = async ({
  query,
  req,
  res,
}) => {
  const tipId = parseInt(query.tipId as string)

  if (!tipId) {
    redirect(res, '/')
  }

  const { err: tipErr, data: tip } = await oneApiClient(ApiHost.getHost(), {
    action: 'getTipDetail',
    data: {
      accessToken: await getAccessToken(req),
      tipId,
    },
  })

  const { err: commentsErr, data: commentsData } = await oneApiClient(
    ApiHost.getHost(),
    {
      action: 'getTipComments',
      data: {
        accessToken: await getAccessToken(req),
        tipId,
        lastCommentId: 0,
      },
    }
  )

  return {
    props: {
      tip,
      tipErr,
    },
  }
}

const Page: NextPage<TipsDetailPageProps> = ({ tip, tipErr }) => {
  return <TipsDetailPage tip={tip} tipErr={tipErr} />
}

export default Page
