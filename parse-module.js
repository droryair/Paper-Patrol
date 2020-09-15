var docparser = require('docparser-node');

var client = new docparser.Client("8ede9301b2dce0bc655ce576b96bc7c8c965150f");
const parserId = 'njnxhzavldku'
const documentId = 'f2d0dd5fd4ea660efa366d5ea3bda54a'

client.getResultsByDocument(parserId, documentId, {format: 'object'})
  .then(function (result) {
    console.log(result)
  })
  .catch(function (err) {
    console.log(err)
  })
