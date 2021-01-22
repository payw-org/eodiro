import { statusCode } from '@/constants/http-status-code'
import { env } from '@/env'
import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import appRoot from 'app-root-path'
import axios from 'axios'
import FormData from 'form-data'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default nextApi({
  post: createHandler(async (req, res) => {
    await requireAuthMiddleware(req, res)
    const form = new formidable.IncomingForm()

    form.uploadDir = './'
    form.keepExtensions = true

    form.parse(req, async (err, _, files) => {
      if (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).end()
      }

      const image = files['image'] as any
      const path = appRoot.resolve(image.path)

      const stream = fs.createReadStream(path)

      const formData = new FormData()

      formData.append('image', stream)

      try {
        const response = await axios({
          method: 'POST',
          url: 'https://api.imgur.com/3/upload',
          headers: {
            Authorization: `Client-ID ${env.IMGUR_CLIENT_ID}`,
            ...formData.getHeaders(),
          },
          data: formData,
        })

        res.status(200).json({
          link: response.data.data.link,
        })
      } catch (error) {
        console.error(error.response?.data)
        res.status(statusCode.INTERNAL_SERVER_ERROR).end()
      }

      fs.unlinkSync(path)
    })
  }),
})
