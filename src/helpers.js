export default {
  // converts an array of objects into an object,
  // where each object's key is its id (by default)
  arrayToObject: (arrayOfObjects, key = 'id') => {
    let convertedObject = {}

  	arrayOfObjects.forEach(object => {
  		convertedObject[object[key]] = object
  	})

  	return convertedObject
  },

  // converts an object to an array
  objectToArray: (object, key = 'id') => {
    let convertedArray = []

    Object.keys(object).forEach(_key => {
      let item  = object[_key]
      item[key] = _key
      convertedArray.push(item)
    })

    return convertedArray
  }

}
