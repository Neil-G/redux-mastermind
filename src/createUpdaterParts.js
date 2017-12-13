// @flow

import { fromJS } from 'immutable'

export default ({ store, alertify, swal }) => {

	const _store = store

	return {

		// this will process an object full of actions
		processActionGroup: ({ updateSchemaName = undefined, store = _store, error = {}, res = {}, actionGroup = {}, }) => {
			if (actionGroup == undefined) return

			const actionNames = Object.keys(actionGroup)

			actionNames.forEach((actionName) => {

				let action  = actionGroup[actionName]

				// TODO: check for required fields: branch, location, operation, value || valueFunction, location || locationFunction
				// updateIn, update + updateIn, update

				// destructure action values used in processing
				const { type, branch, valueFunction, value, shouldDispatch, delayDispatch, uiEventFunction, updateFunction, location, locationFunction } = action

				// update value
				action.value = valueFunction ? valueFunction({ error, res, store, value }) : value

				// update location
				action.location = locationFunction ? locationFunction({ error, res, store, value }) : location

				// add type
				action.type = action.location[0]

				// trim first value from location
				action.location.splice(0,1)

				// add name
				action.name = actionName

				// add update function params
				action.updateFunction = updateFunction ? updateFunction.bind(null, { res, error, store, fromJS, value }) : undefined


				// TODO: add meta information about the updateSchemaCreator

				// dispatch action depending on fire
				if ( shouldDispatch == undefined || shouldDispatch({ error, res, store, value }) ) {

					// actions can be dispatched later, ie in uiEventFunction
					// used for events that need confirmation
					if (!delayDispatch) { store.dispatch(action) }

					// fire ui event
					if (uiEventFunction) uiEventFunction({ action, value, res, error, store, })
				}
			})
		},
	}
}
