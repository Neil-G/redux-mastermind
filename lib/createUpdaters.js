'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var updaterParts = _ref.updaterParts,
	    firebase = _ref.firebase;
	var processActionGroup = updaterParts.processActionGroup;


	return {

		// dipsatches actions straight to the store
		store: function store(instructions) {

			// process actions
			processActionGroup({ actionGroup: instructions.actions });

			return true;
		},

		// makes an api call using axios
		api: function api(instructions) {
			var beforeActions = instructions.beforeActions,
			    successActions = instructions.successActions,
			    failureActions = instructions.failureActions,
			    serviceOptions = instructions.serviceOptions;

			// process actions for before api call

			processActionGroup({ actionGroup: beforeActions });

			// api call
			return (0, _axios2.default)(serviceOptions || {}).then(function (res) {

				// process success actions
				processActionGroup({ res: res, actionGroup: successActions });

				return res;
			}).catch(function (error) {

				// process failure actions
				processActionGroup({ error: error, actionGroup: failureActions });
			});
		},
		websocket: function websocket(instructions) {
			// @TODO
			var beforeActions = instructions.beforeActions,
			    successActions = instructions.successActions,
			    failureActions = instructions.failureActions,
			    serviceOptions = instructions.serviceOptions;

			// process actions for before api call

			processActionGroup({ actionGroup: beforeActions });

			// socket connection
			var ws = new WebSocket(serviceOptions.url);

			var eventNames = Object.keys(instructions).filter(function (name) {
				return name != 'serviceOptions' && name != 'error';
			});

			// TODO add all possible event names


			// handle non-error events

			var _loop = function _loop() {
				var eventName = eventNames[i];
				var actionGroup = instructions[eventName];

				ws.addEventListener(eventName, function (res) {

					processActionGroup({ res: res, actionGroup: actionGroup });

					// TODO handle sending messages
				});
			};

			for (var i = eventNames.length - 1; i >= 0; i--) {
				_loop();
			}

			// handle error
			ws.addEventListener('error', function (error) {
				processActionGroup({ error: error, actionGroup: failureActions });
			});
		},

		// CRUD for firestore collections and docs
		firestore: !firebase ? undefined : function (instructions) {
			var beforeActions = instructions.beforeActions,
			    successActions = instructions.successActions,
			    failureActions = instructions.failureActions,
			    serviceOptions = instructions.serviceOptions;

			// process before actions

			processActionGroup({ actionGroup: beforeActions });

			// get firestore service variables
			var refType = serviceOptions.refType,
			    refArray = serviceOptions.refArray,
			    operation = serviceOptions.operation,
			    args = serviceOptions.args;

			// If a docId is supplied, then a doc is referenced, otherwise a collection is referenced
			// TODO may need to handle more complicated references

			return args ? firebase.firestore[refType](refArray.join('/'))[operation](args).then(function (res) {

				// process success actions
				processActionGroup({ res: res, actionGroup: successActions });

				return res;
			}).catch(function (error) {

				// process failure actions
				processActionGroup({ error: error, actionGroup: failureActions });
			}) : firebase.firestore[refType](refArray.join('/'))[operation]().then(function (res) {

				// process success actions
				processActionGroup({ res: res, actionGroup: successActions });

				return res;
			}).catch(function (error) {

				// process failure actions
				processActionGroup({ error: error, actionGroup: failureActions });
			});
		},

		// used to signup, signing, and signout of Firebase Auth
		firebaseAuth: !firebase ? undefined : function (instructions) {
			var beforeActions = instructions.beforeActions,
			    successActions = instructions.successActions,
			    failureActions = instructions.failureActions,
			    serviceOptions = instructions.serviceOptions;


			processActionGroup({ actionGroup: beforeActions });

			var authMethod = serviceOptions.authMethod,
			    email = serviceOptions.email,
			    password = serviceOptions.password,
			    persistenceType = serviceOptions.persistenceType;


			switch (authMethod) {

				case 'signInWithEmailAndPassword':
					return firebase.auth.setPersistence(persistenceType || 'none').then(function () {
						return firebase.auth.signInWithEmailAndPassword(email, password).then(function (res) {

							processActionGroup({ res: res, actionGroup: successActions });

							return res;
						});
					}).catch(function (error) {

						processActionGroup({ error: error, actionGroup: failureActions });
					});

				case 'signOut':
					return firebase.auth.signOut().then(function (res) {

						processActionGroup({ res: res, actionGroup: successActions });
					}).catch(function (error) {

						processActionGroup({ error: error, actionGroup: failureActions });
					});

				case 'createUserWithEmailAndPassword':
					return firebase.auth.createUserWithEmailAndPassword(email, password).then(function (res) {

						processActionGroup({ res: res, actionGroup: successActions });

						return res;
					}).catch(function (error) {

						processActionGroup({ error: error, actionGroup: failureActions });
					});

				// use this to log user into redux with persistent firebase auth		
				case 'onAuthStateChanged':
					return firebase.auth.onAuthStateChanged(function (res) {
						// this will be the user object

						processActionGroup({ res: res, actionGroup: actions || successActions });
					});

				// TODO: social auth

				default:
					return;
			}
		},

		firebase: !firebase ? undefined : function (_ref2) {
			var instructions = _ref2.instructions;
			var beforeActions = instructions.beforeActions,
			    successActions = instructions.successActions,
			    failureActions = instructions.failureActions,
			    serviceOptions = instructions.serviceOptions;

			// process before actions

			processActionGroup({ actionGroup: beforeActions });

			var ref = serviceOptions.ref,
			    methodName = serviceOptions.methodName,
			    args = serviceOptions.args;


			firebase.firebase.ref(ref)[methodName](args).then(function (res) {

				// console.log('res from basicFirebase: ', res)

				// process success actions
				processActionGroup({ res: res, actionGroup: successActions });

				return res;
			}).catch(function (error) {

				// process failure actions
				processActionGroup({ error: error, actionGroup: failureActions });
			});
		},

		attachFirebaseListener: !firebase ? undefined : function (_ref3) {
			var instructions = _ref3.instructions;
			var ref = instructions.ref,
			    onChangeActions = instructions.onChangeActions;

			firebase.firebase.ref(ref).on('value', function (res) {

				console.log('change detected in realtime db at ref: ', res, res.val());

				// process success actions
				processActionGroup({ res: res, actionGroup: onChangeActions });
			});
		}
	};
};