'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createUpdaterParts = require('./createUpdaterParts');

var _createUpdaterParts2 = _interopRequireDefault(_createUpdaterParts);

var _createUpdaters = require('./createUpdaters');

var _createUpdaters2 = _interopRequireDefault(_createUpdaters);

var _configureFirebase = require('./configureFirebase');

var _configureFirebase2 = _interopRequireDefault(_configureFirebase);

var _configureReducers = require('./configureReducers');

var _configureReducers2 = _interopRequireDefault(_configureReducers);

var _Docs = require('./Docs');

var _Docs2 = _interopRequireDefault(_Docs);

var _redux = require('redux');

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _defaultUpdateSchemaCreators = require('./defaultUpdateSchemaCreators');

var _defaultUpdateSchemaCreators2 = _interopRequireDefault(_defaultUpdateSchemaCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var genericStoreUpdate = _defaultUpdateSchemaCreators2.default.genericStoreUpdate,
    genericApiUpdate = _defaultUpdateSchemaCreators2.default.genericApiUpdate,
    firebaseSignInWithEmail = _defaultUpdateSchemaCreators2.default.firebaseSignInWithEmail,
    firebaseSignOut = _defaultUpdateSchemaCreators2.default.firebaseSignOut,
    genericFirestoreUpdate = _defaultUpdateSchemaCreators2.default.genericFirestoreUpdate;

// TODO, add reduxConfig as an option to validate branches
// TODO validate operations against locations

exports.default = function (_ref) {
	var _ref$options = _ref.options,
	    options = _ref$options === undefined ? {} : _ref$options,
	    _ref$initialStoreStat = _ref.initialStoreState,
	    initialStoreState = _ref$initialStoreStat === undefined ? {} : _ref$initialStoreStat,
	    _ref$updateSchemaCrea = _ref.updateSchemaCreators,
	    updateSchemaCreators = _ref$updateSchemaCrea === undefined ? {} : _ref$updateSchemaCrea,
	    firebaseConfig = _ref.firebaseConfig;


	/*** INITIALIZE AND CHECK ARGUMENTS ***/

	// initialize options
	options = options || {};

	// initialize initialStoreState
	initialStoreState.appState = Object.assign({}, { isFetching: {}, errors: {}, modals: {} }, initialStoreState.appState || {});
	initialStoreState.auth = Object.assign({}, { user: {} }, initialStoreState.auth || {});
	initialStoreState.data = initialStoreState.data || {};

	// check that updateSchemaCreator is an object, if not throw TypeError
	if (updateSchemaCreators && (typeof updateSchemaCreators === 'undefined' ? 'undefined' : _typeof(updateSchemaCreators)) != 'object') {
		throw new TypeError('updateSchemaCreators must be an object', 'createMastermind.js');
	} else {

		// initialize two very generic updateSchemaCreators upon creation of a mastermind

		// for generic sync updates
		updateSchemaCreators.genericStoreUpdate = genericStoreUpdate;

		// for generic async updates
		updateSchemaCreators.genericApiUpdate = genericApiUpdate;
	}

	/*** CREATE STORE ***/

	var store = void 0;
	if (options.test == true) {

		// for tests
		store = (0, _redux.createStore)((0, _redux.combineReducers)((0, _configureReducers2.default)(initialStoreState)));
	} else if (options.web || options.web == undefined) {

		// for web projects
		store = (0, _redux.createStore)((0, _redux.combineReducers)((0, _configureReducers2.default)(initialStoreState)), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), (0, _redux.applyMiddleware)(_reduxLogger2.default));
	} else {

		// for mobile
		store = (0, _redux.createStore)((0, _redux.combineReducers)((0, _configureReducers2.default)(initialStoreState)), (0, _redux.applyMiddleware)(_reduxLogger2.default));
	}

	/*** CONFIGURE FIREBASE ***/

	// configure and initialize firebase if there is a config object
	var firebase = void 0;
	if (firebaseConfig) {
		firebase = (0, _configureFirebase2.default)(firebaseConfig);
		updateSchemaCreators.firebaseSignInWithEmail = firebaseSignInWithEmail;
		updateSchemaCreators.firebaseSignOut = firebaseSignOut;
		updateSchemaCreators.genericFirestoreUpdate = genericFirestoreUpdate;
	}

	// create mastermind infrastructure
	var updaterParts = (0, _createUpdaterParts2.default)({ store: store });
	var updaters = (0, _createUpdaters2.default)({ updaterParts: updaterParts, firebase: firebase });

	return {

		store: store,

		getState: store.getState,

		update: function update(updateSchemaName, updateArgs) {

			// check that user provides required name field
			if (!updateSchemaName) {
				console.log('must specify an update name');
				return;
			}

			// check that updateSchemaCreator is an object, if not throw TypeError
			if (typeof updateSchemaName != 'string') {
				throw new TypeError('updateSchemaName must be a string', 'createMastermind.js');
			}

			// check that user provides valid name
			if (!updateSchemaCreators[updateSchemaName]) {
				console.log('must provide a valid name');
				// fuzzy search possible names and give suggestion along with list of valid instructions
				return;
			}

			// create update schema
			var updateSchema = updateSchemaCreators[updateSchemaName](updateArgs);
			var type = updateSchema.type;

			// check that user provides required type field

			if (!type) {
				console.log('every updateSchema must specify a type');
				return;
			}

			// check that user provides valid processor type
			if (!updaters[type]) {
				console.log('must provide a updater');
				// fuzzy search possible type and give suggestion alongwith list of valid instructions
				return;
			}

			// log information about update
			return updaters[type](updateSchema);
		},
		createDocs: function createDocs() {
			return (0, _Docs2.default)({ updateSchemasCreators: updateSchemasCreators, actionCreators: actionCreators });
		}

	};
};