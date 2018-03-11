"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var firebase = require("firebase");
require("firebase/firestore");

exports.default = function (firebaseConfig) {

	// initializeApp
	var app = firebase.initializeApp(firebaseConfig)['firebase_'];

	return {
		auth: app.auth(),
		firebase: app.database(),
		firestore: app.firestore(),
		storage: app.storage()
	};
};