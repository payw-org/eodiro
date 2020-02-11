export default function(langCode) {
  return {
    global: require(`../global/${langCode}`).default,
    home: require(`../home/${langCode}`).default,
    vacant: require(`../vacant/${langCode}`).default,
    searchClass: require(`../lectures/${langCode}`).default,
    lectures: require(`../lectures/${langCode}`).default,
    inquiry: require(`../inquiry/${langCode}`).default,
    pref: require(`../preferences/${langCode}`).default,
    peperoSquare: require(`../pepero-square/${langCode}`).default,
    donation: require(`../donation/${langCode}`).default,
    cafeteria: require(`../cafeteria/${langCode}`).default,
    opensource: require(`../opensource/${langCode}`).default,
    auth: require(`../auth/${langCode}`).default,
    me: require(`../me/${langCode}`).default,
    privacy: require(`../privacy/${langCode}`).default,
  }
}
