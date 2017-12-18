const helpers = require('./../lib/helpers').default


const arrayToObject = helpers.arrayToObject

const dataArray = [
  { id: 'id_1', name: 'Neil' },
  { id: 'id_2', name: 'Sam' },
]

module.exports = (t) => {

  const arrayTranformedToObject = arrayToObject(dataArray)
  t.deepEqual(
    arrayTranformedToObject,
    {
      id_1: { id: 'id_1', name: 'Neil' },
      id_2: { id: 'id_2', name: 'Sam' }
    },
    'arrayToObject helper function works with default options'
  )

  t.end()
}
