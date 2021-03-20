import { withRequireAuth } from '@/components/hoc/with-require-auth'
import { Button, LineInput } from '@/components/ui'
import { eodiroConst } from '@/constants'
import Body from '@/layouts/BaseLayout/Body'
import ApiHost from '@/modules/api-host'
import EodiroDialog from '@/modules/client/eodiro-dialog'
import { eodiroRequest } from '@/modules/eodiro-request'
import {
  ApiCommunityCheckBoardNameReqBody,
  ApiCommunityCheckBoardNameResData,
  ApiCommunityCreateNewBoardReqBody,
} from '@payw/eodiro-server-types/api/community/board'
import { useRouter } from 'next/router'
import { useState } from 'react'

function NewBoardPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isAvailable, setIsAvailable] = useState(false)
  const [boardNameErrMsg, setBoardNameErrMsg] = useState('')
  const router = useRouter()

  async function createNewBoard() {
    if (!name.trim()) {
      new EodiroDialog().alert('게시판 이름을 입력해주세요.')
      return
    }
    if (name.trim().length > eodiroConst.MAX_BOARD_TITLE_LENGTH) {
      new EodiroDialog().alert('게시판 이름은 최대 50자입니다.')
      return
    }
    if (
      description.trim() &&
      description.trim().length > eodiroConst.MAX_BOARD_DESCRIPTION_LENGTH
    ) {
      new EodiroDialog().alert('게시판 이름은 최대 50자입니다.')
      return
    }

    setIsProcessing(true)

    try {
      await eodiroRequest<ApiCommunityCreateNewBoardReqBody>({
        method: 'POST',
        url: ApiHost.resolve('/community/board'),
        data: {
          name,
          description: description || undefined,
        },
      })

      new EodiroDialog().alert('생성되었습니다.')
      router.replace('/community/all-boards')
    } catch (error) {
      if (error.response?.status === 400) {
        new EodiroDialog().alert(error.response?.data?.message)
      }
    }

    setIsProcessing(false)
  }

  return (
    <Body pageTitle="새 게시판" width="xsmall">
      <p className="text-lg mx-1 text-base-gray">
        새 게시판은 일주일 이내에 {eodiroConst.BOARD_CANDIDATE_VOTES_THRESHOLD}
        건 이상의 투표를 받으면 자동으로 활성화됩니다. 먼저 유사한 게시판이
        없는지 확인 후 생성 바랍니다.
      </p>
      <LineInput
        type="text"
        maxLength={50}
        placeholder="게시판 이름 (최대 50자)"
        className="mt-5"
        value={name}
        setValue={setName}
        onChangeHook={() => setIsProcessing(true)}
        onChangeThrottle={[
          (value) => {
            eodiroRequest<
              ApiCommunityCheckBoardNameReqBody,
              ApiCommunityCheckBoardNameResData
            >({
              method: 'POST',
              url: ApiHost.resolve('/community/board/check'),
              data: {
                name: value,
              },
            })
              .then((data) => {
                setIsAvailable(data.isAvailable)

                if (!data.isAvailable) {
                  setBoardNameErrMsg('같은 이름의 게시판이 존재합니다.')
                } else {
                  setBoardNameErrMsg('')
                }
              })
              .catch(() => {
                setIsAvailable(false)
                setBoardNameErrMsg('')
              })
              .finally(() => {
                setIsProcessing(false)
              })
          },
        ]}
      />
      {boardNameErrMsg && (
        <span className="inline-block text-center w-full mt-2 text-eodiro-primary-color">
          {boardNameErrMsg}
        </span>
      )}
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
        disabled={!isAvailable || isProcessing}
      >
        투표 시작
      </Button>
    </Body>
  )
}

export default withRequireAuth(NewBoardPage)
