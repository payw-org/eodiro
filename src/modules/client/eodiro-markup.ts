import escapeHtml from 'escape-html'

const eodiroImageRegExp = /\[ 이미지 \((.*?)\) \]/g

export default class EodiroMarkup {
  static generateImageMarkup(imgSrc: string) {
    return `[ 이미지 (${imgSrc}) ]`
  }

  static parse(src: string) {
    return src
      .split('\n')
      .map((line) => {
        if (line.length === 0) {
          // eslint-disable-next-line react/no-array-index-key
          return `<br />`
        }

        const imageRegResult = eodiroImageRegExp.exec(line)

        if (imageRegResult) {
          const imgSrc = imageRegResult[1]
          eodiroImageRegExp.lastIndex = 0
          return `<img src="${imgSrc}" />`
        }

        // eslint-disable-next-line react/no-array-index-key
        return `<p>${escapeHtml(line)}</p>`
      })
      .join('')
  }
}
