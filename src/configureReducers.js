// @flow

import { fromJS } from 'immutable'

/**
 * Represents a reducer function/store branch.
 * @constructor
 * @param {string} branchName - both the name of the branch and the action.type for related actions
 * @param {any} defaultState - default structure and content for the state branch
 */

function createReducer (branchName, defaultState = {}) {
    return (state = fromJS(defaultState), action) => {
        const { keyArray, value, updateFunction, operation, location } = action
        switch (action.type) {
        case branchName:
            // TODO add control flow to handle immutable methods
            return location.length > 0
              ? state[operation]( location, updateFunction || fromJS(value) || undefined )
              : fromJS(value)
        default:
            return state
        }
    }
}


export default (reducersConfig: {}) => {

    let configuredReducers = {}

    Object.keys(reducersConfig).forEach((reducerName: string) => {
        const defaultState = reducersConfig[reducerName]
        configuredReducers[reducerName] = createReducer(reducerName, defaultState)
    })

    return configuredReducers
}
