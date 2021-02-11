import { Button } from '@/components/ui'
import { eodiroConst } from '@/constants'
import Body from '@/layouts/BaseLayout/Body'
import EodiroDialog from '@/modules/client/eodiro-dialog'
import { eodiroRequest } from '@/modules/eodiro-request'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ApiCommunityCreateNewBoardReqData } from '../api/community/create-new-board'

export default function NewBoardPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  async function createNewBoard() {
    setIsProcessing(true)

    try {
      await eodiroRequest<ApiCommunityCreateNewBoardReqData>({
        method: 'post',
        url: '/api/community/create-new-board',
        data: {
          name,
          description: description || undefined,
        },
      })

      new EodiroDialog().alert('생성되었습니다.')
      router.replace('/community/all-boards')
    } catch (createError) {
      const errorMessage = createError.response?.data?.message

      if (errorMessage) {
        new EodiroDialog().alert(errorMessage)
      }
    }

    setIsProcessing(false)
  }

  return (
    <Body pageTitle="새 게시판" width="xsmall">
      <p className="text-lg mx-1">
        새 게시판은 일주일 이내에 {eodiroConst.BOARD_CANDIDATE_VOTES_THRESHOLD}
        건 이상의 투표를 받으면 자동으로 활성화됩니다. 먼저 유사한 게시판이
        없는지 확인 후 생성 바랍니다.
      </p>
      <input
        type="text"
        maxLength={50}
        placeholder="게시판 이름 (최대 50자)"
        className="mt-5"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <textarea
        placeholder="게시판 설명 (최대 100자)"
        className="mt-4 h-36"
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      />
      <Button
        full
        className="mt-6"
        onClick={createNewBoard}
        disabled={isProcessing}
      >
        투표 시작
      </Button>
    </Body>
  )
}
