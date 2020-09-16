const docparser = require('docparser-node')

const Module = function (filePath) {

    const client = new docparser.Client("8ede9301b2dce0bc655ce576b96bc7c8c965150f")
    const parserId = 'njnxhzavldku'
    let documentId = ''
    const fullDisclosure = {}
    console.log(filePath)
    client.uploadFileByPath(parserId, filePath, { remote_id: 'test' })
      .then(function (result) {
        documentId = result.id
      })
      .catch(function (err) {
        console.log(err)
      })

    client.getResultsByDocument(parserId, documentId, { format: 'object' })
      .then(function (result) {
        fullDisclosure.yield = result[0].yield
        fullDisclosure.dangerLvl = result[0].dangerLvl
        fullDisclosure.monthFee = result[0].monthFee
        fullDisclosure.savesFee = result[0].savesFee
      })
      .catch(function (err) {
        console.log(err)
      })

    console.log("fullDisclosure",fullDisclosure)
    return fullDisclosure
  }
module.exports.Module = Module