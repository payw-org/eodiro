import { GetServerSideProps, NextPage } from 'next'
import TipsPage, { TipsPageProps } from '@/components/tips/TipsPage'

import ApiHost from '@/modules/api-host'
import { oneApiClient } from '@payw/eodiro-one-api'

export const getServerSideProps: GetServerSideProps<TipsPageProps> = async () => {
  const { data } = await oneApiClient(ApiHost.getHost(), {
    action: 'getTopics',
  })

  return {
    props: {
      topics: data,
    },
  }
}

const Page: NextPage<TipsPageProps> = ({ topics }) => {
  return <TipsPage topics={topics} />
}

export default Page
