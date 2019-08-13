export default function(langCode) {
  return {
    global: require(`../global/${langCode}`).default,
    home: require(`../home/${langCode}`).default,
    vacant: require(`../vacant/${langCode}`).default,
    inquiry: require(`../inquiry/${langCode}`).default,
    pref: require(`../preferences/${langCode}`).default
  }
}
