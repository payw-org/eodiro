/* eslint prefer-const: 0 */

import { LoremIpsum } from 'lorem-ipsum'
import dayjs from 'dayjs'
const lorem = new LoremIpsum()

let data = []

for (let i = 0; i < 30; i++) {
  let post = {
    id: i,
    title: lorem.generateSentences(1),
    body: lorem.generateSentences(1),
    author: lorem.generateWords(1),
    at: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }

  data.push(post)
}

export default { data }
