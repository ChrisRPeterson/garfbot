const { parse } = require('node-html-parser')
const rp = require('request-promise-native')

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

async function getComic(comicName, firstComicDate) {
  const d = randomDate(firstComicDate, new Date())
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()

  const archive = `https://gocomics.com/${comicName}/`

  const url = archive + year + '/' + month + '/' + day

  const parsedPage = parse(
    await rp(url).catch((err) => {
      console.log('Request failed\n', err)
    })
  )

  let imageURL = parsedPage.querySelector('.item-comic-image img')

  if (imageURL === null) {
    console.log('No image found')
    return getComic(comicName, firstComicDate)
  }

  imageURL = imageURL.rawAttrs.split(/ src=/)[1].replace(/"/g, '')

  return imageURL
}

module.exports = { getComic }
