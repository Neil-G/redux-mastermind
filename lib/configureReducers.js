'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

/**
 * Represents a reducer function/store branch.
 * @constructor
 * @param {string} branchName - both the name of the branch and the action.type for related actions
 * @param {any} defaultState - default structure and content for the state branch
 */

function createReducer(branchName) {
    var defaultState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.fromJS)(defaultState);
        var action = arguments[1];
        var keyArray = action.keyArray,
            value = action.value,
            updateFunction = action.updateFunction,
            operation = action.operation,
            location = action.location;

        switch (action.type) {
            case branchName:
                // TODO add control flow to handle immutable methods
                return location.length > 0 ? state[operation](location, updateFunction || (0, _immutable.fromJS)(value) || undefined) : (0, _immutable.fromJS)(value);
            default:
                return state;
        }
    };
}

exports.default = function (reducersConfig) {

    var configuredReducers = {};

    Object.keys(reducersConfig).forEach(function (reducerName) {
        var defaultState = reducersConfig[reducerName];
        configuredReducers[reducerName] = createReducer(reducerName, defaultState);
    });

    return configuredReducers;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWd1cmVSZWR1Y2Vycy5qcyJdLCJuYW1lcyI6WyJjcmVhdGVSZWR1Y2VyIiwiYnJhbmNoTmFtZSIsImRlZmF1bHRTdGF0ZSIsInN0YXRlIiwiYWN0aW9uIiwia2V5QXJyYXkiLCJ2YWx1ZSIsInVwZGF0ZUZ1bmN0aW9uIiwib3BlcmF0aW9uIiwibG9jYXRpb24iLCJ0eXBlIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwicmVkdWNlcnNDb25maWciLCJjb25maWd1cmVkUmVkdWNlcnMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInJlZHVjZXJOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFFQTs7Ozs7OztBQU9BLFNBQVNBLGFBQVQsQ0FBd0JDLFVBQXhCLEVBQXVEO0FBQUEsUUFBbkJDLFlBQW1CLHVFQUFKLEVBQUk7O0FBQ25ELFdBQU8sWUFBMEM7QUFBQSxZQUF6Q0MsS0FBeUMsdUVBQWpDLHVCQUFPRCxZQUFQLENBQWlDO0FBQUEsWUFBWEUsTUFBVztBQUFBLFlBQ3JDQyxRQURxQyxHQUNvQkQsTUFEcEIsQ0FDckNDLFFBRHFDO0FBQUEsWUFDM0JDLEtBRDJCLEdBQ29CRixNQURwQixDQUMzQkUsS0FEMkI7QUFBQSxZQUNwQkMsY0FEb0IsR0FDb0JILE1BRHBCLENBQ3BCRyxjQURvQjtBQUFBLFlBQ0pDLFNBREksR0FDb0JKLE1BRHBCLENBQ0pJLFNBREk7QUFBQSxZQUNPQyxRQURQLEdBQ29CTCxNQURwQixDQUNPSyxRQURQOztBQUU3QyxnQkFBUUwsT0FBT00sSUFBZjtBQUNBLGlCQUFLVCxVQUFMO0FBQ0k7QUFDQSx1QkFBT1EsU0FBU0UsTUFBVCxHQUFrQixDQUFsQixHQUNIUixNQUFNSyxTQUFOLEVBQWtCQyxRQUFsQixFQUE0QkYsa0JBQWtCLHVCQUFPRCxLQUFQLENBQWxCLElBQW1DTSxTQUEvRCxDQURHLEdBRUgsdUJBQU9OLEtBQVAsQ0FGSjtBQUdKO0FBQ0ksdUJBQU9ILEtBQVA7QUFQSjtBQVNILEtBWEQ7QUFZSDs7a0JBR2MsVUFBQ1UsY0FBRCxFQUF3Qjs7QUFFbkMsUUFBSUMscUJBQXFCLEVBQXpCOztBQUVBQyxXQUFPQyxJQUFQLENBQVlILGNBQVosRUFBNEJJLE9BQTVCLENBQW9DLFVBQUNDLFdBQUQsRUFBeUI7QUFDekQsWUFBTWhCLGVBQWVXLGVBQWVLLFdBQWYsQ0FBckI7QUFDQUosMkJBQW1CSSxXQUFuQixJQUFrQ2xCLGNBQWNrQixXQUFkLEVBQTJCaEIsWUFBM0IsQ0FBbEM7QUFDSCxLQUhEOztBQUtBLFdBQU9ZLGtCQUFQO0FBQ0gsQyIsImZpbGUiOiJjb25maWd1cmVSZWR1Y2Vycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbmltcG9ydCB7IGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSdcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcmVkdWNlciBmdW5jdGlvbi9zdG9yZSBicmFuY2guXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBicmFuY2hOYW1lIC0gYm90aCB0aGUgbmFtZSBvZiB0aGUgYnJhbmNoIGFuZCB0aGUgYWN0aW9uLnR5cGUgZm9yIHJlbGF0ZWQgYWN0aW9uc1xuICogQHBhcmFtIHthbnl9IGRlZmF1bHRTdGF0ZSAtIGRlZmF1bHQgc3RydWN0dXJlIGFuZCBjb250ZW50IGZvciB0aGUgc3RhdGUgYnJhbmNoXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlUmVkdWNlciAoYnJhbmNoTmFtZSwgZGVmYXVsdFN0YXRlID0ge30pIHtcbiAgICByZXR1cm4gKHN0YXRlID0gZnJvbUpTKGRlZmF1bHRTdGF0ZSksIGFjdGlvbikgPT4ge1xuICAgICAgICBjb25zdCB7IGtleUFycmF5LCB2YWx1ZSwgdXBkYXRlRnVuY3Rpb24sIG9wZXJhdGlvbiwgbG9jYXRpb24gfSA9IGFjdGlvblxuICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgYnJhbmNoTmFtZTpcbiAgICAgICAgICAgIC8vIFRPRE8gYWRkIGNvbnRyb2wgZmxvdyB0byBoYW5kbGUgaW1tdXRhYmxlIG1ldGhvZHNcbiAgICAgICAgICAgIHJldHVybiBsb2NhdGlvbi5sZW5ndGggPiAwXG4gICAgICAgICAgICAgID8gc3RhdGVbb3BlcmF0aW9uXSggbG9jYXRpb24sIHVwZGF0ZUZ1bmN0aW9uIHx8IGZyb21KUyh2YWx1ZSkgfHwgdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgOiBmcm9tSlModmFsdWUpXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCAocmVkdWNlcnNDb25maWc6IHt9KSA9PiB7XG5cbiAgICBsZXQgY29uZmlndXJlZFJlZHVjZXJzID0ge31cblxuICAgIE9iamVjdC5rZXlzKHJlZHVjZXJzQ29uZmlnKS5mb3JFYWNoKChyZWR1Y2VyTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRTdGF0ZSA9IHJlZHVjZXJzQ29uZmlnW3JlZHVjZXJOYW1lXVxuICAgICAgICBjb25maWd1cmVkUmVkdWNlcnNbcmVkdWNlck5hbWVdID0gY3JlYXRlUmVkdWNlcihyZWR1Y2VyTmFtZSwgZGVmYXVsdFN0YXRlKVxuICAgIH0pXG5cbiAgICByZXR1cm4gY29uZmlndXJlZFJlZHVjZXJzXG59XG4iXX0=