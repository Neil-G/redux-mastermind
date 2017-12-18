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
                return state[operation](location, updateFunction || (0, _immutable.fromJS)(value) || undefined);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWd1cmVSZWR1Y2Vycy5qcyJdLCJuYW1lcyI6WyJjcmVhdGVSZWR1Y2VyIiwiYnJhbmNoTmFtZSIsImRlZmF1bHRTdGF0ZSIsInN0YXRlIiwiYWN0aW9uIiwia2V5QXJyYXkiLCJ2YWx1ZSIsInVwZGF0ZUZ1bmN0aW9uIiwib3BlcmF0aW9uIiwibG9jYXRpb24iLCJ0eXBlIiwidW5kZWZpbmVkIiwicmVkdWNlcnNDb25maWciLCJjb25maWd1cmVkUmVkdWNlcnMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInJlZHVjZXJOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFFQTs7Ozs7OztBQU9BLFNBQVNBLGFBQVQsQ0FBd0JDLFVBQXhCLEVBQXVEO0FBQUEsUUFBbkJDLFlBQW1CLHVFQUFKLEVBQUk7O0FBQ25ELFdBQU8sWUFBMEM7QUFBQSxZQUF6Q0MsS0FBeUMsdUVBQWpDLHVCQUFPRCxZQUFQLENBQWlDO0FBQUEsWUFBWEUsTUFBVztBQUFBLFlBQ3JDQyxRQURxQyxHQUNvQkQsTUFEcEIsQ0FDckNDLFFBRHFDO0FBQUEsWUFDM0JDLEtBRDJCLEdBQ29CRixNQURwQixDQUMzQkUsS0FEMkI7QUFBQSxZQUNwQkMsY0FEb0IsR0FDb0JILE1BRHBCLENBQ3BCRyxjQURvQjtBQUFBLFlBQ0pDLFNBREksR0FDb0JKLE1BRHBCLENBQ0pJLFNBREk7QUFBQSxZQUNPQyxRQURQLEdBQ29CTCxNQURwQixDQUNPSyxRQURQOztBQUU3QyxnQkFBUUwsT0FBT00sSUFBZjtBQUNBLGlCQUFLVCxVQUFMO0FBQ0k7QUFDQSx1QkFBT0UsTUFBTUssU0FBTixFQUFrQkMsUUFBbEIsRUFBNEJGLGtCQUFrQix1QkFBT0QsS0FBUCxDQUFsQixJQUFtQ0ssU0FBL0QsQ0FBUDtBQUNKO0FBQ0ksdUJBQU9SLEtBQVA7QUFMSjtBQU9ILEtBVEQ7QUFVSDs7a0JBR2MsVUFBQ1MsY0FBRCxFQUF3Qjs7QUFFbkMsUUFBSUMscUJBQXFCLEVBQXpCOztBQUVBQyxXQUFPQyxJQUFQLENBQVlILGNBQVosRUFBNEJJLE9BQTVCLENBQW9DLFVBQUNDLFdBQUQsRUFBeUI7QUFDekQsWUFBTWYsZUFBZVUsZUFBZUssV0FBZixDQUFyQjtBQUNBSiwyQkFBbUJJLFdBQW5CLElBQWtDakIsY0FBY2lCLFdBQWQsRUFBMkJmLFlBQTNCLENBQWxDO0FBQ0gsS0FIRDs7QUFLQSxXQUFPVyxrQkFBUDtBQUNILEMiLCJmaWxlIjoiY29uZmlndXJlUmVkdWNlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG5pbXBvcnQgeyBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJlZHVjZXIgZnVuY3Rpb24vc3RvcmUgYnJhbmNoLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gYnJhbmNoTmFtZSAtIGJvdGggdGhlIG5hbWUgb2YgdGhlIGJyYW5jaCBhbmQgdGhlIGFjdGlvbi50eXBlIGZvciByZWxhdGVkIGFjdGlvbnNcbiAqIEBwYXJhbSB7YW55fSBkZWZhdWx0U3RhdGUgLSBkZWZhdWx0IHN0cnVjdHVyZSBhbmQgY29udGVudCBmb3IgdGhlIHN0YXRlIGJyYW5jaFxuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZVJlZHVjZXIgKGJyYW5jaE5hbWUsIGRlZmF1bHRTdGF0ZSA9IHt9KSB7XG4gICAgcmV0dXJuIChzdGF0ZSA9IGZyb21KUyhkZWZhdWx0U3RhdGUpLCBhY3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgeyBrZXlBcnJheSwgdmFsdWUsIHVwZGF0ZUZ1bmN0aW9uLCBvcGVyYXRpb24sIGxvY2F0aW9uIH0gPSBhY3Rpb25cbiAgICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIGJyYW5jaE5hbWU6XG4gICAgICAgICAgICAvLyBUT0RPIGFkZCBjb250cm9sIGZsb3cgdG8gaGFuZGxlIGltbXV0YWJsZSBtZXRob2RzXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVbb3BlcmF0aW9uXSggbG9jYXRpb24sIHVwZGF0ZUZ1bmN0aW9uIHx8IGZyb21KUyh2YWx1ZSkgfHwgdW5kZWZpbmVkIClcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IChyZWR1Y2Vyc0NvbmZpZzoge30pID0+IHtcblxuICAgIGxldCBjb25maWd1cmVkUmVkdWNlcnMgPSB7fVxuXG4gICAgT2JqZWN0LmtleXMocmVkdWNlcnNDb25maWcpLmZvckVhY2goKHJlZHVjZXJOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFN0YXRlID0gcmVkdWNlcnNDb25maWdbcmVkdWNlck5hbWVdXG4gICAgICAgIGNvbmZpZ3VyZWRSZWR1Y2Vyc1tyZWR1Y2VyTmFtZV0gPSBjcmVhdGVSZWR1Y2VyKHJlZHVjZXJOYW1lLCBkZWZhdWx0U3RhdGUpXG4gICAgfSlcblxuICAgIHJldHVybiBjb25maWd1cmVkUmVkdWNlcnNcbn1cbiJdfQ==