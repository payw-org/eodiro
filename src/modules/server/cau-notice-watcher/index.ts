import { prisma } from '@/modules/prisma'
import appRoot from 'app-root-path'
import chalk from 'chalk'
import fs from 'fs'
import { JSDOM } from 'jsdom'
import { PendingXHR } from 'pending-xhr-puppeteer'
import puppeteer, { Browser, Page } from 'puppeteer'
import Push, { PushInformation } from '../push'

export type TitleBuilder = (
  /** A single notice item */ noticeItemElement: HTMLElement | Element
) => string

export type UrlBuilder = (
  /** A single notice item */ noticeItemElement: HTMLElement | Element
) => string

export type FeedOptions = {
  /**
   * Minutes
   * @default 10
   */
  interval?: number
}

export interface Vender {
  /** Notice name which will be displayed on the end users */
  name: string
  /** Unique key(id) for differentiating each subscriber */
  key: string
  url: string
  /** A CSS selector of */
  noticeItemSelector: string
  titleBuilder: TitleBuilder
  urlBuilder?: UrlBuilder
}

export type LastNotice = Record<
  string,
  {
    displayName: string
    title: string
  }
>

const eodiroTempDir = appRoot.resolve('/.eodiro')
const lastNoticeFilePath = appRoot.resolve('/.eodiro/last_notice.json')

export class CauNoticeWatcher {
  private feedOptions: FeedOptions

  private vendors: Vender[] = []

  private lastNotice: LastNotice

  constructor(feedOptions?: FeedOptions) {
    if (!feedOptions) {
      feedOptions = {
        interval: 10,
      }
    } else if (!feedOptions?.interval) {
      feedOptions.interval = 10
    }

    this.feedOptions = feedOptions
    this.lastNotice = CauNoticeWatcher.loadLastNoticeFile()
  }

  public watch(subscriber: Vender): void {
    for (const registeredSubscriber of this.vendors) {
      if (registeredSubscriber.key === subscriber.key) {
        throw new Error(
          `${chalk.blueBright(
            '[Notice Watcher]'
          )} Duplicate subscriber key detected: ${subscriber.key}`
        )
      }
    }
    this.vendors.push(subscriber)

    if (!this.lastNotice[subscriber.key]) {
      this.lastNotice[subscriber.key] = {
        displayName: subscriber.name,
        title: '',
      }
    }
  }

  /**
   * Get the `last_notice.json` file inside '.eodiro' directory
   */
  public static loadLastNoticeFile(): LastNotice {
    let lastNotice: LastNotice

    if (!fs.existsSync(eodiroTempDir)) {
      fs.mkdirSync(eodiroTempDir)
    }

    if (!fs.existsSync(lastNoticeFilePath)) {
      lastNotice = {}
      fs.writeFileSync(lastNoticeFilePath, JSON.stringify(lastNotice, null, 2))
    } else {
      lastNotice = JSON.parse(fs.readFileSync(lastNoticeFilePath, 'utf8'))
    }

    return lastNotice
  }

  private writeLastNoticeFile() {
    fs.writeFileSync(
      lastNoticeFilePath,
      JSON.stringify(this.lastNotice, null, 2)
    )
  }

  private getLastNoticeTitle(subscriber: Vender) {
    return this.lastNotice[subscriber.key].title
  }

  private updateLastNotice(subscriber: Vender, title: string) {
    this.lastNotice[subscriber.key] = {
      displayName: subscriber.name,
      title,
    }
  }

  public async run(): Promise<void> {
    const browser = await puppeteer.launch()

    const processResults = []

    for (const subscriber of this.vendors) {
      processResults.push(this.processSubscriber(browser, subscriber))
    }

    await Promise.all(processResults)

    // Dispose the browser
    await browser.close()
  }

  private async processSubscriber(browser: Browser, subscriber: Vender) {
    const page = await browser.newPage()

    page.setViewport({ width: 1280, height: 800 })

    // page.setMaxListeners(Infinity)

    const noticesSet = await CauNoticeWatcher.visit(page, subscriber).catch(
      (err) => {
        console.error(err)
        process.exit()
      }
    )
    const notices = Array.from(noticesSet)

    if (notices.length === 0) {
      return
    }

    // Get subscriptions
    const subscriptions = await prisma.noticeNotificationsSubscription.findMany(
      {
        where: {
          noticeKey: subscriber.key,
        },
        select: {
          user: {
            select: {
              pushes: {
                select: {
                  expoPushToken: true,
                },
              },
            },
          },
        },
      }
    )

    const expoPushTokens = subscriptions
      .map((sub) => sub.user.pushes.map((push) => push.expoPushToken))
      .flat()

    const shouldSendPush = expoPushTokens.length > 0

    const lastNoticeIndex = notices.findIndex(
      (notice) => notice.title === this.getLastNoticeTitle(subscriber)
    )

    const pushes: PushInformation[] = []

    if (lastNoticeIndex > 0) {
      for (let i = lastNoticeIndex - 1; i >= 0; i -= 1) {
        const notice = notices[i]

        console.info(`\n새로운 ${subscriber.name} 공지사항이 올라왔습니다.`)
        console.info(notices[i])

        if (shouldSendPush) {
          const pushInformation: PushInformation = {
            to: expoPushTokens,
            title: `새로운 ${subscriber.name} 공지사항이 올라왔습니다.`,
            body: notice.title,
            data: {
              type: 'notice',
              url: notice.noticeItemUrl,
            },
            sound: 'default',
            _displayInForeground: true,
          }

          pushes.push(pushInformation)
        }
      }
    } else {
      console.info(`${subscriber.name}: there is no new notice`)
    }

    if (shouldSendPush) {
      const results = await Push.notify(pushes)
    }

    await page.close()
    this.updateLastNotice(subscriber, notices[0].title)
    this.writeLastNoticeFile()
  }

  static async visit(
    page: Page,
    subscriber: Vender,
    pageNumber?: number
  ): Promise<
    {
      title: string
      noticeItemUrl: string
    }[]
  > {
    const pendingXHR = new PendingXHR(page)

    try {
      await page.goto(subscriber.url)
      await pendingXHR.waitForAllXhrFinished()
      await page.waitForSelector(subscriber.noticeItemSelector)
    } catch (err) {
      throw new Error(err)
    }

    const bodyHtml = await page.$eval('body', (body) => body.innerHTML)

    const { body } = new JSDOM(bodyHtml).window.document

    const notices: {
      title: string
      noticeItemUrl: string
    }[] = []
    const noticeElms = body.querySelectorAll(subscriber.noticeItemSelector)

    for (const noticeElm of Array.from(noticeElms)) {
      const title = subscriber.titleBuilder(noticeElm)
      const noticeItemUrl = subscriber.urlBuilder
        ? subscriber.urlBuilder(noticeElm)
        : subscriber.url

      notices.push({
        title,
        noticeItemUrl,
      })
    }

    return notices
  }
}
