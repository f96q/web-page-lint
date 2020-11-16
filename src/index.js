import fetch from 'node-fetch'
import { URL } from 'url'
import { JSDOM } from 'jsdom'
import { TextLintEngine } from 'textlint'
import { parseText as noteParseText } from './note/parseText.js'
import { parseText as qiitaParseText } from './qiita/parseText.js'

const PARSE_TEXT_FUNCTIONS = {
  'note.com': noteParseText,
  'qiita.com': qiitaParseText,
}

async function fetchText(url) {
  const response = await fetch(url)
  const html = await response.text()
  const document = (new JSDOM(html)).window.document
  const parseText = PARSE_TEXT_FUNCTIONS[url.hostname]

  if (parseText) {
    return parseText(document).textContent.trim()
  } else {
    throw `Unsuppored parseText ${url.hostname}`
  }
}

async function main(url) {
  const text = await fetchText(new URL(url))

  text.split("\n").forEach((line, i) => console.log(`${i + 1}: ${line}`))

  const textLintEngine = new TextLintEngine

  const results = await textLintEngine.executeOnText(text)

  if (textLintEngine.isErrorResults(results)) {
    const output = textLintEngine.formatResults(results)

    console.log(output)
  }
}

main(process.argv[2])
