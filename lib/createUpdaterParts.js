'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

exports.default = function (_ref) {
	var store = _ref.store,
	    alertify = _ref.alertify,
	    swal = _ref.swal;


	var _store = store;
	var _alertify = alertify;
	var _swal = swal;

	return {

		// this will process an object full of actions
		processActionGroup: function processActionGroup(_ref2) {
			var _ref2$instructionsNam = _ref2.instructionsName,
			    instructionsName = _ref2$instructionsNam === undefined ? undefined : _ref2$instructionsNam,
			    _ref2$store = _ref2.store,
			    store = _ref2$store === undefined ? _store : _ref2$store,
			    _ref2$error = _ref2.error,
			    error = _ref2$error === undefined ? {} : _ref2$error,
			    _ref2$res = _ref2.res,
			    res = _ref2$res === undefined ? {} : _ref2$res,
			    _ref2$actionGroup = _ref2.actionGroup,
			    actionGroup = _ref2$actionGroup === undefined ? {} : _ref2$actionGroup,
			    _ref2$alertify = _ref2.alertify,
			    alertify = _ref2$alertify === undefined ? _alertify : _ref2$alertify,
			    _ref2$swal = _ref2.swal,
			    swal = _ref2$swal === undefined ? _swal : _ref2$swal;

			if (actionGroup == undefined) return;

			var actionNames = Object.keys(actionGroup);

			actionNames.forEach(function (actionName) {

				var action = actionGroup[actionName];

				// destructure action values used in processing
				var type = action.type,
				    branch = action.branch,
				    valueFunction = action.valueFunction,
				    value = action.value,
				    shouldDispatch = action.shouldDispatch,
				    delayDispatch = action.delayDispatch,
				    uiEventFunction = action.uiEventFunction;

				// update value 

				action.value = valueFunction ? valueFunction({ error: error, res: res, store: store, value: value, alertify: alertify, swal: swal }) : value;

				// add type
				action.type = type || branch;

				// add name
				action.name = actionName;

				if (instructionsName) {
					action.partOf = '' + instructionsName;
				}

				// dispatch action depending on fire
				if (shouldDispatch == undefined || shouldDispatch({ error: error, res: res, store: store, value: value })) {

					// actions can be dispatched later, ie in uiEventFunction
					// used for events that need confirmation 
					if (!delayDispatch) {
						store.dispatch(action);
					}

					// fire ui event
					if (uiEventFunction) uiEventFunction({ action: action, value: value, res: res, error: error, store: store, alertify: alertify, swal: swal });
				}
			});
		},

		logInstructionsMetaData: function logInstructionsMetaData(_ref3) {
			var _ref3$metaData = _ref3.metaData,
			    metaData = _ref3$metaData === undefined ? {} : _ref3$metaData;

			// need to make a bunch of helper functions to log things nicely
			console.log('%c TEST', 'color: tomato;');
		},

		handleError: function handleError(_ref4) {
			_objectDestructuringEmpty(_ref4);
		},
		logApiResponse: function logApiResponse(_ref5) {
			_objectDestructuringEmpty(_ref5);
		}

	};
};