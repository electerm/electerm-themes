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

const readThemeFiles = (folder) => {
  return fs.readdirSync(folder)
    .filter(file => file.endsWith('.txt'))
    .sort()
    .map(file => fs.readFileSync(resolve(folder, file), 'utf8'))
}

const build = () => {
  const folder = resolve(
    __dirname,
    'iTerm2-Color-Schemes/electerm'
  )
  const customFolder = resolve(__dirname, '../themes')
  const distFolder = resolve(__dirname, '../dist')
  const distThemesFolder = resolve(distFolder, 'themes')
  const all = [
    ...readThemeFiles(folder),
    ...readThemeFiles(customFolder)
  ]

  rm('-rf', distFolder)
  mkdir('-p', distFolder)
  cp('-r', folder, distThemesFolder)
  fs.readdirSync(customFolder)
    .filter(file => file.endsWith('.txt'))
    .forEach(file => {
      fs.copyFileSync(
        resolve(customFolder, file),
        resolve(distThemesFolder, file)
      )
    })

  const t1 = resolve(distFolder, 'index.js')
  fs.writeFileSync(t1, 'module.exports = ' + json5.stringify(all, null, 2))
  const t2 = resolve(distFolder, 'index.mjs')
  fs.writeFileSync(t2, 'export default ' + json5.stringify(all, null, 2))

  return all
}

if (require.main === module) {
  build()
}

module.exports = {
  build,
  readThemeFiles
}
