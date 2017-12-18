'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  // converts an array of objects into an object,
  // where each object's key is its id (by default)
  arrayToObject: function arrayToObject(arrayOfObjects) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';

    var convertedObject = {};

    arrayOfObjects.forEach(function (object) {
      convertedObject[object[key]] = object;
    });

    return convertedObject;
  }
};