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
  },

  // converts an object to an array
  objectToArray: function objectToArray(object) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';

    var convertedArray = [];

    Object.keys(object).forEach(function (_key) {
      var item = object[_key];
      item[key] = _key;
      convertedArray.push(item);
    });

    return convertedArray;
  }

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbImFycmF5VG9PYmplY3QiLCJhcnJheU9mT2JqZWN0cyIsImtleSIsImNvbnZlcnRlZE9iamVjdCIsImZvckVhY2giLCJvYmplY3QiLCJvYmplY3RUb0FycmF5IiwiY29udmVydGVkQXJyYXkiLCJPYmplY3QiLCJrZXlzIiwiaXRlbSIsIl9rZXkiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFBZTtBQUNiO0FBQ0E7QUFDQUEsaUJBQWUsdUJBQUNDLGNBQUQsRUFBZ0M7QUFBQSxRQUFmQyxHQUFlLHVFQUFULElBQVM7O0FBQzdDLFFBQUlDLGtCQUFrQixFQUF0Qjs7QUFFREYsbUJBQWVHLE9BQWYsQ0FBdUIsa0JBQVU7QUFDaENELHNCQUFnQkUsT0FBT0gsR0FBUCxDQUFoQixJQUErQkcsTUFBL0I7QUFDQSxLQUZEOztBQUlBLFdBQU9GLGVBQVA7QUFDQSxHQVhZOztBQWFiO0FBQ0FHLGlCQUFlLHVCQUFDRCxNQUFELEVBQXdCO0FBQUEsUUFBZkgsR0FBZSx1RUFBVCxJQUFTOztBQUNyQyxRQUFJSyxpQkFBaUIsRUFBckI7O0FBRUFDLFdBQU9DLElBQVAsQ0FBWUosTUFBWixFQUFvQkQsT0FBcEIsQ0FBNEIsZ0JBQVE7QUFDbEMsVUFBSU0sT0FBUUwsT0FBT00sSUFBUCxDQUFaO0FBQ0FELFdBQUtSLEdBQUwsSUFBWVMsSUFBWjtBQUNBSixxQkFBZUssSUFBZixDQUFvQkYsSUFBcEI7QUFDRCxLQUpEOztBQU1BLFdBQU9ILGNBQVA7QUFDRDs7QUF4QlksQyIsImZpbGUiOiJoZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICAvLyBjb252ZXJ0cyBhbiBhcnJheSBvZiBvYmplY3RzIGludG8gYW4gb2JqZWN0LFxuICAvLyB3aGVyZSBlYWNoIG9iamVjdCdzIGtleSBpcyBpdHMgaWQgKGJ5IGRlZmF1bHQpXG4gIGFycmF5VG9PYmplY3Q6IChhcnJheU9mT2JqZWN0cywga2V5ID0gJ2lkJykgPT4ge1xuICAgIGxldCBjb252ZXJ0ZWRPYmplY3QgPSB7fVxuXG4gIFx0YXJyYXlPZk9iamVjdHMuZm9yRWFjaChvYmplY3QgPT4ge1xuICBcdFx0Y29udmVydGVkT2JqZWN0W29iamVjdFtrZXldXSA9IG9iamVjdFxuICBcdH0pXG5cbiAgXHRyZXR1cm4gY29udmVydGVkT2JqZWN0XG4gIH0sXG5cbiAgLy8gY29udmVydHMgYW4gb2JqZWN0IHRvIGFuIGFycmF5XG4gIG9iamVjdFRvQXJyYXk6IChvYmplY3QsIGtleSA9ICdpZCcpID0+IHtcbiAgICBsZXQgY29udmVydGVkQXJyYXkgPSBbXVxuXG4gICAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKF9rZXkgPT4ge1xuICAgICAgbGV0IGl0ZW0gID0gb2JqZWN0W19rZXldXG4gICAgICBpdGVtW2tleV0gPSBfa2V5XG4gICAgICBjb252ZXJ0ZWRBcnJheS5wdXNoKGl0ZW0pXG4gICAgfSlcblxuICAgIHJldHVybiBjb252ZXJ0ZWRBcnJheVxuICB9XG5cbn1cbiJdfQ==