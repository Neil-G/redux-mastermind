"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createFirestoreRefs = require("./createFirestoreRefs.js");

var _createFirestoreRefs2 = _interopRequireDefault(_createFirestoreRefs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var firebase = require("firebase");
require("firebase/firestore");

exports.default = function (firebaseConfig) {

	// initializeApp
	var app = firebase.initializeApp(firebaseConfig)['firebase_'];

	return {
		auth: app.auth(),
		firebase: app.database(),
		firestore: app.firestore(),
		firestoreRefs: (0, _createFirestoreRefs2.default)(app.firestore())
	};
};