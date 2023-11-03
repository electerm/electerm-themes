const {
  resolve
} = require('path')
const {
  exec
} = require('shelljs')
const fs = require('fs')
const pack = require('../package.json')
const deepCopy = require('json-deep-copy')

const packNew = deepCopy(pack)
packNew.scripts = {}
fs.writeFileSync(resolve(__dirname, '../package.json'), JSON.stringify(packNew, null, 2))
exec('npm publish --access public')
fs.writeFileSync(resolve(__dirname, '../package.json'), JSON.stringify(pack, null, 2))
