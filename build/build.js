/**
 * read themes from https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/electerm
 */

const {
  resolve
} = require('path')
const {
  cp, mkdir, rm
} = require('shelljs')
const fs = require('fs')
const json5 = require('json5')

const folder = resolve(
  __dirname,
  'iTerm2-Color-Schemes/electerm'
)
const list = fs.readdirSync(folder)
const all = list.map(f => {
  return fs.readFileSync(
    resolve(folder, f), 'utf8'
  )
})
rm('-rf', resolve(__dirname, '../dist'))
mkdir('-p', resolve(__dirname, '../dist'))
cp('-r', resolve(__dirname, 'iTerm2-Color-Schemes/electerm'), resolve(__dirname, '../dist/themes'))
const t1 = resolve(__dirname, '../dist/index.js')
fs.writeFileSync(t1, 'module.exports = ' + json5.stringify(all, null, 2))
const t2 = resolve(__dirname, '../dist/index.mjs')
fs.writeFileSync(t2, 'export default ' + json5.stringify(all, null, 2))
