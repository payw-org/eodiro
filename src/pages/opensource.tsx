import OpenSourcePage, {
  OpenSourcePageProps,
} from '@/components/open-source/OpenSourcePage'
import { env } from '@/env'
import { Contributor } from '@/types/github-api'
import Axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'

const Page: NextPage<OpenSourcePageProps> = ({ contributors }) => {
  return <OpenSourcePage contributors={contributors} />
}

export default Page

export const getServerSideProps: GetServerSideProps<OpenSourcePageProps> = async () => {
  const { data: eodiroContributors } = await Axios.get<Contributor[]>(
    'https://api.github.com/repos/payw-org/eodiro/contributors',
    {
      auth: {
        username: 'jhaemin',
        password: env.GITHUB_OAUTH_TOKEN,
      },
    }
  )
  const { data: nextContributors } = await Axios.get<Contributor[]>(
    'https://api.github.com/repos/payw-org/eodiro-next/contributors',
    {
      auth: {
        username: 'jhaemin',
        password: env.GITHUB_OAUTH_TOKEN,
      },
    }
  )
  const { data: api1Contributors } = await Axios.get<Contributor[]>(
    'https://api.github.com/repos/payw-org/eodiro-api/contributors',
    {
      auth: {
        username: 'jhaemin',
        password: env.GITHUB_OAUTH_TOKEN,
      },
    }
  )
  const { data: api2Contributors } = await Axios.get<Contributor[]>(
    'https://api.github.com/repos/payw-org/eodiro-server/contributors',
    {
      auth: {
        username: 'jhaemin',
        password: env.GITHUB_OAUTH_TOKEN,
      },
    }
  )

  const contributors = eodiroContributors || []

  if (nextContributors) {
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

  if (api1Contributors) {
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

  if (api2Contributors) {
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

  const filteredContributors = contributors.filter(
    (contributor) => !contributor.login.startsWith('dependabot')
  )

  filteredContributors.sort((a, b) => b.contributions - a.contributions)

  return {
    props: {
      contributors: filteredContributors,
    },
  }
}
