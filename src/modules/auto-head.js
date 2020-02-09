/**
 * Generate head objects
 * @param {string} title
 * @param {string} description
 */
export default function(title, description) {
  const metaTags = []

  if (title) {
    metaTags.push({
      hid: 'og:title',
      name: 'og:title',
      content: title,
    })
  }

  if (description) {
    metaTags.push(
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: description,
      }
    )
  }
  return metaTags
}
