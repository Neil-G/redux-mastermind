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

				// add operation if not present

				action.operation = operation || 'setIn';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVVcGRhdGVyUGFydHMuanMiXSwibmFtZXMiOlsic3RvcmUiLCJfc3RvcmUiLCJwcm9jZXNzQWN0aW9uR3JvdXAiLCJ1cGRhdGVTY2hlbWFOYW1lIiwidW5kZWZpbmVkIiwiZXJyb3IiLCJyZXMiLCJhY3Rpb25Hcm91cCIsImFjdGlvbk5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJhY3Rpb25OYW1lIiwiYWN0aW9uIiwidmFsdWVGdW5jdGlvbiIsInZhbHVlIiwic2hvdWxkRGlzcGF0Y2giLCJ1aUV2ZW50RnVuY3Rpb24iLCJ1cGRhdGVGdW5jdGlvbiIsImxvY2F0aW9uIiwibG9jYXRpb25GdW5jdGlvbiIsIm9wZXJhdGlvbiIsInR5cGUiLCJzcGxpY2UiLCJuYW1lIiwiYmluZCIsImZyb21KUyIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFhQTs7a0JBRWUsZ0JBQWU7QUFBQSxLQUFaQSxLQUFZLFFBQVpBLEtBQVk7OztBQUU3QixLQUFNQyxTQUFTRCxLQUFmOztBQUVBLFFBQU87O0FBRU47QUFDQUUsc0JBQW9CLG1DQUE4RjtBQUFBLHFDQUEzRkMsZ0JBQTJGO0FBQUEsT0FBM0ZBLGdCQUEyRix5Q0FBeEVDLFNBQXdFO0FBQUEsMkJBQTdESixLQUE2RDtBQUFBLE9BQTdEQSxLQUE2RCwrQkFBckRDLE1BQXFEO0FBQUEsMkJBQTdDSSxLQUE2QztBQUFBLE9BQTdDQSxLQUE2QywrQkFBckMsRUFBcUM7QUFBQSx5QkFBakNDLEdBQWlDO0FBQUEsT0FBakNBLEdBQWlDLDZCQUEzQixFQUEyQjtBQUFBLGlDQUF2QkMsV0FBdUI7QUFBQSxPQUF2QkEsV0FBdUIscUNBQVQsRUFBUzs7QUFDakgsT0FBSUEsZUFBZUgsU0FBbkIsRUFBOEI7O0FBRTlCLE9BQU1JLGNBQWNDLE9BQU9DLElBQVAsQ0FBWUgsV0FBWixDQUFwQjs7QUFFQUMsZUFBWUcsT0FBWixDQUFvQixVQUFDQyxVQUFELEVBQWdCOztBQUVuQyxRQUFJQyxTQUFzQk4sWUFBWUssVUFBWixDQUExQjs7QUFFQTtBQUNBOztBQUVBO0FBUG1DLFFBUTNCRSxhQVIyQixHQVFzRkQsTUFSdEYsQ0FRM0JDLGFBUjJCO0FBQUEsUUFRWkMsS0FSWSxHQVFzRkYsTUFSdEYsQ0FRWkUsS0FSWTtBQUFBLFFBUUxDLGNBUkssR0FRc0ZILE1BUnRGLENBUUxHLGNBUks7QUFBQSxRQVFXQyxlQVJYLEdBUXNGSixNQVJ0RixDQVFXSSxlQVJYO0FBQUEsUUFRNEJDLGNBUjVCLEdBUXNGTCxNQVJ0RixDQVE0QkssY0FSNUI7QUFBQSxRQVE0Q0MsUUFSNUMsR0FRc0ZOLE1BUnRGLENBUTRDTSxRQVI1QztBQUFBLFFBUXNEQyxnQkFSdEQsR0FRc0ZQLE1BUnRGLENBUXNETyxnQkFSdEQ7QUFBQSxRQVF3RUMsU0FSeEUsR0FRc0ZSLE1BUnRGLENBUXdFUSxTQVJ4RTs7QUFVbkM7O0FBQ0FSLFdBQU9RLFNBQVAsR0FBbUJBLGFBQWEsT0FBaEM7O0FBRUE7QUFDQVIsV0FBT0UsS0FBUCxHQUFlRCxnQkFBZ0JBLGNBQWMsRUFBRVQsWUFBRixFQUFTQyxRQUFULEVBQWNOLFlBQWQsRUFBcUJlLFlBQXJCLEVBQWQsQ0FBaEIsR0FBOERBLEtBQTdFOztBQUVBO0FBQ0FGLFdBQU9NLFFBQVAsR0FBa0JDLG1CQUFtQkEsaUJBQWlCLEVBQUVmLFlBQUYsRUFBU0MsUUFBVCxFQUFjTixZQUFkLEVBQXFCZSxZQUFyQixFQUFqQixDQUFuQixHQUFvRUksUUFBdEY7O0FBRUE7QUFDQU4sV0FBT1MsSUFBUCxHQUFjVCxPQUFPTSxRQUFQLENBQWdCLENBQWhCLENBQWQ7O0FBRUE7QUFDQU4sV0FBT00sUUFBUCxDQUFnQkksTUFBaEIsQ0FBdUIsQ0FBdkIsRUFBeUIsQ0FBekI7O0FBRUE7QUFDQVYsV0FBT1csSUFBUCxHQUFjWixVQUFkOztBQUVBO0FBQ0FDLFdBQU9LLGNBQVAsR0FBd0JBLGlCQUFpQkEsZUFBZU8sSUFBZixDQUFvQixJQUFwQixFQUEwQixFQUFFbkIsUUFBRixFQUFPRCxZQUFQLEVBQWNMLFlBQWQsRUFBcUIwQix5QkFBckIsRUFBNkJYLFlBQTdCLEVBQTFCLENBQWpCLEdBQW1GWCxTQUEzRzs7QUFHQTs7QUFFQTtBQUNBLFFBQUtZLGtCQUFrQlosU0FBbEIsSUFBK0JZLGVBQWUsRUFBRVgsWUFBRixFQUFTQyxRQUFULEVBQWNOLFlBQWQsRUFBcUJlLFlBQXJCLEVBQWYsQ0FBcEMsRUFBbUY7O0FBRWxGO0FBQ0NmLFdBQU0yQixRQUFOLENBQWVkLE1BQWY7O0FBRUQ7QUFDQSxTQUFJSSxlQUFKLEVBQXFCQSxnQkFBZ0IsRUFBRUosY0FBRixFQUFVRSxZQUFWLEVBQWlCVCxRQUFqQixFQUFzQkQsWUFBdEIsRUFBNkJMLFlBQTdCLEVBQWhCO0FBQ3JCO0FBQ0QsSUEzQ0Q7QUE0Q0E7QUFwREssRUFBUDtBQXNEQSxDIiwiZmlsZSI6ImNyZWF0ZVVwZGF0ZXJQYXJ0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbnR5cGUgQWN0aW9uVHlwZSA9IHtcblx0dHlwZTogc3RyaW5nLFxuXHRsb2NhdGlvbjogQXJyYXk8c3RyaW5nPixcblx0dmFsdWU6IG1peGVkLFxuXHR2YWx1ZUZ1bmN0aW9uOiAoKSA9PiBtaXhlZCxcblx0dXBkYXRlRnVuY3Rpb246ICgpID0+IG1peGVkLFxuXHRsb2NhdGlvbkZ1bmN0aW9uOiAoKSA9PiBBcnJheTxzdHJpbmc+LFxuXHRzaG91bGREaXNwYXRjaDogKCkgPT4gYm9vbCxcblx0dWlFdmVudEZ1bmN0aW9uOiAoKSA9PiB2b2lkXG59XG5cbmltcG9ydCB7IGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSdcblxuZXhwb3J0IGRlZmF1bHQgKHsgc3RvcmUgfSkgPT4ge1xuXG5cdGNvbnN0IF9zdG9yZSA9IHN0b3JlXG5cblx0cmV0dXJuIHtcblxuXHRcdC8vIHRoaXMgd2lsbCBwcm9jZXNzIGFuIG9iamVjdCBmdWxsIG9mIGFjdGlvbnNcblx0XHRwcm9jZXNzQWN0aW9uR3JvdXA6ICh7IHVwZGF0ZVNjaGVtYU5hbWUgPSB1bmRlZmluZWQsIHN0b3JlID0gX3N0b3JlLCBlcnJvciA9IHt9LCByZXMgPSB7fSwgYWN0aW9uR3JvdXAgPSB7fSB9KSA9PiB7XG5cdFx0XHRpZiAoYWN0aW9uR3JvdXAgPT0gdW5kZWZpbmVkKSByZXR1cm5cblxuXHRcdFx0Y29uc3QgYWN0aW9uTmFtZXMgPSBPYmplY3Qua2V5cyhhY3Rpb25Hcm91cClcblxuXHRcdFx0YWN0aW9uTmFtZXMuZm9yRWFjaCgoYWN0aW9uTmFtZSkgPT4ge1xuXG5cdFx0XHRcdGxldCBhY3Rpb246IEFjdGlvblR5cGUgID0gYWN0aW9uR3JvdXBbYWN0aW9uTmFtZV1cblxuXHRcdFx0XHQvLyBUT0RPOiBjaGVjayBmb3IgcmVxdWlyZWQgZmllbGRzOiBicmFuY2gsIGxvY2F0aW9uLCBvcGVyYXRpb24sIHZhbHVlIHx8IHZhbHVlRnVuY3Rpb24sIGxvY2F0aW9uIHx8IGxvY2F0aW9uRnVuY3Rpb25cblx0XHRcdFx0Ly8gdXBkYXRlSW4sIHVwZGF0ZSArIHVwZGF0ZUluLCB1cGRhdGVcblxuXHRcdFx0XHQvLyBkZXN0cnVjdHVyZSBhY3Rpb24gdmFsdWVzIHVzZWQgaW4gcHJvY2Vzc2luZ1xuXHRcdFx0XHRjb25zdCB7IHZhbHVlRnVuY3Rpb24sIHZhbHVlLCBzaG91bGREaXNwYXRjaCwgdWlFdmVudEZ1bmN0aW9uLCB1cGRhdGVGdW5jdGlvbiwgbG9jYXRpb24sIGxvY2F0aW9uRnVuY3Rpb24sIG9wZXJhdGlvbiB9ID0gYWN0aW9uXG5cblx0XHRcdFx0Ly8gYWRkIG9wZXJhdGlvbiBpZiBub3QgcHJlc2VudFxuXHRcdFx0XHRhY3Rpb24ub3BlcmF0aW9uID0gb3BlcmF0aW9uIHx8ICdzZXRJbidcblxuXHRcdFx0XHQvLyB1cGRhdGUgdmFsdWVcblx0XHRcdFx0YWN0aW9uLnZhbHVlID0gdmFsdWVGdW5jdGlvbiA/IHZhbHVlRnVuY3Rpb24oeyBlcnJvciwgcmVzLCBzdG9yZSwgdmFsdWUgfSkgOiB2YWx1ZVxuXG5cdFx0XHRcdC8vIHVwZGF0ZSBsb2NhdGlvblxuXHRcdFx0XHRhY3Rpb24ubG9jYXRpb24gPSBsb2NhdGlvbkZ1bmN0aW9uID8gbG9jYXRpb25GdW5jdGlvbih7IGVycm9yLCByZXMsIHN0b3JlLCB2YWx1ZSB9KSA6IGxvY2F0aW9uXG5cblx0XHRcdFx0Ly8gYWRkIHR5cGVcblx0XHRcdFx0YWN0aW9uLnR5cGUgPSBhY3Rpb24ubG9jYXRpb25bMF1cblxuXHRcdFx0XHQvLyB0cmltIGZpcnN0IHZhbHVlIGZyb20gbG9jYXRpb25cblx0XHRcdFx0YWN0aW9uLmxvY2F0aW9uLnNwbGljZSgwLDEpXG5cblx0XHRcdFx0Ly8gYWRkIG5hbWVcblx0XHRcdFx0YWN0aW9uLm5hbWUgPSBhY3Rpb25OYW1lXG5cblx0XHRcdFx0Ly8gYWRkIHVwZGF0ZSBmdW5jdGlvbiBwYXJhbXNcblx0XHRcdFx0YWN0aW9uLnVwZGF0ZUZ1bmN0aW9uID0gdXBkYXRlRnVuY3Rpb24gPyB1cGRhdGVGdW5jdGlvbi5iaW5kKG51bGwsIHsgcmVzLCBlcnJvciwgc3RvcmUsIGZyb21KUywgdmFsdWUgfSkgOiB1bmRlZmluZWRcblxuXG5cdFx0XHRcdC8vIFRPRE86IGFkZCBtZXRhIGluZm9ybWF0aW9uIGFib3V0IHRoZSB1cGRhdGVTY2hlbWFDcmVhdG9yXG5cblx0XHRcdFx0Ly8gZGlzcGF0Y2ggYWN0aW9uIGRlcGVuZGluZyBvbiBmaXJlXG5cdFx0XHRcdGlmICggc2hvdWxkRGlzcGF0Y2ggPT0gdW5kZWZpbmVkIHx8IHNob3VsZERpc3BhdGNoKHsgZXJyb3IsIHJlcywgc3RvcmUsIHZhbHVlIH0pICkge1xuXG5cdFx0XHRcdFx0Ly8gZGlzcGF0Y2ggdGhlIGFjdGlvbiBoZXJlXG5cdFx0XHRcdFx0IHN0b3JlLmRpc3BhdGNoKGFjdGlvbilcblxuXHRcdFx0XHRcdC8vIGZpcmUgdWkgZXZlbnRcblx0XHRcdFx0XHRpZiAodWlFdmVudEZ1bmN0aW9uKSB1aUV2ZW50RnVuY3Rpb24oeyBhY3Rpb24sIHZhbHVlLCByZXMsIGVycm9yLCBzdG9yZSwgfSlcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9LFxuXHR9XG59XG4iXX0=