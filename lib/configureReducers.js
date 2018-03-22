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