import { Vender } from '..'

export const dormitoryBlueMir: Vender = {
  name: '생활관(블루미르홀)',
  key: 'dormitory-blue-mir',
  url: 'http://dormitory.cau.ac.kr/bbs/bbs_list.php?bbsID=notice',
  noticeItemSelector: '#content table tr[bgcolor="#fffcdb"]',
  titleBuilder: (noticeElm) =>
    noticeElm.querySelector('span')?.textContent ?? '',
  urlBuilder: (noticeElm) => noticeElm.querySelector('a')?.href ?? '',
}
