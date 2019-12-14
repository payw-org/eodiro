import { describe, it } from 'mocha'
import { expect } from 'chai'
import autoHead from '../src/modules/auto-head'

const title = 'page title'
const description = 'welcome'

describe(`AutoHead test with title ${title}`, () => {
  const result = autoHead(title)

  it('array of length 1', () => {
    expect(result).to.be.lengthOf(1)
  })

  it('hid: "og:title"', () => {
    expect(result[0].hid).to.equal('og:title')
  })
  it('name: "og:title"', () => {
    expect(result[0].name).to.equal('og:title')
  })
  it(`content: "${title}"`, () => {
    expect(result[0].content).to.equal(title)
  })
})

describe(`AutoHead test with title "${title}" and description "${description}"`, () => {
  const result = autoHead(title, description)

  it('array of length 3', () => {
    expect(result).to.have.lengthOf(3)
  })

  it('title -> hid: "og:title"', () => {
    expect(result[0].hid).to.equal('og:title')
  })
  it('title -> name: "og:title"', () => {
    expect(result[0].name).to.equal('og:title')
  })
  it(`title -> content: "${title}"`, () => {
    expect(result[0].content).to.equal(title)
  })

  it('description -> hid: "description"', () => {
    expect(result[1].hid).to.equal('description')
  })
  it('description -> name: "description"', () => {
    expect(result[1].name).to.equal('description')
  })
  it(`description -> content: "${description}"`, () => {
    expect(result[1].content).to.equal(description)
  })

  it('og:description -> hid: "og:description"', () => {
    expect(result[2].hid).to.equal('og:description')
  })
  it('og:description -> name: "og:description"', () => {
    expect(result[2].name).to.equal('og:description')
  })
  it(`og:description -> content: "${description}"`, () => {
    expect(result[2].content).to.equal(description)
  })
})
