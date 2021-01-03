import { Vender } from '..'

const url = 'https://cse.cau.ac.kr/sub05/sub0501.php'

export const cse: Vender = {
  name: '소프트웨어학부',
  key: 'cse',
  url,
  noticeItemSelector: '.table-basic tbody tr',
  titleBuilder: (noticeElm) =>
    noticeElm
      .querySelector('a')
      ?.textContent?.trim()
      ?.replace(/NEW$/, '')
      ?.trim() ?? '',
  urlBuilder: (noticeElm) => url + noticeElm.querySelector('a')?.href ?? '',
}
