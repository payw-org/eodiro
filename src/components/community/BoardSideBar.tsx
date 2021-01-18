import { Spinner } from '@/components/global/Spinner'
import { ArrowBlock } from '@/components/ui/ArrowBlock'
import { ApiGetRecentBoardsResData } from '@/pages/api/community/get-recent-boards'
import { communityBoardPageUrl } from '@/utils/page-urls'
import $$ from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Separator from '../utils/Separator'
import $ from './BoardSideBar.module.scss'

export default function BoardSideBar() {
  const { data: boardsList, error } = useSWR<ApiGetRecentBoardsResData>(
    '/api/community/get-recent-boards?onlyNames=true'
  )

  const router = useRouter()

  const boardId = parseInt(router.query.boardId as string, 10)

  return (
    <div className={$['board-sidebar']}>
      <ArrowBlock flat>
        <h2>다른 게시판</h2>

        <Separator className="my-3" />

        {error ? (
          <div>에러가 발생했습니다.</div>
        ) : boardsList ? (
          <div>
            {boardsList.map((boardInfo) => (
              <Link
                href={communityBoardPageUrl(boardInfo.id)}
                key={boardInfo.id}
              >
                <a
                  className={$$('block mt-2 first:mt-0 text-xl font-medium', {
                    'text-eodiro-primary-color font-semibold':
                      boardId === boardInfo.id,
                  })}
                >
                  {boardInfo.name}
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </ArrowBlock>
    </div>
  )
}