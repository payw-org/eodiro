import {
  NavHiddenDispatchContext,
  NavScrollDispatchContext,
} from '@/components/global/Navigation'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import { useContext, useEffect, useRef, useState } from 'react'

import $ from './style.module.scss'
import ApiHost from '@/modules/api-host'
import Body from '@/layouts/BaseLayout/Body'
import ChatBubble from '../ChatBubble'
import NoFooter from '@/components/utils/NoFooter'
import { Tokens } from '@/api'
import classNames from 'classnames'
import io from 'socket.io-client'

export type LivePageProps = unknown

function sendMsg(msg: string, socket: SocketIOClient.Socket) {
  socket.emit('send_live_chat', {
    text: msg,
  })
}

const MAX_DISPLAY_NUM = 500
let sendTimeout = null
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

  useEffect(() => {
    async function init() {
      const htmlAndBody = [document.documentElement, document.body]
      htmlAndBody.forEach((elm) => {
        elm.style.overflow = 'hidden'
        elm.style.height = '100%'
        elm.style.width = '100%'
      })

      setTimeout(() => {
        setNavHidden(false)
        setNavScrolled(true)
      }, 500)

      socket.current = io.connect(ApiHost.getHost(), {
        query: {
          accessToken: (await Tokens.get()).accessToken,
        },
      })

      socket.current.on('new_live_chat', (data) => {
        setMsgs((msgs) => [
          ...msgs,
          {
            ...data,
            isMine: false,
          },
        ])

        msgScrollWrapper.current.scrollTo(
          0,
          msgScrollWrapper.current.scrollHeight
        )
      })

      socket.current.on('new_live_chat_mine', (data) => {
        setMsgs((msgs) => [
          ...msgs,
          {
            ...data,
            isMine: true,
          },
        ])

        msgScrollWrapper.current.scrollTo(
          0,
          msgScrollWrapper.current.scrollHeight
        )
      })
    }

    init()

    return () => {
      socket.current.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!chatMsgInput.current) return

    const focusHandler = () => {
      disableBodyScroll(msgScrollWrapper.current)
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

  return (
    <Body pageTitle="LIVE" titleHidden bodyClassName={$['eodiro-live-page']}>
      <NoFooter />

      <div
        className={classNames('overlay-sentinel-spot', 'title-sentinel-spot')}
      />

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
          disabled={isChatLocked}
          className={classNames($['chat-input'])}
          value={chatMsg}
          onChange={(e) => {
            setChatMsg(e.target.value)
          }}
          onKeyUp={(e) => {
            if (e.key !== 'Enter') return
            if (chatMsg.trim().length === 0) return

            e.preventDefault()

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
          }}
        />

        <i className={classNames('f7-icons', $['send-icon'])}>
          arrow_up_circle_fill
        </i>
      </div>
    </Body>
  )
}

export default LivePage
