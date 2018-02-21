'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _immutable = require('immutable');

exports.default = function (_ref) {
	var store = _ref.store;


	var _store = store;

	return {

		// this will process an object full of actions
		processActionGroup: function processActionGroup(_ref2) {
			var _ref2$updateSchemaNam = _ref2.updateSchemaName,
			    updateSchemaName = _ref2$updateSchemaNam === undefined ? undefined : _ref2$updateSchemaNam,
			    _ref2$store = _ref2.store,
			    store = _ref2$store === undefined ? _store : _ref2$store,
			    _ref2$error = _ref2.error,
			    error = _ref2$error === undefined ? {} : _ref2$error,
			    _ref2$res = _ref2.res,
			    res = _ref2$res === undefined ? {} : _ref2$res,
			    _ref2$actionGroup = _ref2.actionGroup,
			    actionGroup = _ref2$actionGroup === undefined ? {} : _ref2$actionGroup;

			if (actionGroup == undefined) return;

			var actionNames = Object.keys(actionGroup);

			actionNames.forEach(function (actionName) {

				var action = actionGroup[actionName];

				// TODO: check for required fields: branch, location, operation, value || valueFunction, location || locationFunction
				// updateIn, update + updateIn, update

				// destructure action values used in processing
				var valueFunction = action.valueFunction,
				    value = action.value,
				    shouldDispatch = action.shouldDispatch,
				    uiEventFunction = action.uiEventFunction,
				    updateFunction = action.updateFunction,
				    location = action.location,
				    locationFunction = action.locationFunction,
				    operation = action.operation;

				// create action to be processed

				var $action = {};

				// update value
				$action.value = valueFunction ? valueFunction({ error: error, res: res, store: store, value: value }) : value;

				// update location
				$action.location = locationFunction ? locationFunction({ error: error, res: res, store: store, value: value }) : location;

				// add type
				$action.type = action.location[0];

				// trim first value from location
				$action.location = action.location.slice(1);

				// add name
				$action.name = actionName;

				// add update function params
				$action.updateFunction = updateFunction ? updateFunction.bind(null, { res: res, error: error, store: store, fromJS: _immutable.fromJS, value: value }) : undefined;

				// add operation
				if ($action.updateFunction) {
					$action.operation = 'updateIn';
				} else if (!$action.value) {
					$action.operation = 'deleteIn';
				} else {
					$action.operation = 'setIn';
				}

				// TODO: add meta information about the updateSchemaCreator

				// dispatch action depending on fire
				if (shouldDispatch == undefined || shouldDispatch({ error: error, res: res, store: store, value: value })) {

					// dispatch the action here
					store.dispatch($action);

					// fire ui event
					if (uiEventFunction) uiEventFunction({ action: action, value: value, res: res, error: error, store: store });
				}
			});
		}
	};
};