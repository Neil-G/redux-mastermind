import createUpdaterParts from './createUpdaterParts'
import createUpdaters from './createUpdaters'
import configureFirebase from './configureFirebase'
import configureReducers from './configureReducers'
import Docs from './Docs'
import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import logger from 'redux-logger'
import defaultUpdateSchemaCreators from './defaultUpdateSchemaCreators'
import Promise from 'bluebird'
const uuidv1 = require('uuid/v1')
import { connect } from 'react-redux'

const {
	genericStoreUpdate,
	genericApiUpdate,
	firebaseSignInWithEmail,
	firebaseSignOut,
	genericFirestoreUpdate
} = defaultUpdateSchemaCreators



// TODO, add reduxConfig as an option to validate branches
// TODO validate operations against locations
export default ({ options = {}, initialStoreState = {}, updateSchemaCreators = {}, firebaseConfig, selectors= {} }) => {


	/*** INITIALIZE AND CHECK ARGUMENTS ***/

	// initialize options
	options = options || {}

	// initialize initialStoreState
	initialStoreState.appState = Object.assign({}, { isFetching: {}, errors: {}, modals: {} }, initialStoreState.appState || {})
	initialStoreState.auth = Object.assign({}, { user: {} }, initialStoreState.auth || {})
	initialStoreState.data = initialStoreState.data || {}

	// check that updateSchemaCreator is an object, if not throw TypeError
	if ( updateSchemaCreators && typeof updateSchemaCreators != 'object' ) {
		throw new TypeError('updateSchemaCreators must be an object', 'createMastermind.js')
	} else {

		// initialize two very generic updateSchemaCreators upon creation of a mastermind

		// for generic sync updates
		updateSchemaCreators.genericStoreUpdate = genericStoreUpdate

		// for generic async updates
		updateSchemaCreators.genericApiUpdate = genericApiUpdate
	}


	/*** CREATE STORE ***/

	let store
	if (options.test == true) {

		// for tests
		store = createStore(combineReducers(configureReducers(initialStoreState)))

	} else if (options.web || options.web == undefined) {
		const composeEnhancers =
		typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		  }) : compose;

		// for web projects
		store = createStore(
			combineReducers(configureReducers(initialStoreState)),
			composeEnhancers(applyMiddleware(logger)),
		)


	} else {

		// for mobile
		store = createStore(
			combineReducers(configureReducers(initialStoreState)),
			applyMiddleware(logger),
		)

	}


	/*** CONFIGURE FIREBASE ***/

	// configure and initialize firebase if there is a config object
	let firebase
	if (firebaseConfig) {
		firebase = configureFirebase(firebaseConfig)
		updateSchemaCreators.firebaseSignInWithEmail = firebaseSignInWithEmail
		updateSchemaCreators.firebaseSignOut = firebaseSignOut
		updateSchemaCreators.genericFirestoreUpdate = genericFirestoreUpdate
	}

	// create mastermind infrastructure
	const updaterParts = createUpdaterParts({ store })
	const updaters = createUpdaters({ updaterParts, firebase })

	let listeningComponents = []

	return {

		update: (updateSchemaName, updateArgs) => {

			// check that user provides required name field
			if (!updateSchemaName) {
				console.log('must specify an update name')
				return
			}

			// check that updateSchemaCreator is an object, if not throw TypeError
			if ( typeof updateSchemaName != 'string' ) {
				throw new TypeError('updateSchemaName must be a string', 'createMastermind.js')
			}


			// check that user provides valid name
			if (!updateSchemaCreators[updateSchemaName]) {
				console.log('must provide a valid updateSchemaName')
				console.log('valid updateSchemaNames: ', Object.keys(updateSchemaCreators).sort() )
				// fuzzy search possible names and give suggestion along with list of valid instructions
				return
			}

			// create update schema
			const updateSchema = updateSchemaCreators[updateSchemaName](updateArgs)
			const { type } = updateSchema

			// check that user provides required type field
			if (!type) {
				console.log('every updateSchema must specify a type')
				return
			}


			// check that user provides valid processor type
			if (!updaters[type]) {
				console.log('must provide a updater')
				console.log('valid updaters: ', Object.keys(updaters).sort())
				// fuzzy search possible type and give suggestion alongwith list of valid instructions
				return
			}

			const actionGroupKeys = [ 'actions', 'beforeActions', 'successActions', 'failureActions', 'afterActions', 'onChangeActions' ]

			// log information about update
			// return new updaters[type](updateSchema)
			return new Promise ((resolve, reject) => {
				resolve(updaters[type](updateSchema))
			}).then((res) => {

				// // collect all locations affected to compare against what listeningComponents' locations
				// let locationsAffected = new Set()
        //
				// Object.keys(updateSchema).forEach((key) => {
        //
				// 	// get actionGroups from updateSchema
				// 	if (actionGroupKeys.includes(key)) {
				// 		const actionGroup = updateSchema[key] || {}
        //
				// 		// get actions from the actionGroups
				// 		Object.keys(actionGroup).forEach((actionName) => {
        //
				// 			const action = actionGroup[actionName]
        //
				// 			locationsAffected.add([action.type, ...action.location])
				// 		})
				// 	}
				// })
        //
				// const locationsAffectedArray = [...locationsAffected]
        //
				// // update listeningComponents
				// listeningComponents.forEach(component => {
				// 	locationsAffectedArray.forEach(locationAffected => {
        //
				// 		// compare arrays of same length, trim the longer array
				// 		const maxLocationLength = Math.min(component.location.length, locationAffected.length)
				// 		const componentLocationForComparison = component.location.slice(0, maxLocationLength)
				// 		const affectedLocationForComparison = locationAffected.slice(0, maxLocationLength)
        //
				// 		// compare the comparison locations
				// 		const locationsMatch = JSON.stringify(componentLocationForComparison) == JSON.stringify(affectedLocationForComparison)
				// 		if ( locationsMatch ) { component.component.forceUpdate() }
        //
				// 	})
				// })
				return res
			})
		},

		// TODO: finish this
		createDocs: () => Docs({ updateSchemasCreators, actionCreators }),

		addToFeed: (component, location = []) => {
			listeningComponents.push({ id: uuidv1(), component, location })
		},

		removeFromFeed: (id) => {
			listeningComponents = listeningComponents.filter( component => component.id != id )
		},

		createId: uuidv1,

		store,

		getState: store.getState,

		branch: (branchName: string) => {
			// add check and logging for valid branch name
			return store.getState()[branchName]
				? store.getState()[branchName].toJS()
				: undefined
		},

		// creates a mapStateToProps function for connected components
		// takes an array of strings
		connectStore: (component, key: Array<string>, shouldReturnAFunction = false) => {

			// function that maps store state to component props
			const mapStateToProps = state => {

				// initialize return object
				let mappedState = {}

				// populate return object
				branches.forEach(key => {

					// add selector connection
					if (key.split(':').length === 2 && selectors[key.split(':')[1]]) {
						mappedState[key.split(':')[0]] = selectors[key.split(':')[1]](state)

					// add branch connection
					} else if (state[key]) {
						mappedState[key] = state[key].toJS()
					}

				})

				return shouldReturnAFunction ? (state,props) => mappedState : mappedState
			}
			return connect(mapStateToProps)(component)
		}
	}
}
