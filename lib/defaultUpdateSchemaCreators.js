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
            password = _ref3.password;
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
                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZhdWx0VXBkYXRlU2NoZW1hQ3JlYXRvcnMuanMiXSwibmFtZXMiOlsiZ2VuZXJpY1N0b3JlVXBkYXRlIiwiYWN0aW9ucyIsInR5cGUiLCJnZW5lcmljQXBpVXBkYXRlIiwic2VydmljZU9wdGlvbnMiLCJiZWZvcmVBY3Rpb25zIiwic3VjY2Vzc0FjdGlvbnMiLCJmYWlsdXJlQWN0aW9ucyIsImFmdGVyQWN0aW9ucyIsImZpcmViYXNlU2lnbkluV2l0aEVtYWlsIiwiZW1haWwiLCJwYXNzd29yZCIsImRlc2NyaXB0aW9uIiwiYXV0aE1ldGhvZCIsImFkZFVzZXJUb0F1dGhCcmFuY2giLCJsb2NhdGlvbiIsIm9wZXJhdGlvbiIsInZhbHVlRnVuY3Rpb24iLCJyZXMiLCJpZCIsInVpZCIsInVzZXJOYW1lIiwiZGlzcGxheU5hbWUiLCJyZWNvcmRMb2dpbkZhaWx1cmUiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJmaXJlYmFzZVNpZ25PdXQiLCJyZW1vdmVVc2VyRnJvbUF1dGhCcmFuY2giLCJ2YWx1ZSIsImdlbmVyaWNGaXJlc3RvcmVVcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQU9lOztBQUVYO0FBQ0FBLHdCQUFvQjtBQUFBLFlBQUdDLE9BQUgsUUFBR0EsT0FBSDtBQUFBLGVBQWtCO0FBQ2xDQyxrQkFBTSxPQUQ0QjtBQUVsQ0Q7QUFGa0MsU0FBbEI7QUFBQSxLQUhUOztBQVFYO0FBQ0FFLHNCQUFrQjtBQUFBLFlBQ2RDLGNBRGMsU0FDZEEsY0FEYztBQUFBLFlBRWRDLGFBRmMsU0FFZEEsYUFGYztBQUFBLFlBR2RDLGNBSGMsU0FHZEEsY0FIYztBQUFBLFlBSWRDLGNBSmMsU0FJZEEsY0FKYztBQUFBLFlBS2RDLFlBTGMsU0FLZEEsWUFMYztBQUFBLGVBTVg7QUFDSE4sa0JBQU0sS0FESDtBQUVIRSwwQ0FGRztBQUdIQyx3Q0FIRztBQUlIQywwQ0FKRztBQUtIQywwQ0FMRztBQU1IQztBQU5HLFNBTlc7QUFBQSxLQVRQOztBQXdCWDtBQUNBQyw2QkFBeUI7QUFBQSxZQUFHQyxLQUFILFNBQUdBLEtBQUg7QUFBQSxZQUFVQyxRQUFWLFNBQVVBLFFBQVY7QUFBQSxlQUFtRDtBQUN4RVQsa0JBQU0sY0FEa0U7QUFFM0VVLHlCQUFhLGtDQUY4RDtBQUczRVIsNEJBQWdCO0FBQ1RTLDRCQUFZLDRCQURIO0FBRVRILDRCQUZTO0FBR1RDO0FBSFMsYUFIMkQ7QUFReEVMLDRCQUFnQjtBQUNaUSxxQ0FBcUI7QUFDbkJDLDhCQUFVLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FEUztBQUVuQkMsK0JBQVcsT0FGUTtBQUduQkMsbUNBQWUsOEJBQWE7QUFBQSw0QkFBVkMsR0FBVSxTQUFWQSxHQUFVOztBQUMxQiwrQkFBTztBQUNMUixtQ0FBT1EsSUFBSVIsS0FETjtBQUVMUyxnQ0FBSUQsSUFBSUUsR0FGSDtBQUdMQyxzQ0FBVUgsSUFBSUksV0FBSixJQUFtQjtBQUh4Qix5QkFBUDtBQUtEO0FBVGtCO0FBRFQsYUFSd0Q7QUFxQnhFZiw0QkFBZ0I7QUFDZmdCLG9DQUFvQjtBQUNmUiw4QkFBVSxDQUFDLFVBQUQsRUFBYSxPQUFiLEVBQXNCLHdCQUF0QixDQURLO0FBRWZDLCtCQUFXLE9BRkk7QUFHZkMsbUNBQWUsOEJBQWU7QUFBQSw0QkFBWk8sS0FBWSxTQUFaQSxLQUFZOztBQUM3QkMsZ0NBQVFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1Q0YsS0FBdkM7QUFDQSwrQkFBT0EsS0FBUDtBQUNBO0FBTmM7QUFETDtBQXJCd0QsU0FBbkQ7QUFBQSxLQXpCZDs7QUEwRFg7QUFDQUcscUJBQWlCO0FBQUEsZUFBTztBQUNwQnpCLGtCQUFNLGNBRGM7QUFFdkJVLHlCQUFhLDJCQUZVO0FBR3ZCUiw0QkFBZ0IsRUFBRVMsWUFBWSxTQUFkLEVBSE87QUFJdkJQLDRCQUFnQjtBQUNmc0IsMENBQTBCO0FBQ3pCYiw4QkFBVSxDQUFDLE1BQUQsRUFBUyxNQUFULENBRGU7QUFFekJDLCtCQUFXLE9BRmM7QUFHekJhLDJCQUFPO0FBSGtCO0FBRFg7QUFKTyxTQUFQO0FBQUEsS0EzRE47O0FBd0VYO0FBQ0FDLDRCQUF3QjtBQUFBLFlBQ3BCMUIsY0FEb0IsU0FDcEJBLGNBRG9CO0FBQUEsWUFFcEJDLGFBRm9CLFNBRXBCQSxhQUZvQjtBQUFBLFlBR3BCQyxjQUhvQixTQUdwQkEsY0FIb0I7QUFBQSxZQUlwQkMsY0FKb0IsU0FJcEJBLGNBSm9CO0FBQUEsWUFLcEJDLFlBTG9CLFNBS3BCQSxZQUxvQjtBQUFBLGVBTWpCO0FBQ0hOLGtCQUFNLFdBREg7QUFFSEUsMENBRkc7QUFHSEMsd0NBSEc7QUFJSEMsMENBSkc7QUFLSEMsMENBTEc7QUFNSEM7QUFORyxTQU5pQjtBQUFBOztBQXpFYixDIiwiZmlsZSI6ImRlZmF1bHRVcGRhdGVTY2hlbWFDcmVhdG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbnR5cGUgU2lnbmluQ3JlZGVudGlhbHNUeXBlID0ge1xuICAgIGVtYWlsOiBTdHJpbmcsXG4gICAgcGFzc3dvcmQ6IFN0cmluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICAvLyBtYWtlcyBzeW5jIHVwZGF0ZXMgdG8gc3RvcmVcbiAgICBnZW5lcmljU3RvcmVVcGRhdGU6ICh7IGFjdGlvbnMgfSkgPT4gKHtcbiAgICAgICAgdHlwZTogJ3N0b3JlJyxcbiAgICAgICAgYWN0aW9uc1xuICAgIH0pLFxuXG4gICAgLy8gbWFrZXMgYXN5bmMgdXBkYXRlcyBmcm9tIGFwaSBlbmRwb2ludHNcbiAgICBnZW5lcmljQXBpVXBkYXRlOiAoe1xuICAgICAgICBzZXJ2aWNlT3B0aW9ucyxcbiAgICAgICAgYmVmb3JlQWN0aW9ucyxcbiAgICAgICAgc3VjY2Vzc0FjdGlvbnMsXG4gICAgICAgIGZhaWx1cmVBY3Rpb25zLFxuICAgICAgICBhZnRlckFjdGlvbnMsXG4gICAgfSkgPT4gKHtcbiAgICAgICAgdHlwZTogJ2FwaScsXG4gICAgICAgIHNlcnZpY2VPcHRpb25zLFxuICAgICAgICBiZWZvcmVBY3Rpb25zLFxuICAgICAgICBzdWNjZXNzQWN0aW9ucyxcbiAgICAgICAgZmFpbHVyZUFjdGlvbnMsXG4gICAgICAgIGFmdGVyQWN0aW9ucyxcbiAgICB9KSxcblxuICAgIC8vIHNpZ24taW4gd2l0aCBmaXJlYmFzZSBlbWFpbCAmIHBhc3N3b3JkXG4gICAgZmlyZWJhc2VTaWduSW5XaXRoRW1haWw6ICh7IGVtYWlsLCBwYXNzd29yZCB9IDogU2lnbmluQ3JlZGVudGlhbHNUeXBlICkgPT4gKHtcbiAgICAgICAgdHlwZTogJ2ZpcmViYXNlQXV0aCcsXG4gICAgXHRkZXNjcmlwdGlvbjogJ2VtYWlsIGFuZCBwYXNzd29yZCBGaXJlYmFzZSBBdXRoJyxcbiAgICBcdHNlcnZpY2VPcHRpb25zOiB7XG4gICAgICAgICAgICBhdXRoTWV0aG9kOiAnc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQnLFxuICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2Vzc0FjdGlvbnM6IHtcbiAgICAgICAgICAgIGFkZFVzZXJUb0F1dGhCcmFuY2g6IHtcbiAgICAgICAgICAgICAgbG9jYXRpb246IFsnYXV0aCcsICd1c2VyJ10sXG4gICAgICAgICAgICAgIG9wZXJhdGlvbjogJ3NldEluJyxcbiAgICAgICAgICAgICAgdmFsdWVGdW5jdGlvbjogKHsgcmVzIH0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgZW1haWw6IHJlcy5lbWFpbCxcbiAgICAgICAgICAgICAgICAgIGlkOiByZXMudWlkLFxuICAgICAgICAgICAgICAgICAgdXNlck5hbWU6IHJlcy5kaXNwbGF5TmFtZSB8fCAnJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBmYWlsdXJlQWN0aW9uczoge1xuICAgICAgICBcdHJlY29yZExvZ2luRmFpbHVyZToge1xuICAgICAgICAgICAgICBsb2NhdGlvbjogWydhcHBTdGF0ZScsICdlcnJvcicsICdmaXJlYmFzZUxvZ2luV2l0aEVtYWlsJ10sXG4gICAgICAgICAgICAgIG9wZXJhdGlvbjogJ3NldEluJyxcbiAgICAgICAgICAgICAgdmFsdWVGdW5jdGlvbjogKHsgZXJyb3IgfSkgPT4ge1xuICAgICAgICAgICAgICBcdGNvbnNvbGUubG9nKCdlcnJvciBvbiBmaXJlYmFzZSBsb2dpbicsIGVycm9yKVxuICAgICAgICAgICAgICBcdHJldHVybiBlcnJvclxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH0pLFxuXG4gICAgLy8gZmlyZWJhc2UgbG9nb3V0XG4gICAgZmlyZWJhc2VTaWduT3V0OiAoKSA9PiAoe1xuICAgICAgICB0eXBlOiAnZmlyZWJhc2VBdXRoJyxcbiAgICBcdGRlc2NyaXB0aW9uOiAnc2lnbiBvdXQgb2YgRmlyZWJhc2UgQXV0aCcsXG4gICAgXHRzZXJ2aWNlT3B0aW9uczogeyBhdXRoTWV0aG9kOiAnc2lnbk91dCcgfSxcbiAgICBcdHN1Y2Nlc3NBY3Rpb25zOiB7XG4gICAgXHRcdHJlbW92ZVVzZXJGcm9tQXV0aEJyYW5jaDoge1xuICAgIFx0XHRcdGxvY2F0aW9uOiBbJ2F1dGgnLCAndXNlciddLFxuICAgIFx0XHRcdG9wZXJhdGlvbjogJ3NldEluJyxcbiAgICBcdFx0XHR2YWx1ZToge30sXG4gICAgXHRcdH0sXG4gICAgXHR9LFxuICAgIH0pLFxuXG4gICAgLy8gZmlyZXN0b3JlIGNydWRcbiAgICBnZW5lcmljRmlyZXN0b3JlVXBkYXRlOiAoe1xuICAgICAgICBzZXJ2aWNlT3B0aW9ucyxcbiAgICAgICAgYmVmb3JlQWN0aW9ucyxcbiAgICAgICAgc3VjY2Vzc0FjdGlvbnMsXG4gICAgICAgIGZhaWx1cmVBY3Rpb25zLFxuICAgICAgICBhZnRlckFjdGlvbnMsXG4gICAgfSkgPT4gKHtcbiAgICAgICAgdHlwZTogJ2ZpcmVzdG9yZScsXG4gICAgICAgIHNlcnZpY2VPcHRpb25zLFxuICAgICAgICBiZWZvcmVBY3Rpb25zLFxuICAgICAgICBzdWNjZXNzQWN0aW9ucyxcbiAgICAgICAgZmFpbHVyZUFjdGlvbnMsXG4gICAgICAgIGFmdGVyQWN0aW9ucyxcbiAgICB9KSxcblxufVxuIl19