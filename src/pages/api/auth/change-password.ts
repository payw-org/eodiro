import { nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import Auth from '@/modules/server/auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'

export type ApiAuthChangePasswordReqData = {
  userId: number
  password: string
}

export default nextApi({
  post: async (req, res) => {
    await validateRequiredReqDataMiddleware<ApiAuthChangePasswordReqData>({
      body: {
        userId: 'number',
        password: 'string',
      },
    })(req, res)

    const { userId, password } = req.body as ApiAuthChangePasswordReqData

    await prisma.changePassword.delete({ where: { userId } })

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: await Auth.encryptPw(password),
      },
    })

    res.status(200).end()
  },
})
