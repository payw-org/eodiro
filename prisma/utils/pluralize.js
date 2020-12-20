/**
 * @deprecated
 */

const fs = require('fs')
const pluralize = require('pluralize')
const { camelCase } = require('change-case')

const { prismaSchemaPath } = require('./prisma-schema-path')
// Read Prisma schema file
const prismaSchema = fs.readFileSync(prismaSchemaPath, 'utf8')

// Regular expression for fetching realtions
const regExp = new RegExp(/( +?)([a-zA-Z]+)( +?\2)(\[\])?/, 'g')

// Rename
const refinedSchema = prismaSchema.replace(regExp, (match, p1, p2, p3, p4) => {
  const renamed = p4 ? pluralize(camelCase(p2)) : camelCase(p2)
  return `${p1}${renamed}${p3}${p4 || ''}`
})

// Rewrite the file
fs.writeFileSync(prismaSchemaPath, refinedSchema, {
  encoding: 'utf8',
})
