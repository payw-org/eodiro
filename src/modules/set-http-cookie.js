import useAxios from '~/modules/use-axios'

/**
 * @param {string} name
 * @param {string} value
 * @param {Object} options
 */
export default async function(name, value, options) {
  const [err] = await useAxios({
    url: '/api/set-cookie',
    method: 'post',
    data: {
      name,
      value,
      options
    }
  })

  return !err
}
