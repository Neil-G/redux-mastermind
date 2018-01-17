// @flow

import axios from 'axios'

export default ({ updaterParts, firebase }) => {

	const { processActionGroup } = updaterParts

	return {

		// dipsatches actions straight to the store
		store: (instructions) => {

			// process actions
			processActionGroup({ actionGroup: instructions.actions })

			return true

		},

		// makes an api call using axios
		api: (instructions) => {

			const { beforeActions, successActions, failureActions, serviceOptions } = instructions

			// process actions for before api call
			processActionGroup({ actionGroup: beforeActions })

			// api call
			return axios(serviceOptions || {})
				.then((res) => {

					// process success actions
					processActionGroup({ res, actionGroup: successActions })

					return res

				})
				.catch((error) => {

					// process failure actions
					processActionGroup({ error, actionGroup: failureActions })

				})
		},
		websocket: (instructions) => {
			// @TODO
			const { beforeActions, successActions, failureActions, serviceOptions } = instructions

			// process actions for before api call
			processActionGroup({ actionGroup: beforeActions })

			// socket connection
			const ws = new WebSocket(serviceOptions.url)

			const eventNames: Array<string>  = Object.keys(instructions).filter((name: string) => {
				return name != 'serviceOptions' && name != 'error'
			})

			// TODO add all possible event names


			// handle non-error events
			for (var i = eventNames.length - 1; i >= 0; i--) {
				const eventName = eventNames[i]
				const actionGroup = instructions[eventName]

				ws.addEventListener(eventName, (res) => {

					processActionGroup({ res, actionGroup: actionGroup })

					// TODO handle sending messages

				})
			}

			// handle error
			ws.addEventListener('error', (error) => {
				processActionGroup({ error, actionGroup: failureActions })
			})

		},


		// CRUD for firestore collections and docs
		firestore: !firebase ? undefined : (instructions) => {

			const { beforeActions, successActions, failureActions, serviceOptions } = instructions

			// process before actions
			processActionGroup({ actionGroup: beforeActions })

			// get firestore service variables
			const { refType, refArray, operation, args } = serviceOptions

			// If a docId is supplied, then a doc is referenced, otherwise a collection is referenced
			// TODO may need to handle more complicated references
			return args
				? firebase.firestore[refType](refArray.join('/'))[operation](args)
					.then((res) => {

						// process success actions
						processActionGroup({ res, actionGroup: successActions })

						return res
					})
					.catch((error) => {

						// process failure actions
						processActionGroup({ error, actionGroup: failureActions })

					})
				:  firebase.firestore[refType](refArray.join('/'))[operation]()
					.then((res) => {

						// process success actions
						processActionGroup({ res, actionGroup: successActions })

						return res
					})
					.catch((error) => {

						// process failure actions
						processActionGroup({ error, actionGroup: failureActions })

					})
		},

		// used to signup, signing, and signout of Firebase Auth
		firebaseAuth: !firebase ? undefined : (instructions) => {

			const { beforeActions, successActions, failureActions, serviceOptions } = instructions

			processActionGroup({ actionGroup: beforeActions })

			const { authMethod, email, password, persistenceType } = serviceOptions

			switch (authMethod) {

				case 'signInWithEmailAndPassword':
					return firebase.auth.setPersistence( persistenceType || 'none' )
						.then(() => {
							return  firebase.auth.signInWithEmailAndPassword(email, password)
								.then((res) => {

									processActionGroup({ res, actionGroup: successActions })

									return res

								})
						})
						.catch((error) => {

							processActionGroup({ error, actionGroup: failureActions })

						})

				case 'signOut':
					return firebase.auth.signOut()
						.then((res) => {

							processActionGroup({ res, actionGroup: successActions })

						})
						.catch((error) => {

							processActionGroup({ error, actionGroup: failureActions })

						})

				case 'createUserWithEmailAndPassword':
					return firebase.auth.createUserWithEmailAndPassword(email, password)
						.then((res) => {

							processActionGroup({ res, actionGroup: successActions })

							return res

						})
						.catch((error) => {

							processActionGroup({ error, actionGroup: failureActions })

						})

				// use this to log user into redux with persistent firebase auth		
				case 'onAuthStateChanged':
					return firebase.auth.onAuthStateChanged((res) => { // this will be the user object

						processActionGroup({ res, actionGroup: actions || successActions })

					})

				// TODO: social auth

				default:
				 	return
			}
		},

		firebase: !firebase ? undefined : ({ instructions }) => {

			const { beforeActions, successActions, failureActions, serviceOptions } = instructions

			// process before actions
			processActionGroup({ actionGroup: beforeActions })

			const { ref, methodName, args } = serviceOptions

			firebase.firebase.ref(ref)[methodName](args)
				.then((res) => {

					// console.log('res from basicFirebase: ', res)

					// process success actions
					processActionGroup({ res, actionGroup: successActions })

					return res
				})
				.catch((error) => {

					// process failure actions
					processActionGroup({ error, actionGroup: failureActions })

				})
		},

		attachFirebaseListener: !firebase ? undefined : ({ instructions }) => {
			const { ref, onChangeActions } = instructions
			firebase.firebase.ref(ref).on('value', (res) => {

				console.log('change detected in realtime db at ref: ', res, res.val())

				// process success actions
				processActionGroup({ res, actionGroup: onChangeActions })
			})
		},
	}
}
