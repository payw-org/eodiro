import { Vender } from '..'

export const log: Vender = {
  name: '국제물류학과',
  key: 'log',
  url: 'http://log.cau.ac.kr/graduate/notice_list.php',
  noticeItemSelector: '.noticeList tbody tr',
  titleBuilder: (noticeElm) =>
    noticeElm.querySelector('.tit')?.textContent?.trim() ?? '',
  urlBuilder: (noticeElm) => noticeElm.querySelector('a')?.href ?? '',
}
