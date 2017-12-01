export default ({ store, alertify, swal }) => {

	const _store = store
	const _alertify = alertify
	const _swal = swal

	return {

		// this will process an object full of actions
		processActionGroup: ({ instructionsName = undefined, store = _store, error = {}, res = {}, actionGroup = {}, alertify = _alertify, swal = _swal }) => {
			if (actionGroup == undefined) return

			const actionNames = Object.keys(actionGroup)

			actionNames.forEach((actionName) => {

				let action  = actionGroup[actionName]

				// destructure action values used in processing
				const { type, branch, valueFunction, value, shouldDispatch, delayDispatch, uiEventFunction } = action
				
				// update value 
				action.value = valueFunction ? valueFunction({ error, res, store, value, alertify, swal }) : value

				// add type
				action.type = type || branch

				// add name
				action.name = actionName

				if (instructionsName) { action.partOf = `${instructionsName}` }

				// dispatch action depending on fire
				if ( shouldDispatch == undefined || shouldDispatch({ error, res, store, value }) ) { 
					
					// actions can be dispatched later, ie in uiEventFunction
					// used for events that need confirmation 
					if (!delayDispatch) { store.dispatch(action) }

					// fire ui event
					if (uiEventFunction) uiEventFunction({ action, value, res, error, store, alertify, swal })
				}
			})
		},

		logInstructionsMetaData: ({ metaData = {} }) => {
			// need to make a bunch of helper functions to log things nicely
			console.log('%c TEST', 'color: tomato;')
		},

		handleError: ({ }) => {

		},
		logApiResponse: ({ }) => {

		}

	}
}
