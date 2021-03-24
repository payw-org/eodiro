import { Tile } from '@/components/ui'
import { Icon } from '@/components/ui/Icon'
import { Flex } from '@/components/ui/layouts/Flex'
import ApiHost from '@/modules/api-host'
import EodiroDialog from '@/modules/client/eodiro-dialog'
import { eodiroRequest } from '@/modules/eodiro-request'
import { communityBoardPageUrl } from '@/utils/page-urls'
import {
  ApiCommunityPinBoardReqBody,
  ApiCommunityPinBoardResData,
} from '@payw/eodiro-server-types/api/community/board'
import { SafeCommunityBoard } from '@payw/eodiro-server-types/types/schema'
import classNames from 'classnames'
import Link from 'next/link'
import React, { useState } from 'react'
import $ from './style.module.scss'

type BoardItemProps = {
  board: SafeCommunityBoard & { isPinned: boolean }
  onUpdatePin?: () => void
}

export default function BoardItem(props: BoardItemProps) {
  const { board, onUpdatePin } = props
  const [isPinned, setIsPinned] = useState(board.isPinned)

  async function onClickPin(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    try {
      const result = await eodiroRequest<
        ApiCommunityPinBoardReqBody,
        ApiCommunityPinBoardResData
      >({
        url: ApiHost.resolve('/community/board/pin'),
        method: 'post',
        data: {
          boardId: board.id,
        },
      })

      setIsPinned(result.isPinned)

      if (onUpdatePin) {
        onUpdatePin()
      }
    } catch (error) {
      if (error.response?.status === 404) {
        new EodiroDialog().alert('삭제되었거나 존재하지 않는 게시판입니다.')
      }
    }
  }

  return (
    <Link
      href={communityBoardPageUrl({
        boardId: board.id,
        boardName: board.name,
      })}
    >
      <a>
        <Tile>
          <Flex row justifyStart className={$['board-item']}>
            <button
              type="button"
              onClick={onClickPin}
              className={classNames($['pin-icon'], {
                [$['pinned']]: isPinned,
              })}
            >
              <Icon name={isPinned ? 'pin_fill' : 'pin'} size={22} />
            </button>
            <div>
              <h1 className="font-semibold text-xl">{board.name}</h1>
              {board.description && (
                <p className="text-gray-500 dark:text-gray-400 text-base">
                  {board.description}
                </p>
              )}
            </div>
          </Flex>
        </Tile>
      </a>
    </Link>
  )
}
