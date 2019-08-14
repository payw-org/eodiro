export default function(langCode) {
  return {
    global: require(`../global/${langCode}`).default,
    home: require(`../home/${langCode}`).default,
    vacant: require(`../vacant/${langCode}`).default,
    review: require(`../review/${langCode}`).default,
    searchClass: require(`../search-class/${langCode}`).default,
    pref: require(`../preferences/${langCode}`).default
  }
}
