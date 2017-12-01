import createUpdaterParts from './createUpdaterParts'
import createUpdaters from './createUpdaters'
import configureFirebase from './configureFirebase'
// import alertify from 'alertify.js'
// import swal from 'sweetalert';

// TODO, add reduxConfig as an option to validate branches
// TODO validate operations against locations
export default ({ store, updateSchemaCreators = {}, firebaseConfig }) => {

	// check that updateSchemaCreator is an object, if not throw TypeError
	if ( updateSchemaCreators && typeof updateSchemaCreators != 'object' ) {
		throw new TypeError('updateSchemaCreators must be an object', 'createMastermind.js', 11)
	}

	// initialize two very generic updateSchemaCreators upon creation of a mastermind

	// for generic sync updates
	updateSchemaCreators.genericStoreUpdate = ({ actions }) => ({
		type: 'store', actions
	})

	// for generic async updates
	updateSchemaCreators.genericApiUpdate = ({ 
		serviceOptions, 
		beforeActions, 
		successActions, 
		failureActions, 
		afterActions, 
	}) => ({
		type: 'api',
		serviceOptions, 
		beforeActions, 
		successActions, 
		failureActions, 
		afterActions,  
	})

	// configure and initialize firebase if there is a config object
	const firebase = firebaseConfig ? configureFirebase(firebaseConfig) : undefined

	// create mastermind infrastructure
	const updaterParts = createUpdaterParts({ store })
	const updaters = createUpdaters({ updaterParts, firebase })


	return (updateSchemaName, updateArgs) => {

		// check that user provides required name field
		if (!updateSchemaName) {
			console.log('must specify an update name') 
			return
		}

		// check that updateSchemaCreator is an object, if not throw TypeError
		if ( typeof updateSchemaName != 'string' ) {
			throw new TypeError('updateSchemaName must be a string', 'createMastermind.js', 49)
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
	}
}