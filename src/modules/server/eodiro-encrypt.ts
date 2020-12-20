import bcrypt from 'bcrypt'

export default class EodiroEncrypt {
  static async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)
    return hash
  }

  static async isSame(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}
