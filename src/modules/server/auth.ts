import EodiroEncrypt from '@/modules/server/eodiro-encrypt'
import EodiroMailer from '@/modules/server/eodiro-mailer'
import crypto from 'crypto'
import Mustache from 'mustache'
import { prisma } from '../prisma'
import { rng } from '../random-name-generator'
import { sanitizePoralId } from '../sanitize-portal-id'
import {
  AuthValidationResult,
  validateNickname,
  validatePassword,
  validatePortalId,
} from './auth/validation'
import joinEmailTemplate from './eodiro-mailer/templates/join'

export type SignInInfo = {
  portalId: string
  password: string
}

export type SignUpInfo = {
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

    const sanitizedPortalId = sanitizePoralId(portalId)

    // Available
    // There's no user with this portal ID yet
    // Generate hash and send a verification email
    const pendingToken = Auth.generateToken()
    await prisma.pendingUser.create({
      data: {
        portalId: sanitizedPortalId,
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
      to: sanitizedPortalId,
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
