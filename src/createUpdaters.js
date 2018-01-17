// @flow

import axios from 'axios'

export default ({ updaterParts, firebase }) => {

	const { processActionGroup } = updaterParts

	return {

		store: (instructions) => {

			processActionGroup({ actionGroup: instructions.actions })

			return true

		},

		api: (instructions) => {

			const { beforeActions, successActions, failureActions, afterActions, serviceOptions } = instructions

			processActionGroup({ actionGroup: beforeActions })

			return axios(serviceOptions || {})
				.then((res) => {

					processActionGroup({ res, actionGroup: successActions })

					processActionGroup({ res, actionGroup: afterActions })

					return res

				})
				.catch((error) => {

					processActionGroup({ error, actionGroup: failureActions })

					processActionGroup({ error, actionGroup: afterActions })

				})
		},
		websocket: (instructions) => {
			// @TODO
			const { beforeActions, successActions, failureActions, afterActions, serviceOptions } = instructions

			processActionGroup({ actionGroup: beforeActions })

			// socket connection
			const ws = new WebSocket(serviceOptions.url)

			const eventNames: Array<string>  = Object.keys(instructions).filter((name: string) => {
				return name != 'serviceOptions' && name != 'error'
			})

			// TODO add all possible event names


			// handle non-error events
			for (let i = eventNames.length - 1; i >= 0; i--) {
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

			const { beforeActions, successActions, failureActions, afterActions, serviceOptions } = instructions

			processActionGroup({ actionGroup: beforeActions })

			const { refType, refArray, operation, args } = serviceOptions

			// If a docId is supplied, then a doc is referenced, otherwise a collection is referenced
			// TODO may need to handle more complicated references
			return args
				? firebase.firestore[refType](refArray.join('/'))[operation](args)
					.then((res) => {

						processActionGroup({ res, actionGroup: successActions })

						processActionGroup({ res, actionGroup: afterActions })

						return res
					})
					.catch((error) => {

						processActionGroup({ error, actionGroup: failureActions })

						processActionGroup({ error, actionGroup: afterActions })


					})
				:  firebase.firestore[refType](refArray.join('/'))[operation]()
					.then((res) => {

						processActionGroup({ res, actionGroup: successActions })

						processActionGroup({ res, actionGroup: afterActions })

						return res
					})
					.catch((error) => {

						processActionGroup({ error, actionGroup: failureActions })

						processActionGroup({ error, actionGroup: afterActions })

					})
		},

		// used to signup, signing, and signout of Firebase Auth
		firebaseAuth: !firebase ? undefined : (instructions) => {

			const { beforeActions, successActions, failureActions, afterActions, serviceOptions } = instructions

			processActionGroup({ actionGroup: beforeActions })

			const { authMethod, email, password, persistenceType } = serviceOptions

			switch (authMethod) {

				case 'signInWithEmailAndPassword':
					return firebase.auth.setPersistence( persistenceType || 'none' )
						.then(() => {
							return  firebase.auth.signInWithEmailAndPassword(email, password)
								.then((res) => {

									processActionGroup({ res, actionGroup: successActions })

									processActionGroup({ res, actionGroup: afterActions })

									return res

								})
						})
						.catch((error) => {

							processActionGroup({ error, actionGroup: failureActions })

							processActionGroup({ error, actionGroup: afterActions })

						})

				case 'signOut':
					return firebase.auth.signOut()
						.then((res) => {

							processActionGroup({ res, actionGroup: successActions })

							processActionGroup({ res, actionGroup: afterActions })

						})
						.catch((error) => {

							processActionGroup({ error, actionGroup: failureActions })

							processActionGroup({ error, actionGroup: afterActions })

						})

				case 'createUserWithEmailAndPassword':
					return firebase.auth.createUserWithEmailAndPassword(email, password)
						.then((res) => {

							processActionGroup({ res, actionGroup: successActions })

							processActionGroup({ res, actionGroup: afterActions })

							return res

						})
						.catch((error) => {

							processActionGroup({ error, actionGroup: failureActions })

							processActionGroup({ error, actionGroup: afterActions })

						})

				// use this to log user into redux with persistent firebase auth
				case 'onAuthStateChanged':
					return firebase.auth.onAuthStateChanged((res) => { // this will be the user object

						processActionGroup({ res, actionGroup: actions || successActions })

						processActionGroup({ res, actionGroup: afterActions })

					})

				// TODO: social auth

				default:
				 	return
			}
		},

		// use for realtime firebase CRUD
		firebase: !firebase ? undefined : ({ instructions }) => {

			const { beforeActions, successActions, failureActions, afterActions, serviceOptions } = instructions

			// process before actions
			processActionGroup({ actionGroup: beforeActions })

			const { ref, methodName, args } = serviceOptions

			firebase.firebase.ref(ref)[methodName](args)
				.then((res) => {

					processActionGroup({ res, actionGroup: successActions })

					processActionGroup({ res, actionGroup: afterActions })

					return res
				})
				.catch((error) => {

					processActionGroup({ error, actionGroup: failureActions })

					processActionGroup({ error, actionGroup: afterActions })

				})
		},

		attachFirebaseListener: !firebase ? undefined : ({ instructions }) => {
			const { ref, onChangeActions } = instructions
			firebase.firebase.ref(ref).on('value', (res) => { // 'value' should be a service option

				console.log('change detected in realtime db at ref: ', res, res.val())

				// process success actions
				processActionGroup({ res, actionGroup: onChangeActions })
			})
		},
	}
}
