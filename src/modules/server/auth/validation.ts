import { eodiroConst } from '@/constants'
import { prisma } from '@/modules/prisma'
import { sanitizePoralId } from '@/modules/sanitize-portal-id'

export type AuthValidationResult = {
  isValid: boolean
  error: null | { message: string }
}

/**
 * @param portalId Domain(`@cau.ac.kr`) is optional
 */
export async function validatePortalId(
  portalId: string
): Promise<AuthValidationResult> {
  if (!portalId || typeof portalId !== 'string' || !portalId.trim()) {
    return {
      isValid: false,
      error: { message: '포탈 아이디를 입력하세요.' },
    }
  }

  const sanitizedPortalId = sanitizePoralId(portalId)

  if (sanitizedPortalId.includes(' ')) {
    return {
      isValid: false,
      error: { message: '공백을 포함할 수 없습니다.' },
    }
  }

  const user =
    (await prisma.user.findUnique({
      where: { portalId: sanitizedPortalId },
    })) ||
    (await prisma.pendingUser.findUnique({
      where: { portalId: sanitizedPortalId },
    }))

  if (user) {
    return {
      isValid: false,
      error: { message: '이미 사용중인 포탈 아이디입니다.' },
    }
  }

  return {
    isValid: true,
    error: null,
  }
}

export async function validateNickname(
  nickname: string
): Promise<AuthValidationResult> {
  if (!nickname || typeof nickname !== 'string') {
    return {
      isValid: false,
      error: { message: '닉네임을 입력하세요.' },
    }
  }

  const user = await prisma.user.findUnique({ where: { nickname } })

  if (user) {
    return {
      isValid: false,
      error: { message: '이미 사용중인 닉네임입니다.' },
    }
  }

  if (nickname.length < eodiroConst.MIN_NICKNAME_LENGTH) {
    return {
      isValid: false,
      error: { message: '닉네임은 두 자 이상입니다.' },
    }
  }

  if (nickname.length > eodiroConst.MAX_NICKNAME_LENGTH) {
    return {
      isValid: false,
      error: { message: '닉네임은 20자 이하입니다.' },
    }
  }

  /**
   * Conditions
   * 1. No starts with numbers or _
   * 2. No ends with _
   * 3. No space
   * 4. No multiple _
   * 5. Only accepts Hangul, Alphabets(lowercase), numbers, and _
   */
  const regExp = /^(?![0-9_])(?!.*[_]$)(?!.*?([_])\1{1})[a-z0-9_가-힣]+$/g
  const regExpResult = regExp.exec(nickname)

  if (!regExpResult) {
    return {
      isValid: false,
      error: {
        message:
          '한글(완성형), 영문(소문자), 숫자, _(연속, 앞/뒤 제외)만 사용할 수 있습니다.',
      },
    }
  }

  return {
    isValid: true,
    error: null,
  }
}

export async function validatePassword(
  password: string
): Promise<AuthValidationResult> {
  if (!password || typeof password !== 'string') {
    return {
      isValid: false,
      error: { message: '암호를 입력하세요.' },
    }
  }

  if (password.length < eodiroConst.MIN_PASSWORD_LENGTH) {
    return {
      isValid: false,
      error: { message: '암호는 최소 8자입니다.' },
    }
  }

  return {
    isValid: true,
    error: null,
  }
}
