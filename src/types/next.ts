import { AuthData } from '@/modules/jwt'
import { NextApiRequest, NextApiResponse } from 'next'

export type EodiroApiRequest = NextApiRequest & {
  authData: AuthData
}

export type EodiroApiResponse<T = any> = NextApiResponse<T>
