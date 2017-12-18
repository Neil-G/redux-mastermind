export default {
  // converts an array of objects into an object,
  // where each object's key is its id (by default)
  arrayToObject: (arrayOfObjects, key = 'id') => {
    let convertedObject = {}

  	arrayOfObjects.forEach(object => {
  		convertedObject[object[key]] = object
  	})

  	return convertedObject
  }
}
