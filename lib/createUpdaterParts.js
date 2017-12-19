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
				    locationFunction = action.locationFunction;

				// update value

				action.value = valueFunction ? valueFunction({ error: error, res: res, store: store, value: value }) : value;

				// update location
				action.location = locationFunction ? locationFunction({ error: error, res: res, store: store, value: value }) : location;

				// add type
				action.type = action.location[0];

				// trim first value from location
				action.location.splice(0, 1);

				// add name
				action.name = actionName;

				// add update function params
				action.updateFunction = updateFunction ? updateFunction.bind(null, { res: res, error: error, store: store, fromJS: _immutable.fromJS, value: value }) : undefined;

				// TODO: add meta information about the updateSchemaCreator

				// dispatch action depending on fire
				if (shouldDispatch == undefined || shouldDispatch({ error: error, res: res, store: store, value: value })) {

					// dispatch the action here
					store.dispatch(action);

					// fire ui event
					if (uiEventFunction) uiEventFunction({ action: action, value: value, res: res, error: error, store: store });
				}
			});
		}
	};
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVVcGRhdGVyUGFydHMuanMiXSwibmFtZXMiOlsic3RvcmUiLCJfc3RvcmUiLCJwcm9jZXNzQWN0aW9uR3JvdXAiLCJ1cGRhdGVTY2hlbWFOYW1lIiwidW5kZWZpbmVkIiwiZXJyb3IiLCJyZXMiLCJhY3Rpb25Hcm91cCIsImFjdGlvbk5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJhY3Rpb25OYW1lIiwiYWN0aW9uIiwidmFsdWVGdW5jdGlvbiIsInZhbHVlIiwic2hvdWxkRGlzcGF0Y2giLCJ1aUV2ZW50RnVuY3Rpb24iLCJ1cGRhdGVGdW5jdGlvbiIsImxvY2F0aW9uIiwibG9jYXRpb25GdW5jdGlvbiIsInR5cGUiLCJzcGxpY2UiLCJuYW1lIiwiYmluZCIsImZyb21KUyIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFhQTs7a0JBRWUsZ0JBQWU7QUFBQSxLQUFaQSxLQUFZLFFBQVpBLEtBQVk7OztBQUU3QixLQUFNQyxTQUFTRCxLQUFmOztBQUVBLFFBQU87O0FBRU47QUFDQUUsc0JBQW9CLG1DQUE4RjtBQUFBLHFDQUEzRkMsZ0JBQTJGO0FBQUEsT0FBM0ZBLGdCQUEyRix5Q0FBeEVDLFNBQXdFO0FBQUEsMkJBQTdESixLQUE2RDtBQUFBLE9BQTdEQSxLQUE2RCwrQkFBckRDLE1BQXFEO0FBQUEsMkJBQTdDSSxLQUE2QztBQUFBLE9BQTdDQSxLQUE2QywrQkFBckMsRUFBcUM7QUFBQSx5QkFBakNDLEdBQWlDO0FBQUEsT0FBakNBLEdBQWlDLDZCQUEzQixFQUEyQjtBQUFBLGlDQUF2QkMsV0FBdUI7QUFBQSxPQUF2QkEsV0FBdUIscUNBQVQsRUFBUzs7QUFDakgsT0FBSUEsZUFBZUgsU0FBbkIsRUFBOEI7O0FBRTlCLE9BQU1JLGNBQWNDLE9BQU9DLElBQVAsQ0FBWUgsV0FBWixDQUFwQjs7QUFFQUMsZUFBWUcsT0FBWixDQUFvQixVQUFDQyxVQUFELEVBQWdCOztBQUVuQyxRQUFJQyxTQUFzQk4sWUFBWUssVUFBWixDQUExQjs7QUFFQTtBQUNBOztBQUVBO0FBUG1DLFFBUTNCRSxhQVIyQixHQVEyRUQsTUFSM0UsQ0FRM0JDLGFBUjJCO0FBQUEsUUFRWkMsS0FSWSxHQVEyRUYsTUFSM0UsQ0FRWkUsS0FSWTtBQUFBLFFBUUxDLGNBUkssR0FRMkVILE1BUjNFLENBUUxHLGNBUks7QUFBQSxRQVFXQyxlQVJYLEdBUTJFSixNQVIzRSxDQVFXSSxlQVJYO0FBQUEsUUFRNEJDLGNBUjVCLEdBUTJFTCxNQVIzRSxDQVE0QkssY0FSNUI7QUFBQSxRQVE0Q0MsUUFSNUMsR0FRMkVOLE1BUjNFLENBUTRDTSxRQVI1QztBQUFBLFFBUXNEQyxnQkFSdEQsR0FRMkVQLE1BUjNFLENBUXNETyxnQkFSdEQ7O0FBVW5DOztBQUNBUCxXQUFPRSxLQUFQLEdBQWVELGdCQUFnQkEsY0FBYyxFQUFFVCxZQUFGLEVBQVNDLFFBQVQsRUFBY04sWUFBZCxFQUFxQmUsWUFBckIsRUFBZCxDQUFoQixHQUE4REEsS0FBN0U7O0FBRUE7QUFDQUYsV0FBT00sUUFBUCxHQUFrQkMsbUJBQW1CQSxpQkFBaUIsRUFBRWYsWUFBRixFQUFTQyxRQUFULEVBQWNOLFlBQWQsRUFBcUJlLFlBQXJCLEVBQWpCLENBQW5CLEdBQW9FSSxRQUF0Rjs7QUFFQTtBQUNBTixXQUFPUSxJQUFQLEdBQWNSLE9BQU9NLFFBQVAsQ0FBZ0IsQ0FBaEIsQ0FBZDs7QUFFQTtBQUNBTixXQUFPTSxRQUFQLENBQWdCRyxNQUFoQixDQUF1QixDQUF2QixFQUF5QixDQUF6Qjs7QUFFQTtBQUNBVCxXQUFPVSxJQUFQLEdBQWNYLFVBQWQ7O0FBRUE7QUFDQUMsV0FBT0ssY0FBUCxHQUF3QkEsaUJBQWlCQSxlQUFlTSxJQUFmLENBQW9CLElBQXBCLEVBQTBCLEVBQUVsQixRQUFGLEVBQU9ELFlBQVAsRUFBY0wsWUFBZCxFQUFxQnlCLHlCQUFyQixFQUE2QlYsWUFBN0IsRUFBMUIsQ0FBakIsR0FBbUZYLFNBQTNHOztBQUdBOztBQUVBO0FBQ0EsUUFBS1ksa0JBQWtCWixTQUFsQixJQUErQlksZUFBZSxFQUFFWCxZQUFGLEVBQVNDLFFBQVQsRUFBY04sWUFBZCxFQUFxQmUsWUFBckIsRUFBZixDQUFwQyxFQUFtRjs7QUFFbEY7QUFDQ2YsV0FBTTBCLFFBQU4sQ0FBZWIsTUFBZjs7QUFFRDtBQUNBLFNBQUlJLGVBQUosRUFBcUJBLGdCQUFnQixFQUFFSixjQUFGLEVBQVVFLFlBQVYsRUFBaUJULFFBQWpCLEVBQXNCRCxZQUF0QixFQUE2QkwsWUFBN0IsRUFBaEI7QUFDckI7QUFDRCxJQXhDRDtBQXlDQTtBQWpESyxFQUFQO0FBbURBLEMiLCJmaWxlIjoiY3JlYXRlVXBkYXRlclBhcnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxudHlwZSBBY3Rpb25UeXBlID0ge1xuXHR0eXBlOiBzdHJpbmcsXG5cdGxvY2F0aW9uOiBBcnJheTxzdHJpbmc+LFxuXHR2YWx1ZTogbWl4ZWQsXG5cdHZhbHVlRnVuY3Rpb246ICgpID0+IG1peGVkLFxuXHR1cGRhdGVGdW5jdGlvbjogKCkgPT4gbWl4ZWQsXG5cdGxvY2F0aW9uRnVuY3Rpb246ICgpID0+IEFycmF5PHN0cmluZz4sXG5cdHNob3VsZERpc3BhdGNoOiAoKSA9PiBib29sLFxuXHR1aUV2ZW50RnVuY3Rpb246ICgpID0+IHZvaWRcbn1cblxuaW1wb3J0IHsgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJ1xuXG5leHBvcnQgZGVmYXVsdCAoeyBzdG9yZSB9KSA9PiB7XG5cblx0Y29uc3QgX3N0b3JlID0gc3RvcmVcblxuXHRyZXR1cm4ge1xuXG5cdFx0Ly8gdGhpcyB3aWxsIHByb2Nlc3MgYW4gb2JqZWN0IGZ1bGwgb2YgYWN0aW9uc1xuXHRcdHByb2Nlc3NBY3Rpb25Hcm91cDogKHsgdXBkYXRlU2NoZW1hTmFtZSA9IHVuZGVmaW5lZCwgc3RvcmUgPSBfc3RvcmUsIGVycm9yID0ge30sIHJlcyA9IHt9LCBhY3Rpb25Hcm91cCA9IHt9IH0pID0+IHtcblx0XHRcdGlmIChhY3Rpb25Hcm91cCA9PSB1bmRlZmluZWQpIHJldHVyblxuXG5cdFx0XHRjb25zdCBhY3Rpb25OYW1lcyA9IE9iamVjdC5rZXlzKGFjdGlvbkdyb3VwKVxuXG5cdFx0XHRhY3Rpb25OYW1lcy5mb3JFYWNoKChhY3Rpb25OYW1lKSA9PiB7XG5cblx0XHRcdFx0bGV0IGFjdGlvbjogQWN0aW9uVHlwZSAgPSBhY3Rpb25Hcm91cFthY3Rpb25OYW1lXVxuXG5cdFx0XHRcdC8vIFRPRE86IGNoZWNrIGZvciByZXF1aXJlZCBmaWVsZHM6IGJyYW5jaCwgbG9jYXRpb24sIG9wZXJhdGlvbiwgdmFsdWUgfHwgdmFsdWVGdW5jdGlvbiwgbG9jYXRpb24gfHwgbG9jYXRpb25GdW5jdGlvblxuXHRcdFx0XHQvLyB1cGRhdGVJbiwgdXBkYXRlICsgdXBkYXRlSW4sIHVwZGF0ZVxuXG5cdFx0XHRcdC8vIGRlc3RydWN0dXJlIGFjdGlvbiB2YWx1ZXMgdXNlZCBpbiBwcm9jZXNzaW5nXG5cdFx0XHRcdGNvbnN0IHsgdmFsdWVGdW5jdGlvbiwgdmFsdWUsIHNob3VsZERpc3BhdGNoLCB1aUV2ZW50RnVuY3Rpb24sIHVwZGF0ZUZ1bmN0aW9uLCBsb2NhdGlvbiwgbG9jYXRpb25GdW5jdGlvbiB9ID0gYWN0aW9uXG5cblx0XHRcdFx0Ly8gdXBkYXRlIHZhbHVlXG5cdFx0XHRcdGFjdGlvbi52YWx1ZSA9IHZhbHVlRnVuY3Rpb24gPyB2YWx1ZUZ1bmN0aW9uKHsgZXJyb3IsIHJlcywgc3RvcmUsIHZhbHVlIH0pIDogdmFsdWVcblxuXHRcdFx0XHQvLyB1cGRhdGUgbG9jYXRpb25cblx0XHRcdFx0YWN0aW9uLmxvY2F0aW9uID0gbG9jYXRpb25GdW5jdGlvbiA/IGxvY2F0aW9uRnVuY3Rpb24oeyBlcnJvciwgcmVzLCBzdG9yZSwgdmFsdWUgfSkgOiBsb2NhdGlvblxuXG5cdFx0XHRcdC8vIGFkZCB0eXBlXG5cdFx0XHRcdGFjdGlvbi50eXBlID0gYWN0aW9uLmxvY2F0aW9uWzBdXG5cblx0XHRcdFx0Ly8gdHJpbSBmaXJzdCB2YWx1ZSBmcm9tIGxvY2F0aW9uXG5cdFx0XHRcdGFjdGlvbi5sb2NhdGlvbi5zcGxpY2UoMCwxKVxuXG5cdFx0XHRcdC8vIGFkZCBuYW1lXG5cdFx0XHRcdGFjdGlvbi5uYW1lID0gYWN0aW9uTmFtZVxuXG5cdFx0XHRcdC8vIGFkZCB1cGRhdGUgZnVuY3Rpb24gcGFyYW1zXG5cdFx0XHRcdGFjdGlvbi51cGRhdGVGdW5jdGlvbiA9IHVwZGF0ZUZ1bmN0aW9uID8gdXBkYXRlRnVuY3Rpb24uYmluZChudWxsLCB7IHJlcywgZXJyb3IsIHN0b3JlLCBmcm9tSlMsIHZhbHVlIH0pIDogdW5kZWZpbmVkXG5cblxuXHRcdFx0XHQvLyBUT0RPOiBhZGQgbWV0YSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgdXBkYXRlU2NoZW1hQ3JlYXRvclxuXG5cdFx0XHRcdC8vIGRpc3BhdGNoIGFjdGlvbiBkZXBlbmRpbmcgb24gZmlyZVxuXHRcdFx0XHRpZiAoIHNob3VsZERpc3BhdGNoID09IHVuZGVmaW5lZCB8fCBzaG91bGREaXNwYXRjaCh7IGVycm9yLCByZXMsIHN0b3JlLCB2YWx1ZSB9KSApIHtcblxuXHRcdFx0XHRcdC8vIGRpc3BhdGNoIHRoZSBhY3Rpb24gaGVyZVxuXHRcdFx0XHRcdCBzdG9yZS5kaXNwYXRjaChhY3Rpb24pXG5cblx0XHRcdFx0XHQvLyBmaXJlIHVpIGV2ZW50XG5cdFx0XHRcdFx0aWYgKHVpRXZlbnRGdW5jdGlvbikgdWlFdmVudEZ1bmN0aW9uKHsgYWN0aW9uLCB2YWx1ZSwgcmVzLCBlcnJvciwgc3RvcmUsIH0pXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fSxcblx0fVxufVxuIl19