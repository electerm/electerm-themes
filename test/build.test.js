const assert = require('node:assert/strict')
const fs = require('node:fs')
const { test } = require('node:test')
const path = require('node:path')
const { build, readThemeFiles } = require('../build/build.js')

test("includes dicker's hackdio in the custom theme inputs", () => {
  const themeDir = path.resolve(__dirname, '../themes')
  const themes = readThemeFiles(themeDir)
  const themePath = path.resolve(themeDir, 'dickers-hackdio.txt')
  const theme = fs.readFileSync(themePath, 'utf8')
  const values = Object.fromEntries(
    theme.trim().split('\n').map(line => line.split('='))
  )

  assert.ok(themes.some(item => item === theme))
  assert.deepEqual(values, {
    themeName: "dicker's hackdio",
    'main-dark': '#000000',
    'main-light': '#0f0f0f',
    text: '#00ff41',
    'text-light': '#ffffff',
    'text-dark': '#008800',
    'text-disabled': '#404040',
    primary: '#00ff41',
    info: '#ffcc00',
    success: '#00ff41',
    error: '#ff3333',
    warn: '#ff6600',
    main: '#000000',
    'terminal:background': '#000000',
    'terminal:foreground': '#00ff41',
    'terminal:cursor': '#00ff41',
    'terminal:selectionBackground': '#0a2a0a',
    'terminal:cursorAccent': '#000000',
    'terminal:black': '#000000',
    'terminal:red': '#ff0040',
    'terminal:green': '#00ff41',
    'terminal:yellow': '#ffcc00',
    'terminal:blue': '#ffab4a',
    'terminal:magenta': '#ff00ff',
    'terminal:cyan': '#00ffff',
    'terminal:white': '#ffffff',
    'terminal:brightBlack': '#555555',
    'terminal:brightRed': '#ff4466',
    'terminal:brightGreen': '#44ff66',
    'terminal:brightYellow': '#ffdd44',
    'terminal:brightBlue': '#ffab4a',
    'terminal:brightMagenta': '#ff44ff',
    'terminal:brightCyan': '#44ffff',
    'terminal:brightWhite': '#ffffff'
  })
})

test("builds dicker's hackdio into the published outputs", () => {
  const generatedThemes = build()
  const theme = generatedThemes.find(item => {
    return item.startsWith("themeName=dicker's hackdio\n")
  })
  const distFolder = path.resolve(__dirname, '../dist')

  assert.ok(theme)
  assert.ok(require('../dist/index.js').some(item => item === theme))
  assert.equal(
    fs.readFileSync(path.resolve(distFolder, 'themes/dickers-hackdio.txt'), 'utf8'),
    theme
  )
})
