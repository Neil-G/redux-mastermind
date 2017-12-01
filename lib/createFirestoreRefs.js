"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (firestore) {
	var _firestore = firestore;
	return {
		basicCollection: function basicCollection(_ref) {
			var collectionName = _ref.collectionName;
			return _firestore.collection(collectionName);
		},
		basicDoc: function basicDoc(_ref2) {
			var collectionName = _ref2.collectionName,
			    docId = _ref2.docId;
			return _firestore.collection(collectionName).doc(docId);
		}
	};
};