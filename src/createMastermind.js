import createUpdaterParts from './createUpdaterParts'
import createUpdaters from './createUpdaters'
import configureFirebase from './configureFirebase'
import configureReducers from './configureReducers'
import Docs from './Docs'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'
import defaultUpdateSchemaCreators from './defaultUpdateSchemaCreators'
const {
	genericStoreUpdate,
	genericApiUpdate,
	firebaseSignInWithEmail,
	firebaseSignOut,
	genericFirestoreUpdate
} = defaultUpdateSchemaCreators



// TODO, add reduxConfig as an option to validate branches
// TODO validate operations against locations
export default ({ options = {}, initialStoreState = {}, updateSchemaCreators = {}, firebaseConfig }) => {


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

		// for web projects
		store = createStore(
			combineReducers(configureReducers(initialStoreState)),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
			applyMiddleware(logger),
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

	return {

		store,

		getState: store.getState,

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
				console.log('must provide a valid name')
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
				// fuzzy search possible type and give suggestion alongwith list of valid instructions
				return
			}

			// log information about update
			return updaters[type](updateSchema)
		},
		createDocs: () => Docs({ updateSchemasCreators, actionCreators }),

	}
}
