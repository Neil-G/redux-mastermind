const firebase = require("firebase")
require("firebase/firestore")
import createFirestoreRefs from './createFirestoreRefs.js'

export default (firebaseConfig) => {

	// initializeApp
	const app = firebase.initializeApp(firebaseConfig)['firebase_']

	return {
		auth: app.auth(),
	    firebase: app.database(),
	    firestore: app.firestore(),
	}
}
