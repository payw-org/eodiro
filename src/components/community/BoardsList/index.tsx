import Grid from '@/layouts/Grid'
import { SafeCommunityBoard } from '@/types/schema'
import BoardItem from '../BoardItem'

type BoardsListProps = {
  boards: (SafeCommunityBoard & { isPinned: boolean })[]
  onUpdatePin?: () => void
}

export default function BoardsList({ boards, onUpdatePin }: BoardsListProps) {
  return (
    <Grid proportion="medium">
      {boards?.map((board) => (
        <BoardItem key={board.id} board={board} onUpdatePin={onUpdatePin} />
      ))}
    </Grid>
  )
}
