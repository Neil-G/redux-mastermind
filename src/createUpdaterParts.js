// @flow

type ActionType = {
	type: string,
	location: Array<string>,
	value: mixed,
	valueFunction: () => mixed,
	updateFunction: () => mixed,
	locationFunction: () => Array<string>,
	shouldDispatch: () => bool,
	uiEventFunction: () => void
}

import { fromJS } from 'immutable'

export default ({ store }) => {

	const _store = store

	return {

		// this will process an object full of actions
		processActionGroup: ({ updateSchemaName = undefined, store = _store, error = {}, res = {}, actionGroup = {} }) => {
			if (actionGroup == undefined) return

			const actionNames = Object.keys(actionGroup)

			actionNames.forEach((actionName) => {

				let action: ActionType  = actionGroup[actionName]

				// TODO: check for required fields: branch, location, operation, value || valueFunction, location || locationFunction
				// updateIn, update + updateIn, update

				// destructure action values used in processing
				const { valueFunction, value, shouldDispatch, uiEventFunction, updateFunction, location, locationFunction, operation } = action

				// create action to be processed
				let $action = {}

				// update value
				$action.value = valueFunction ? valueFunction({ error, res, store, value }) : value

				// update location
				$action.location = locationFunction ? locationFunction({ error, res, store, value }) : location

				// add type
				$action.type = action.location[0]

				// trim first value from location
				$action.location = action.location.slice(1)

				// add name
				$action.name = actionName

				// add update function params
				$action.updateFunction = updateFunction ? updateFunction.bind(null, { res, error, store, fromJS, value }) : undefined

				// add operation
				if (action.updateFunction) {
					$action.operation = 'updateIn'
				} else if (!action.value) {
					$action.operation = 'deleteIn'
				} else {
					$action.operation = 'setIn'
				}

				// TODO: add meta information about the updateSchemaCreator

				// dispatch action depending on fire
				if ( shouldDispatch == undefined || shouldDispatch({ error, res, store, value }) ) {

					// dispatch the action here
					 store.dispatch($action)

					// fire ui event
					if (uiEventFunction) uiEventFunction({ action, value, res, error, store, })
				}
			})
		},
	}
}
