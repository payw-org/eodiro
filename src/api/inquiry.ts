import ApiHost from '@/modules/api-host'
import { IncomingMessage } from 'http'
import eodiroAxios from '@/modules/eodiro-axios'
import queryString from 'query-string'

export type InquiryData = {
  id: number
  email: string
  title: string
  body: string
  answer?: string
  uploaded_at: string
  answered_at?: string
}

export class InquiryApi {
  static async inquiries(
    offset: number,
    amount?: number,
    req?: IncomingMessage
  ): Promise<InquiryData[] | null> {
    const [err, data, status] = await eodiroAxios<InquiryData[]>(
      {
        method: 'get',
        url:
          ApiHost.getHost() +
          `/inquiry?` +
          queryString.stringify({ amount, offset }),
      },
      {
        access: true,
        req,
      }
    )
    return err
      ? null
      : status === 401
      ? undefined
      : status === 500
      ? null
      : data
  }
  static async post(
    title: string,
    body: string,
    email: string
  ): Promise<boolean> {
    const [, , status] = await eodiroAxios(
      {
        method: 'post',
        url: ApiHost.getHost() + `/inquiry`,
        data: {
          title,
          body,
          email,
        },
      },
      {
        accessIfExist: true,
      }
    )
    if (status === 201) {
      return true
    }
    return false
  }
}
