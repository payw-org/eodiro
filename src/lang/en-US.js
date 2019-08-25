import getLang from './utils/getLang'

const langCode = 'en-US'

export default () => {
  return new Promise(function(resolve) {
    resolve(getLang(langCode))
  })
}
