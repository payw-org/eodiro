export default function(langCode) {
  return {
    global: require(`../global/${langCode}`).default,
    home: require(`../home/${langCode}`).default,
    vacant: require(`../vacant/${langCode}`).default,
    searchClass: require(`../search-class/${langCode}`).default,
    inquiry: require(`../inquiry/${langCode}`).default,
    pref: require(`../preferences/${langCode}`).default,
    peperoSquare: require(`../pepero-square/${langCode}`).default,
    donation: require(`../donation/${langCode}`).default,
    meals: require(`../meals/${langCode}`).default,
    opensource: require(`../opensource/${langCode}`).default
  }
}
