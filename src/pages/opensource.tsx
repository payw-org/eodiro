import { GetServerSideProps, NextPage } from 'next'
import OpenSource, { OpenSourceProps } from '@/components/OpenSource'

import { Contributor } from '@/types/github-api'
import eodiroAxios from '@/modules/eodiro-axios'

const Page: NextPage<OpenSourceProps> = ({ contributors }) => {
  return <OpenSource contributors={contributors} />
}

export default Page

export const getServerSideProps: GetServerSideProps<OpenSourceProps> = async () => {
  const [eodiroContErr, eodiroContributors] = await eodiroAxios<Contributor[]>({
    method: 'get',
    url: 'https://api.github.com/repos/paywteam/eodiro/contributors',
  })
  const [nextContErr, nextContributors] = await eodiroAxios<Contributor[]>({
    method: 'get',
    url: 'https://api.github.com/repos/paywteam/eodiro-next/contributors',
  })
  const [api1ContErr, api1Contributors] = await eodiroAxios<Contributor[]>({
    method: 'get',
    url: 'https://api.github.com/repos/paywteam/eodiro-api/contributors',
  })
  const [api2ContErr, api2Contributors] = await eodiroAxios<Contributor[]>({
    method: 'get',
    url: 'https://api.github.com/repos/paywteam/eodiro-api2/contributors',
  })

  const contributors = eodiroContributors || []

  if (!nextContErr && nextContributors) {
    for (const nextUser of nextContributors) {
      const index = contributors.findIndex(
        (user) => user.login === nextUser.login
      )

      if (index === -1) {
        contributors.push(nextUser)
      } else {
        contributors[index].contributions += nextUser.contributions
      }
    }
  }

  if (!api1ContErr && api1Contributors) {
    for (const api1User of api1Contributors) {
      const index = contributors.findIndex(
        (user) => user.login === api1User.login
      )

      if (index === -1) {
        contributors.push(api1User)
      } else {
        contributors[index].contributions += api1User.contributions
      }
    }
  }

  if (!api2ContErr && api2Contributors) {
    for (const api2User of api2Contributors) {
      const index = contributors.findIndex(
        (user) => user.login === api2User.login
      )

      if (index === -1) {
        contributors.push(api2User)
      } else {
        contributors[index].contributions += api2User.contributions
      }
    }
  }

  contributors.sort((a, b) => b.contributions - a.contributions)

  return {
    props: {
      contributors,
    },
  }
}
