export default (firestore) => {
	let _firestore = firestore
	return {
		basicCollection: ({ collectionName }) => _firestore.collection(collectionName),
		basicDoc: ({ collectionName, docId }) => _firestore.collection(collectionName).doc(docId),
	}
}

