import { GetServerSideProps, NextPage } from 'next'
import TipsPage, { TipsPageProps } from '@/components/tips/TipsPage'

import ApiHost from '@/modules/api-host'
import { TipTopic } from '@prisma/client'
import { oneApiClient } from '@payw/eodiro-one-api'

export const getServerSideProps: GetServerSideProps<TipsPageProps> = async ({
  query,
}) => {
  const { data } = await oneApiClient(ApiHost.getHost(), {
    action: 'getTopics',
  })

  const page = parseInt(query.page as string) || 1
  const topic = (query.topic as TipTopic) || null

  return {
    props: {
      topics: data,
      topic,
      page,
    },
  }
}

const Page: NextPage<TipsPageProps> = (props) => {
  return <TipsPage {...props} />
}

export default Page
