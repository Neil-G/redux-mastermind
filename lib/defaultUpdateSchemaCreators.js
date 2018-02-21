'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {

    // makes sync updates to store
    genericStoreUpdate: function genericStoreUpdate(_ref) {
        var actions = _ref.actions;
        return {
            type: 'store',
            actions: actions
        };
    },

    // makes async updates from api endpoints
    genericApiUpdate: function genericApiUpdate(_ref2) {
        var serviceOptions = _ref2.serviceOptions,
            beforeActions = _ref2.beforeActions,
            successActions = _ref2.successActions,
            failureActions = _ref2.failureActions,
            afterActions = _ref2.afterActions;
        return {
            type: 'api',
            serviceOptions: serviceOptions,
            beforeActions: beforeActions,
            successActions: successActions,
            failureActions: failureActions,
            afterActions: afterActions
        };
    },

    // sign-in with firebase email & password
    firebaseSignInWithEmail: function firebaseSignInWithEmail(_ref3) {
        var email = _ref3.email,
            password = _ref3.password,
            _ref3$customFailureAc = _ref3.customFailureAction,
            customFailureAction = _ref3$customFailureAc === undefined ? function () {
            return {};
        } : _ref3$customFailureAc;
        return {
            type: 'firebaseAuth',
            description: 'email and password Firebase Auth',
            serviceOptions: {
                authMethod: 'signInWithEmailAndPassword',
                email: email,
                password: password
            },
            successActions: {
                addUserToAuthBranch: {
                    location: ['auth', 'user'],
                    operation: 'setIn',
                    valueFunction: function valueFunction(_ref4) {
                        var res = _ref4.res;

                        return {
                            email: res.email,
                            id: res.uid,
                            userName: res.displayName || ''
                        };
                    }
                }
            },
            failureActions: {
                recordLoginFailure: {
                    location: ['appState', 'error', 'firebaseLoginWithEmail'],
                    operation: 'setIn',
                    valueFunction: function valueFunction(_ref5) {
                        var error = _ref5.error;

                        console.log('error on firebase login', error);
                        return error;
                    }
                },
                customFailureAction: customFailureAction()
            }
        };
    },

    // firebase logout
    firebaseSignOut: function firebaseSignOut() {
        return {
            type: 'firebaseAuth',
            description: 'sign out of Firebase Auth',
            serviceOptions: { authMethod: 'signOut' },
            successActions: {
                removeUserFromAuthBranch: {
                    location: ['auth', 'user'],
                    operation: 'setIn',
                    value: {}
                }
            }
        };
    },

    // firestore crud
    genericFirestoreUpdate: function genericFirestoreUpdate(_ref6) {
        var serviceOptions = _ref6.serviceOptions,
            beforeActions = _ref6.beforeActions,
            successActions = _ref6.successActions,
            failureActions = _ref6.failureActions,
            afterActions = _ref6.afterActions;
        return {
            type: 'firestore',
            serviceOptions: serviceOptions,
            beforeActions: beforeActions,
            successActions: successActions,
            failureActions: failureActions,
            afterActions: afterActions
        };
    }

};