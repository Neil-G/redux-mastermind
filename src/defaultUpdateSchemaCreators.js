// @flow

type SigninCredentialsType = {
    email: String,
    password: String
}

export default {

    // makes sync updates to store
    genericStoreUpdate: ({ actions }) => ({
        type: 'store',
        actions
    }),

    // makes async updates from api endpoints
    genericApiUpdate: ({
        serviceOptions,
        beforeActions,
        successActions,
        failureActions,
        afterActions,
    }) => ({
        type: 'api',
        serviceOptions,
        beforeActions,
        successActions,
        failureActions,
        afterActions,
    }),

    // sign-in with firebase email & password
    firebaseSignInWithEmail: ({ email, password, customFailureAction = () => ({}) }) => ({
      type: 'firebaseAuth',
    	description: 'email and password Firebase Auth',
    	serviceOptions: {
            authMethod: 'signInWithEmailAndPassword',
            email,
            password,
        },
        successActions: {
            addUserToAuthBranch: {
              location: ['auth', 'user'],
              operation: 'setIn',
              valueFunction: ({ res }) => {
                return {
                  email: res.email,
                  id: res.uid,
                  userName: res.displayName || '',
                }
              },
            },
        },
        failureActions: {
        	recordLoginFailure: {
            location: ['appState', 'error', 'firebaseLoginWithEmail'],
            operation: 'setIn',
            valueFunction: ({ error }) => {
            	console.log('error on firebase login', error)
            	return error
            },
          },
          customFailureAction: customFailureAction(),
        }
    }),

    // firebase logout
    firebaseSignOut: () => ({
        type: 'firebaseAuth',
    	description: 'sign out of Firebase Auth',
    	serviceOptions: { authMethod: 'signOut' },
    	successActions: {
    		removeUserFromAuthBranch: {
    			location: ['auth', 'user'],
    			operation: 'setIn',
    			value: {},
    		},
    	},
    }),

    // firestore crud
    genericFirestoreUpdate: ({
        serviceOptions,
        beforeActions,
        successActions,
        failureActions,
        afterActions,
    }) => ({
        type: 'firestore',
        serviceOptions,
        beforeActions,
        successActions,
        failureActions,
        afterActions,
    }),

}
