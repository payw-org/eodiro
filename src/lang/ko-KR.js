import getLang from './utils/getLang'

const langCode = 'ko-KR'

export default (context) => {
  return new Promise(function(resolve) {
    resolve(getLang(langCode))
  })
}
