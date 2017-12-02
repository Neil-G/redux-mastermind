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

var _Docs = require('./Docs');

var _Docs2 = _interopRequireDefault(_Docs);

var _alertify = require('alertify.js');

var _alertify2 = _interopRequireDefault(_alertify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import swal from 'sweetalert';

// TODO, add reduxConfig as an option to validate branches
// TODO validate operations against locations
exports.default = function (_ref) {
	var store = _ref.store,
	    _ref$updateSchemaCrea = _ref.updateSchemaCreators,
	    updateSchemaCreators = _ref$updateSchemaCrea === undefined ? {} : _ref$updateSchemaCrea,
	    firebaseConfig = _ref.firebaseConfig;


	// check that updateSchemaCreator is an object, if not throw TypeError
	if (updateSchemaCreators && (typeof updateSchemaCreators === 'undefined' ? 'undefined' : _typeof(updateSchemaCreators)) != 'object') {
		throw new TypeError('updateSchemaCreators must be an object', 'createMastermind.js', 11);
	}

	// initialize two very generic updateSchemaCreators upon creation of a mastermind

	// for generic sync updates
	updateSchemaCreators.genericStoreUpdate = function (_ref2) {
		var actions = _ref2.actions;
		return {
			type: 'store', actions: actions
		};
	};

	// for generic async updates
	updateSchemaCreators.genericApiUpdate = function (_ref3) {
		var serviceOptions = _ref3.serviceOptions,
		    beforeActions = _ref3.beforeActions,
		    successActions = _ref3.successActions,
		    failureActions = _ref3.failureActions,
		    afterActions = _ref3.afterActions;
		return {
			type: 'api',
			serviceOptions: serviceOptions,
			beforeActions: beforeActions,
			successActions: successActions,
			failureActions: failureActions,
			afterActions: afterActions
		};
	};

	// configure and initialize firebase if there is a config object
	var firebase = firebaseConfig ? (0, _configureFirebase2.default)(firebaseConfig) : undefined;

	// create mastermind infrastructure
	var updaterParts = (0, _createUpdaterParts2.default)({ store: store, alertify: _alertify2.default });
	var updaters = (0, _createUpdaters2.default)({ updaterParts: updaterParts, firebase: firebase });

	return {

		update: function update(updateSchemaName, updateArgs) {

			// check that user provides required name field
			if (!updateSchemaName) {
				console.log('must specify an update name');
				return;
			}

			// check that updateSchemaCreator is an object, if not throw TypeError
			if (typeof updateSchemaName != 'string') {
				throw new TypeError('updateSchemaName must be a string', 'createMastermind.js', 49);
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