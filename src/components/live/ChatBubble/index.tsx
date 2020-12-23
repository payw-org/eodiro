import classNames from 'classnames'
import $ from './style.module.scss'

export type ChatBubbleProps = {
  msg: string
  randomNickname: string
  ownership: 'mine' | 'notMine'
}
const ChatBubble: React.FC<ChatBubbleProps> = ({
  msg,
  randomNickname,
  ownership,
}) => {
  return (
    <div
      className={classNames($['chat-bubble-box'], {
        [$['mine']]: ownership === 'mine',
      })}
    >
      <span className={$['random-nickname']}>{randomNickname}</span>
      <div className={classNames($['chat-bubble'])}>{msg}</div>
    </div>
  )
}

export default ChatBubble
