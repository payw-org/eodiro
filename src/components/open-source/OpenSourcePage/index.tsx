import { Spinner } from '@/components/global/Spinner'
import { env } from '@/env'
import Body from '@/layouts/BaseLayout/Body'
import { Contributor } from '@/types/github-api'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Else, If, Then } from 'react-if'
import PageInfo from '../../utils/PageInfo'
import $ from './style.module.scss'

const OpenSourcePage: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[] | null>(null)

  useEffect(() => {
    async function getContributors() {
      const { data: eodiroContributors } = await axios.get<Contributor[]>(
        'https://api.github.com/repos/payw-org/eodiro/contributors',
        {
          auth: {
            username: 'jhaemin',
            password: env.GITHUB_OAUTH_TOKEN,
          },
        }
      )
      const { data: nextContributors } = await axios.get<Contributor[]>(
        'https://api.github.com/repos/payw-org/eodiro-next/contributors',
        {
          auth: {
            username: 'jhaemin',
            password: env.GITHUB_OAUTH_TOKEN,
          },
        }
      )
      const { data: api1Contributors } = await axios.get<Contributor[]>(
        'https://api.github.com/repos/payw-org/eodiro-api/contributors',
        {
          auth: {
            username: 'jhaemin',
            password: env.GITHUB_OAUTH_TOKEN,
          },
        }
      )
      const { data: api2Contributors } = await axios.get<Contributor[]>(
        'https://api.github.com/repos/payw-org/eodiro-server/contributors',
        {
          auth: {
            username: 'jhaemin',
            password: env.GITHUB_OAUTH_TOKEN,
          },
        }
      )

      const rawContributors = eodiroContributors || []

      if (nextContributors) {
        for (const nextUser of nextContributors) {
          const index = rawContributors.findIndex(
            (user) => user.login === nextUser.login
          )

          if (index === -1) {
            rawContributors.push(nextUser)
          } else {
            rawContributors[index].contributions += nextUser.contributions
          }
        }
      }

      if (api1Contributors) {
        for (const api1User of api1Contributors) {
          const index = rawContributors.findIndex(
            (user) => user.login === api1User.login
          )

          if (index === -1) {
            rawContributors.push(api1User)
          } else {
            rawContributors[index].contributions += api1User.contributions
          }
        }
      }

      if (api2Contributors) {
        for (const api2User of api2Contributors) {
          const index = rawContributors.findIndex(
            (user) => user.login === api2User.login
          )

          if (index === -1) {
            rawContributors.push(api2User)
          } else {
            rawContributors[index].contributions += api2User.contributions
          }
        }
      }

      const filteredContributors = rawContributors.filter(
        (contributor) => !contributor.login.startsWith('dependabot')
      )

      filteredContributors.sort((a, b) => b.contributions - a.contributions)

      setContributors(filteredContributors)
    }

    getContributors()
  }, [])

  return (
    <Body pageTitle="오픈소스" bodyClassName={$['component-open-source']}>
      <PageInfo
        title={{
          subject: '오픈소스',
        }}
        description="어디로는 오픈소스 프로젝트입니다."
      />

      <div className={$['manifesto']}>
        <p className={$['paragraph']}>
          &ldquo;어디로&rdquo;는 모든 소스코드와 자원이 공개되어 있는 오픈소스
          프로젝트입니다. 서비스를 이용하는 학우분들에겐 더 나은 신뢰감을
          드리고, 개발자 꿈나무에겐 공부 자료이자 오픈소스에 기여할 수 있는
          기회가 될 것입니다. 자세한 내용은{' '}
          <a
            href="https://github.com/payw-org/eodiro"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          에서 확인할 수 있습니다.
        </p>
      </div>

      <section className={$['contributors']}>
        <h2 className={$['title']}>
          &ldquo;어디로&rdquo;를 함께 만드는 사람들
        </h2>
        <p className={$['description']}>
          클릭하여 각 개발자의 GitHub 프로필로 이동할 수 있습니다. GitHub에서
          &ldquo;어디로&rdquo; 개발에 참여하면 자동으로 이 페이지에 표시됩니다.
          개발자 이름 하단에 표시되는 숫자는 총 기여(contribution) 횟수입니다.
        </p>

        <div className="mt-8">
          <If condition={!!contributors}>
            <Then>
              <div className={$['users']}>
                {contributors?.map((user) => (
                  <a
                    href={user.html_url}
                    key={user.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={$['user-link']}
                  >
                    <div className={$['user']}>
                      <img
                        src={user.avatar_url}
                        alt="Avatar"
                        className={$['avatar']}
                      />
                      <h3 className={$['name']}>{user.login}</h3>
                      <span className={$['contributions']}>
                        {user.contributions}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </Then>
            <Else>
              <div className="flex justify-center w-full">
                <Spinner />
              </div>
            </Else>
          </If>
        </div>
      </section>
    </Body>
  )
}

export default OpenSourcePage
