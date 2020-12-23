// TODO: Scroll to bottom on focus

import { Tokens } from '@/api'
import {
  NavHiddenDispatchContext,
  NavScrollDispatchContext,
} from '@/components/global/Navigation'
import NoFooter from '@/components/utils/NoFooter'
import Body from '@/layouts/BaseLayout/Body'
import ApiHost from '@/modules/api-host'
import { useAuth } from '@/pages/_app'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import classNames from 'classnames'
import { useContext, useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import ChatBubble from '../ChatBubble'
import $ from './style.module.scss'

export type LivePageProps = unknown

function sendMsg(msg: string, socket: SocketIOClient.Socket) {
  if (msg.trim().length === 0 || !socket) return

  socket.emit('send_live_chat', {
    text: msg,
  })
}

const MAX_DISPLAY_NUM = 500
let sendTimeout: number | null = null
let fastSendCount = 0

const LivePage: React.FC<LivePageProps> = () => {
  const socket = useRef<SocketIOClient.Socket>(null)
  const [chatMsg, setChatMsg] = useState('')
  const chatMsgInput = useRef<HTMLInputElement>(null)
  const [msgs, setMsgs] = useState<
    { text: string; isMine: boolean; rn: string }[]
  >([])
  const [isChatLocked, setIsChatLocked] = useState(false)
  const msgScrollWrapper = useRef<HTMLDivElement>(null)

  const setNavHidden = useContext(NavHiddenDispatchContext)
  const setNavScrolled = useContext(NavScrollDispatchContext)

  const [totalUsersNum, setTotalUsersNum] = useState(0)

  const { isSigned } = useAuth()

  function scrollToBottom() {
    msgScrollWrapper.current?.scrollTo(0, msgScrollWrapper.current.scrollHeight)
  }

  function isNearBottom() {
    if (!msgScrollWrapper.current) return false

    const { scrollHeight, scrollTop, offsetHeight } = msgScrollWrapper.current

    return scrollHeight - scrollTop - offsetHeight < 10
  }

  useEffect(() => {
    function updateMsgs(data: any, isMine: boolean) {
      const isBottommed = isNearBottom()

      setMsgs((prevMsgs) => [
        ...prevMsgs,
        {
          ...data,
          isMine,
        },
      ])

      if (isBottommed || isMine) {
        scrollToBottom()
      }
    }

    async function init() {
      const htmlAndBody = [document.documentElement, document.body]
      htmlAndBody.forEach((elm) => {
        elm.style.overflow = 'hidden'
        elm.style.height = '100%'
        elm.style.width = '100%'
      })

      // setTimeout(() => {
      //   setNavHidden(false)
      //   setNavScrolled(true)
      // }, 500)

      if (!isSigned) return

      socket.current = io.connect(ApiHost.getHost(), {
        query: {
          accessToken: (await Tokens.get()).accessToken,
        },
      })

      socket.current.on('new_live_chat', (data) => updateMsgs(data, false))
      socket.current.on('new_live_chat_mine', (data) => updateMsgs(data, true))

      socket.current.on('user_num_changed', (data) => {
        setTotalUsersNum(data)
      })
    }

    init()

    return () => {
      socket.current && socket.current.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!chatMsgInput.current) return

    const focusHandler = () => {
      disableBodyScroll(msgScrollWrapper.current)
      if (isNearBottom()) {
        setTimeout(() => {
          scrollToBottom()
        }, 0)
      }
    }
    const blurHanlder = () => {
      clearAllBodyScrollLocks()
    }

    chatMsgInput.current.addEventListener('focus', focusHandler)
    chatMsgInput.current.addEventListener('blur', blurHanlder)

    return () => {
      chatMsgInput.current.removeEventListener('focus', focusHandler)
      chatMsgInput.current.removeEventListener('blur', blurHanlder)
    }
  }, [])

  useEffect(() => {
    if (msgs.length <= MAX_DISPLAY_NUM) return

    setMsgs([...msgs].slice(msgs.length - MAX_DISPLAY_NUM))
  }, [msgs])

  useEffect(() => {
    if (isChatLocked) {
      chatMsgInput.current.blur()
    }
  }, [isChatLocked])

  function processSend() {
    if (fastSendCount > 3) {
      const afterSec = 5000

      setIsChatLocked(true)

      alert(
        `한 번에 너무 많은 메시지를 보낼 수 없습니다. ${
          afterSec / 1000
        }초 후에 다시 시도해 주세요.`
      )

      setTimeout(() => {
        setIsChatLocked(false)
        fastSendCount = 0
      }, afterSec)
      return
    }

    if (sendTimeout !== null) {
      fastSendCount += 1
    } else {
      fastSendCount = 0
    }

    clearTimeout(sendTimeout)
    sendTimeout = setTimeout(() => {
      sendTimeout = null
    }, 500)

    sendMsg(chatMsg, socket.current)
    setChatMsg('')
  }

  return (
    <Body pageTitle="LIVE" titleHidden bodyClassName={$['eodiro-live-page']}>
      <NoFooter />

      <div
        className={classNames('overlay-sentinel-spot', 'title-sentinel-spot')}
      />

      <div className={$['total-users-num']}>{totalUsersNum}명 접속 중</div>

      <div ref={msgScrollWrapper} className={$['messages-scroll-wrapper']}>
        <div className={$['information']}>
          <h1 className={$['title']}>
            <i className={classNames('f7-icons', $['bubble-icon'])}>
              chat_bubble_2
            </i>
            어디로 LIVE
          </h1>
          <p className={$['description']}>
            어디로 LIVE는 실시간 채팅 서비스입니다.
            <br />
            모든 채팅 내역은 휘발성이며 전송과 동시에 데이터가 사라집니다.
            <br />
            비윤리적인 내용 입력 시 서비스 이용이 제한됩니다.
          </p>
        </div>

        <div className={$['messages-container']}>
          {msgs.map((msg, i) => {
            return (
              <div key={i} className={classNames($['chat-bubble-wrapper'])}>
                <ChatBubble
                  randomNickname={msg.rn}
                  msg={msg.text}
                  ownership={msg.isMine ? 'mine' : 'notMine'}
                />
              </div>
            )
          })}
        </div>
      </div>

      <div className={$['chat-input-wrapper']}>
        <input
          type="text"
          style={{
            pointerEvents: 'none',
            visibility: 'hidden',
            position: 'absolute',
            left: '-9999px',
          }}
        />
        <input
          ref={chatMsgInput}
          type="text"
          placeholder={isSigned ? '내용을 입력하세요' : '로그인이 필요합니다'}
          disabled={isChatLocked || !isSigned}
          className={classNames($['chat-input'])}
          value={chatMsg}
          onChange={(e) => {
            setChatMsg(e.target.value)
          }}
          onKeyUp={(e) => {
            if (e.key !== 'Enter') return
            if (chatMsg.trim().length === 0) return

            e.preventDefault()

            processSend()
          }}
        />

        <i
          className={classNames('f7-icons', $['send-icon'])}
          onClick={() => {
            processSend()
            chatMsgInput.current.focus()
          }}
        >
          arrow_up_circle_fill
        </i>
      </div>
    </Body>
  )
}

export default LivePage
