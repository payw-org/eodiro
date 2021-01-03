import { Vender } from '..'

const url = 'https://www.cau.ac.kr/cms/FR_CON/index.do?MENU_ID=100#page1'

export const cau: Vender = {
  name: 'CAU Notice',
  key: 'cau',
  url,
  noticeItemSelector: '.typeNoti',
  titleBuilder: (noticeElm) => {
    const mark =
      noticeElm.querySelector('.mark_noti')?.textContent?.trim() ?? ''
    const title = noticeElm.querySelector('a')?.textContent?.trim() ?? ''

    return `${mark} ${title}`
  },
  urlBuilder: (noticeElm) => {
    const href = noticeElm.querySelector('a')?.href ?? ''
    const matched = /goDetail\('([0-9]*)'/g.exec(href)
    const noticeItemId = matched ? matched[1] : null

    return noticeItemId
      ? `https://www.cau.ac.kr/cms/FR_CON/BoardView.do?MENU_ID=100&CONTENTS_NO=1&SITE_NO=2&P_TAB_NO=&TAB_NO=&BOARD_SEQ=4&BOARD_CATEGORY_NO=&BBS_SEQ=${noticeItemId}&pageNo=1`
      : url
  },
}
