/* eslint-disable @typescript-eslint/explicit-function-return-type */

const express = require('express')
const nodeCookie = require('cookie')

const cookieRouter = express.Router()

/**
 * @typedef {import('../../modules/eodiro-http-cookie').Cookie} Cookie
 * @typedef {import('../../modules/eodiro-http-cookie').Cookies} Cookies
 * @typedef {import('http').IncomingMessage} IncomingMessage
 */

/**
 * @param {Cookie} cookie
 * @param {IncomingMessage} req
 * @returns {string}
 */
function buildCookieString(cookie, req) {
  let cookieString = `${cookie.name}=${cookie.value};`

  cookieString += 'HttpOnly;'

  if (cookie.expires) {
    cookieString += `Expires=${cookie.expires};`
  }

  if (req && req.socket.encrypted) {
    cookieString += 'Secure;'
  }

  return cookieString
}

const cookieApiPath = '/cookie'

// Set cookie
cookieRouter.post(cookieApiPath, async (req, res) => {
  /** @type {Cookie | Cookies} */
  const cookieData = req.body

  /** @type {string[]} */
  const cookieStrings = []

  if (Array.isArray(cookieData)) {
    cookieData.forEach((cookie) => {
      cookieStrings.push(buildCookieString(cookie, req))
    })
  } else {
    cookieStrings.push(buildCookieString(cookieData, req))
  }

  res.setHeader('Set-Cookie', cookieStrings)

  res.sendStatus(200)
})

cookieRouter.get(cookieApiPath, async (req, res) => {
  const cookies = req.headers?.cookie
    ? nodeCookie.parse(req.headers?.cookie)
    : {}

  res.json(cookies)
})

module.exports = cookieRouter
