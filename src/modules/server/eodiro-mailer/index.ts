import { env } from '@/env'
import chalk from 'chalk'
import NodeMailer from 'nodemailer'

const { log } = console

interface MailOption {
  /**
   * "name" \<alias@eodiro.com\>
   */
  from?: {
    name: string
    alias: string
  }
  subject: string
  to: string
  html?: string
}

export default class EodiroMailer {
  private static transporter = NodeMailer.createTransport({
    service: env.MAIL_SERVICE,
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    secure: true,
    auth: {
      user: env.MAIL_USERNAME,
      pass: env.MAIL_PASSWORD,
    },
  })

  private static isReady = false

  static async verify(): Promise<boolean> {
    return new Promise((resolve) => {
      this.transporter.verify((err) => {
        if (err) {
          log(`[ ${chalk.red('error')} ] failed to connect to zoho mail server`)
          console.error(err.message)
          resolve(false)
        } else {
          log(`[ ${chalk.yellow('email')} ] connected to zoho mail server`)
          this.isReady = true
          resolve(true)
        }
      })
    })
  }

  private static createFrom(name: string, alias: string) {
    return `"${name}" <${alias}@eodiro.com>`
  }

  static async sendMail(options: MailOption): Promise<any> {
    if (!this.isReady) {
      log(`[ ${chalk.yellow('email')} ] not connected to an email server`)
      log(
        `[ ${chalk.yellow(
          'email'
        )} ] connecing to the email server for the first time`
      )
      await this.verify()
    }

    const defaultFrom = this.createFrom('어디로', 'no-reply')

    const sendOptions = {
      ...options,
      from: options.from
        ? this.createFrom(options.from.name, options.from.alias)
        : defaultFrom,
    }

    return this.transporter.sendMail(sendOptions)
  }
}
