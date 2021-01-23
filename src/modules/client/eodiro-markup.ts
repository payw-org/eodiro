import { env } from '@/env'
import escapeHtml from 'escape-html'

const eodiroImageRegExp = /\[ 이미지 \| (.*?) \]/g
const urlRegExp = /((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?)/g

export default class EodiroMarkup {
  static generateImageMarkup(imgSrc: string) {
    return `[ 이미지 | ${imgSrc.replace(env.IMGUR_HOST, '')} ]`
  }

  static parse(src: string) {
    return src
      .split('\n')
      .map((line) => {
        if (line.length === 0) {
          // eslint-disable-next-line react/no-array-index-key
          return `<br />`
        }

        const imageRegResult = eodiroImageRegExp.exec(line.trim())

        if (imageRegResult) {
          const imgHash = imageRegResult[1]
          eodiroImageRegExp.lastIndex = 0
          return `<img src="${env.IMGUR_HOST}${imgHash}" />`
        }

        const escapedLine = escapeHtml(line)

        // eslint-disable-next-line react/no-array-index-key
        return `<p>${escapedLine.replace(
          urlRegExp,
          `<a href="$1" target="_blank">$1</a>`
        )}</p>`
      })
      .join('')
  }
}
