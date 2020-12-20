const appRoot = require('app-root-path')
const fs = require('fs')

const pathToPrisma = appRoot.resolve('/build/src/prisma')

if (!fs.existsSync(pathToPrisma)) {
  fs.mkdirSync(pathToPrisma)
}

fs.copyFileSync(
  appRoot.resolve('/prisma/schema.prisma'),
  pathToPrisma + '/schema.prisma'
)
