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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbImFycmF5VG9PYmplY3QiLCJhcnJheU9mT2JqZWN0cyIsImtleSIsImNvbnZlcnRlZE9iamVjdCIsImZvckVhY2giLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUFlO0FBQ2I7QUFDQTtBQUNBQSxpQkFBZSx1QkFBQ0MsY0FBRCxFQUFnQztBQUFBLFFBQWZDLEdBQWUsdUVBQVQsSUFBUzs7QUFDN0MsUUFBSUMsa0JBQWtCLEVBQXRCOztBQUVERixtQkFBZUcsT0FBZixDQUF1QixrQkFBVTtBQUNoQ0Qsc0JBQWdCRSxPQUFPSCxHQUFQLENBQWhCLElBQStCRyxNQUEvQjtBQUNBLEtBRkQ7O0FBSUEsV0FBT0YsZUFBUDtBQUNBO0FBWFksQyIsImZpbGUiOiJoZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICAvLyBjb252ZXJ0cyBhbiBhcnJheSBvZiBvYmplY3RzIGludG8gYW4gb2JqZWN0LFxuICAvLyB3aGVyZSBlYWNoIG9iamVjdCdzIGtleSBpcyBpdHMgaWQgKGJ5IGRlZmF1bHQpXG4gIGFycmF5VG9PYmplY3Q6IChhcnJheU9mT2JqZWN0cywga2V5ID0gJ2lkJykgPT4ge1xuICAgIGxldCBjb252ZXJ0ZWRPYmplY3QgPSB7fVxuXG4gIFx0YXJyYXlPZk9iamVjdHMuZm9yRWFjaChvYmplY3QgPT4ge1xuICBcdFx0Y29udmVydGVkT2JqZWN0W29iamVjdFtrZXldXSA9IG9iamVjdFxuICBcdH0pXG5cbiAgXHRyZXR1cm4gY29udmVydGVkT2JqZWN0XG4gIH1cbn1cbiJdfQ==