import EodiroEncrypt from '@/modules/server/eodiro-encrypt'
import EodiroMailer from '@/modules/server/eodiro-mailer'
import crypto from 'crypto'
import Mustache from 'mustache'
import { DecodedAuthData, verifyToken } from '../jwt'
import { prisma } from '../prisma'
import { rng } from '../random-name-generator'
import {
  AuthValidationResult,
  validateNickname,
  validatePassword,
  validatePortalId,
} from './auth/validation'
import joinEmailTemplate from './eodiro-mailer/templates/join'

export interface SignInInfo {
  portalId: string
  password: string
}

export interface SignUpInfo {
  portalId: string
  password: string
  nickname: string
}

export type SignUpResult = {
  hasJoined: boolean
  validations: {
    portalId: AuthValidationResult
    nickname: AuthValidationResult
    password: AuthValidationResult
  }
}

export default class Auth {
  /**
   * Returns an encrypted password
   */
  static async encryptPw(password: string): Promise<string> {
    return EodiroEncrypt.hash(password)
  }

  /**
   * @deprecated
   * Legacy password encryption
   */
  static encryptPwLegacy(password: string): string {
    return crypto.createHash('sha256').update(password).digest('base64')
  }

  /**
   * Generates a random token which will be
   * stored in DB and will be used later
   * for email verification
   */
  static generateToken(): string {
    return crypto.randomBytes(20).toString('hex')
  }

  /**
   * Verifies the email verification with the given token
   */
  static async verifyPendingUser(token: string): Promise<boolean> {
    if (!token || typeof token !== 'string') {
      return false
    }

    const user = await prisma.pendingUser.findUnique({
      where: {
        token,
      },
    })

    if (!user) {
      return false
    }

    const removePending = prisma.pendingUser.delete({
      where: {
        token,
      },
    })
    const createUser = prisma.user.create({
      data: {
        ...user,
      },
    })

    await prisma.$transaction([removePending, createUser])

    return true
  }

  /**
   * Verifies the given access token and returns user ID if it is valid.
   * Otherwise returns false.
   */
  static async isSignedUser(
    accessToken: string
  ): Promise<DecodedAuthData | false> {
    if (!accessToken || accessToken === 'null' || accessToken === 'undefined') {
      return false
    }

    const [err, decodedAuthData] = await verifyToken(accessToken, 'access')

    return err ? false : decodedAuthData
  }

  static async signIn(info: SignInInfo): Promise<[number, boolean]> {
    let portalId = info?.portalId
    let password = info?.password

    // Refine information
    portalId = portalId ? portalId.trim().toLowerCase() : portalId
    password = password ? password.trim() : password

    if (!portalId || !password) {
      return [undefined, false]
    }

    // const User = await getUser()
    // const user = await User.findWithPortalId(portalId, true)
    const user = await prisma.user.findUnique({ where: { portalId } })

    // TODO: Remove the legacy password matching process
    if (
      user &&
      ((await EodiroEncrypt.isSame(password, user.password)) ||
        user.password === Auth.encryptPwLegacy(password))
    ) {
      return [user.id, true]
    }

    return [undefined, false]
  }

  static async signUp(info: SignUpInfo): Promise<SignUpResult> {
    const { portalId, nickname, password } = info

    const portalIdValidation = await validatePortalId(portalId)
    const nicknameValidation = await validateNickname(nickname)
    const passwordValidation = await validatePassword(password)

    const validations = {
      portalId: portalIdValidation,
      nickname: nicknameValidation,
      password: passwordValidation,
    }

    if (
      portalIdValidation.error ||
      nicknameValidation.error ||
      passwordValidation.error
    ) {
      return { hasJoined: false, validations }
    }

    // Available
    // There's no user with this portal ID yet
    // Generate hash and send a verification email
    const pendingToken = Auth.generateToken()
    await prisma.pendingUser.create({
      data: {
        portalId,
        password: await Auth.encryptPw(password),
        nickname,
        token: pendingToken,
        randomNickname: rng(),
      },
    })

    // Verification code has been generated

    // Send a verification email

    const html = Mustache.render(joinEmailTemplate, { token: pendingToken })

    EodiroMailer.sendMail({
      to: portalId,
      subject: '[회원가입] 인증 이메일',
      html,
    })

    // Send an additional registration notification email to us
    // EodiroMailer.sendMail({
    //   to: 'contact@payw.org',
    //   subject: `회원가입: ${portalId}`,
    //   html: ''
    // })

    return { hasJoined: true, validations }
  }
}
