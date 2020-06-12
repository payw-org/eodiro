import { useEffect, useRef } from 'react'

import ApiHost from '@/modules/api-host'
import Body from '@/layouts/BaseLayout/Body'
import io from 'socket.io-client'

export type LivePageProps = unknown

const LivePage: React.FC<LivePageProps> = (props) => {
  const socket = useRef<SocketIOClient.Socket>(null)

  useEffect(() => {
    socket.current = io.connect(ApiHost.getHost())

    socket.current.on('news', (data) => {
      console.log(data)
    })
  })

  return (
    <Body pageTitle="LIVE">
      <button
        onClick={() => {
          if (!socket.current) return

          socket.current.emit('my other event', { my: 'data' })
          console.log('click')
        }}
      >
        Click me
      </button>
    </Body>
  )
}

export default LivePage
