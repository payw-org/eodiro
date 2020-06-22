import $ from './style.module.scss'
import Body from '@/layouts/BaseLayout/Body'
import { Contributor } from '@/types/github-api'
import PageInfo from '../utils/PageInfo'

export type OpenSourceProps = {
  contributors: Contributor[]
}

const OpenSource: React.FC<OpenSourceProps> = ({ contributors }) => {
  return (
    <Body pageTitle="오픈소스" bodyClassName={$['component-open-source']}>
      <PageInfo
        title={{
          subject: '오픈소스',
        }}
        description="어디로는 자유 공개 소프트웨어입니다."
      />

      <div className={$['manifesto']}>
        <p className={$['paragraph']}>
          &ldquo;어디로&rdquo;는 모든 소스코드가 공개되어 있는 자유 공개
          소프트웨어입니다. 서비스를 이용하는 학우분들에겐 더 나은 신뢰감을
          드리고, 개발자 꿈나무 여러분에겐 좋은 공부 자료가 될 거라 믿습니다.
          자세한 내용은{' '}
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
          &ldquo;어디로&rdquo; 개발에 참여하면 자동으로 이 페이지에 노출됩니다.
          개발자 이름 하단에 표시되는 숫자는 총 기여(contribution) 회수입니다.
        </p>

        <div className={$['users']}>
          {contributors.map((user) => (
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
                <span className={$['contributions']}>{user.contributions}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </Body>
  )
}

export default OpenSource
