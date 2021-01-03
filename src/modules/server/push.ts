/* eslint-disable no-underscore-dangle */

import Axios from 'axios'

export type PushInformation = {
  /**
   * ExpoPushToken
   */
  to: string | string[]
  title: string
  body: string
  data?: Record<string, unknown>
  sound?: 'default'
  /**
   * @default true
   */
  _displayInForeground?: boolean
}

type PushOk = { status: 'ok'; id: string }
type PushError = {
  status: 'error'
  message: string
  details: { error: string }
}

export default class Push {
  static async notify(
    payload: PushInformation | PushInformation[]
  ): Promise<{ data: (PushOk | PushError)[] }> {
    const response = await Axios({
      method: 'POST',
      url: 'https://exp.host/--/api/v2/push/send',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(payload),
    })

    return response.data
  }
}
