import getLang from './utils/getLang'

const langCode = 'en-US'

export default (context) => {
  return new Promise(function(resolve) {
    resolve(getLang(langCode))
  })
}
