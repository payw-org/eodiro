import getLang from './utils/getLang'

const langCode = 'ko-KR'

export default () => {
  return new Promise(function(resolve) {
    resolve(getLang(langCode))
  })
}
