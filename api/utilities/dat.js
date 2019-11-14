const { DatArchive } = require('dat-sdk/auto')

const setup = async url => {
  try {
    archive = await DatArchive.load()
    await archive.writeFile('/demo.json', JSON.stringify({ title: 'Setup' }))
  } catch (error) {
    archive = await DatArchive.create({
      title: 'Demo'
    })
    await archive.writeFile('/demo.json', JSON.stringify({ title: 'Setup' }))
  }
  return await archive
}

module.exports = {
  setup
}
