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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZhdWx0VXBkYXRlU2NoZW1hQ3JlYXRvcnMuanMiXSwibmFtZXMiOlsiZ2VuZXJpY1N0b3JlVXBkYXRlIiwiYWN0aW9ucyIsInR5cGUiLCJnZW5lcmljQXBpVXBkYXRlIiwic2VydmljZU9wdGlvbnMiLCJiZWZvcmVBY3Rpb25zIiwic3VjY2Vzc0FjdGlvbnMiLCJmYWlsdXJlQWN0aW9ucyIsImFmdGVyQWN0aW9ucyIsImZpcmViYXNlU2lnbkluV2l0aEVtYWlsIiwiZW1haWwiLCJwYXNzd29yZCIsImRlc2NyaXB0aW9uIiwiYXV0aE1ldGhvZCIsImFkZFVzZXJUb0F1dGhCcmFuY2giLCJsb2NhdGlvbiIsIm9wZXJhdGlvbiIsInZhbHVlRnVuY3Rpb24iLCJyZXMiLCJpZCIsInVpZCIsInVzZXJOYW1lIiwiZGlzcGxheU5hbWUiLCJyZWNvcmRMb2dpbkZhaWx1cmUiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJmaXJlYmFzZVNpZ25PdXQiLCJyZW1vdmVVc2VyRnJvbUF1dGhCcmFuY2giLCJ2YWx1ZSIsImdlbmVyaWNGaXJlc3RvcmVVcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQU9lOztBQUVYO0FBQ0FBLHdCQUFvQjtBQUFBLFlBQUdDLE9BQUgsUUFBR0EsT0FBSDtBQUFBLGVBQWtCO0FBQ2xDQyxrQkFBTSxPQUQ0QjtBQUVsQ0Q7QUFGa0MsU0FBbEI7QUFBQSxLQUhUOztBQVFYO0FBQ0FFLHNCQUFrQjtBQUFBLFlBQ2RDLGNBRGMsU0FDZEEsY0FEYztBQUFBLFlBRWRDLGFBRmMsU0FFZEEsYUFGYztBQUFBLFlBR2RDLGNBSGMsU0FHZEEsY0FIYztBQUFBLFlBSWRDLGNBSmMsU0FJZEEsY0FKYztBQUFBLFlBS2RDLFlBTGMsU0FLZEEsWUFMYztBQUFBLGVBTVg7QUFDSE4sa0JBQU0sS0FESDtBQUVIRSwwQ0FGRztBQUdIQyx3Q0FIRztBQUlIQywwQ0FKRztBQUtIQywwQ0FMRztBQU1IQztBQU5HLFNBTlc7QUFBQSxLQVRQOztBQXdCWDtBQUNBQyw2QkFBeUI7QUFBQSxZQUFHQyxLQUFILFNBQUdBLEtBQUg7QUFBQSxZQUFVQyxRQUFWLFNBQVVBLFFBQVY7QUFBQSxlQUEwQjtBQUNqRFQsa0JBQU0sY0FEMkM7QUFFbERVLHlCQUFhLGtDQUZxQztBQUdsRFIsNEJBQWdCO0FBQ1RTLDRCQUFZLDRCQURIO0FBRVRILDRCQUZTO0FBR1RDO0FBSFMsYUFIa0M7QUFRL0NMLDRCQUFnQjtBQUNaUSxxQ0FBcUI7QUFDbkJDLDhCQUFVLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FEUztBQUVuQkMsK0JBQVcsT0FGUTtBQUduQkMsbUNBQWUsOEJBQWE7QUFBQSw0QkFBVkMsR0FBVSxTQUFWQSxHQUFVOztBQUMxQiwrQkFBTztBQUNMUixtQ0FBT1EsSUFBSVIsS0FETjtBQUVMUyxnQ0FBSUQsSUFBSUUsR0FGSDtBQUdMQyxzQ0FBVUgsSUFBSUksV0FBSixJQUFtQjtBQUh4Qix5QkFBUDtBQUtEO0FBVGtCO0FBRFQsYUFSK0I7QUFxQi9DZiw0QkFBZ0I7QUFDZmdCLG9DQUFvQjtBQUNqQlIsOEJBQVUsQ0FBQyxVQUFELEVBQWEsT0FBYixFQUFzQix3QkFBdEIsQ0FETztBQUVqQkMsK0JBQVcsT0FGTTtBQUdqQkMsbUNBQWUsOEJBQWU7QUFBQSw0QkFBWk8sS0FBWSxTQUFaQSxLQUFZOztBQUM3QkMsZ0NBQVFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1Q0YsS0FBdkM7QUFDQSwrQkFBT0EsS0FBUDtBQUNBO0FBTmdCO0FBREw7QUFyQitCLFNBQTFCO0FBQUEsS0F6QmQ7O0FBMERYO0FBQ0FHLHFCQUFpQjtBQUFBLGVBQU87QUFDcEJ6QixrQkFBTSxjQURjO0FBRXZCVSx5QkFBYSwyQkFGVTtBQUd2QlIsNEJBQWdCLEVBQUVTLFlBQVksU0FBZCxFQUhPO0FBSXZCUCw0QkFBZ0I7QUFDZnNCLDBDQUEwQjtBQUN6QmIsOEJBQVUsQ0FBQyxNQUFELEVBQVMsTUFBVCxDQURlO0FBRXpCQywrQkFBVyxPQUZjO0FBR3pCYSwyQkFBTztBQUhrQjtBQURYO0FBSk8sU0FBUDtBQUFBLEtBM0ROOztBQXdFWDtBQUNBQyw0QkFBd0I7QUFBQSxZQUNwQjFCLGNBRG9CLFNBQ3BCQSxjQURvQjtBQUFBLFlBRXBCQyxhQUZvQixTQUVwQkEsYUFGb0I7QUFBQSxZQUdwQkMsY0FIb0IsU0FHcEJBLGNBSG9CO0FBQUEsWUFJcEJDLGNBSm9CLFNBSXBCQSxjQUpvQjtBQUFBLFlBS3BCQyxZQUxvQixTQUtwQkEsWUFMb0I7QUFBQSxlQU1qQjtBQUNITixrQkFBTSxXQURIO0FBRUhFLDBDQUZHO0FBR0hDLHdDQUhHO0FBSUhDLDBDQUpHO0FBS0hDLDBDQUxHO0FBTUhDO0FBTkcsU0FOaUI7QUFBQTs7QUF6RWIsQyIsImZpbGUiOiJkZWZhdWx0VXBkYXRlU2NoZW1hQ3JlYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG50eXBlIFNpZ25pbkNyZWRlbnRpYWxzVHlwZSA9IHtcbiAgICBlbWFpbDogU3RyaW5nLFxuICAgIHBhc3N3b3JkOiBTdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgLy8gbWFrZXMgc3luYyB1cGRhdGVzIHRvIHN0b3JlXG4gICAgZ2VuZXJpY1N0b3JlVXBkYXRlOiAoeyBhY3Rpb25zIH0pID0+ICh7XG4gICAgICAgIHR5cGU6ICdzdG9yZScsXG4gICAgICAgIGFjdGlvbnNcbiAgICB9KSxcblxuICAgIC8vIG1ha2VzIGFzeW5jIHVwZGF0ZXMgZnJvbSBhcGkgZW5kcG9pbnRzXG4gICAgZ2VuZXJpY0FwaVVwZGF0ZTogKHtcbiAgICAgICAgc2VydmljZU9wdGlvbnMsXG4gICAgICAgIGJlZm9yZUFjdGlvbnMsXG4gICAgICAgIHN1Y2Nlc3NBY3Rpb25zLFxuICAgICAgICBmYWlsdXJlQWN0aW9ucyxcbiAgICAgICAgYWZ0ZXJBY3Rpb25zLFxuICAgIH0pID0+ICh7XG4gICAgICAgIHR5cGU6ICdhcGknLFxuICAgICAgICBzZXJ2aWNlT3B0aW9ucyxcbiAgICAgICAgYmVmb3JlQWN0aW9ucyxcbiAgICAgICAgc3VjY2Vzc0FjdGlvbnMsXG4gICAgICAgIGZhaWx1cmVBY3Rpb25zLFxuICAgICAgICBhZnRlckFjdGlvbnMsXG4gICAgfSksXG5cbiAgICAvLyBzaWduLWluIHdpdGggZmlyZWJhc2UgZW1haWwgJiBwYXNzd29yZFxuICAgIGZpcmViYXNlU2lnbkluV2l0aEVtYWlsOiAoeyBlbWFpbCwgcGFzc3dvcmQgfSkgPT4gKHtcbiAgICAgIHR5cGU6ICdmaXJlYmFzZUF1dGgnLFxuICAgIFx0ZGVzY3JpcHRpb246ICdlbWFpbCBhbmQgcGFzc3dvcmQgRmlyZWJhc2UgQXV0aCcsXG4gICAgXHRzZXJ2aWNlT3B0aW9uczoge1xuICAgICAgICAgICAgYXV0aE1ldGhvZDogJ3NpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkJyxcbiAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3NBY3Rpb25zOiB7XG4gICAgICAgICAgICBhZGRVc2VyVG9BdXRoQnJhbmNoOiB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uOiBbJ2F1dGgnLCAndXNlciddLFxuICAgICAgICAgICAgICBvcGVyYXRpb246ICdzZXRJbicsXG4gICAgICAgICAgICAgIHZhbHVlRnVuY3Rpb246ICh7IHJlcyB9KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIGVtYWlsOiByZXMuZW1haWwsXG4gICAgICAgICAgICAgICAgICBpZDogcmVzLnVpZCxcbiAgICAgICAgICAgICAgICAgIHVzZXJOYW1lOiByZXMuZGlzcGxheU5hbWUgfHwgJycsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbHVyZUFjdGlvbnM6IHtcbiAgICAgICAgXHRyZWNvcmRMb2dpbkZhaWx1cmU6IHtcbiAgICAgICAgICAgIGxvY2F0aW9uOiBbJ2FwcFN0YXRlJywgJ2Vycm9yJywgJ2ZpcmViYXNlTG9naW5XaXRoRW1haWwnXSxcbiAgICAgICAgICAgIG9wZXJhdGlvbjogJ3NldEluJyxcbiAgICAgICAgICAgIHZhbHVlRnVuY3Rpb246ICh7IGVycm9yIH0pID0+IHtcbiAgICAgICAgICAgIFx0Y29uc29sZS5sb2coJ2Vycm9yIG9uIGZpcmViYXNlIGxvZ2luJywgZXJyb3IpXG4gICAgICAgICAgICBcdHJldHVybiBlcnJvclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfSksXG5cbiAgICAvLyBmaXJlYmFzZSBsb2dvdXRcbiAgICBmaXJlYmFzZVNpZ25PdXQ6ICgpID0+ICh7XG4gICAgICAgIHR5cGU6ICdmaXJlYmFzZUF1dGgnLFxuICAgIFx0ZGVzY3JpcHRpb246ICdzaWduIG91dCBvZiBGaXJlYmFzZSBBdXRoJyxcbiAgICBcdHNlcnZpY2VPcHRpb25zOiB7IGF1dGhNZXRob2Q6ICdzaWduT3V0JyB9LFxuICAgIFx0c3VjY2Vzc0FjdGlvbnM6IHtcbiAgICBcdFx0cmVtb3ZlVXNlckZyb21BdXRoQnJhbmNoOiB7XG4gICAgXHRcdFx0bG9jYXRpb246IFsnYXV0aCcsICd1c2VyJ10sXG4gICAgXHRcdFx0b3BlcmF0aW9uOiAnc2V0SW4nLFxuICAgIFx0XHRcdHZhbHVlOiB7fSxcbiAgICBcdFx0fSxcbiAgICBcdH0sXG4gICAgfSksXG5cbiAgICAvLyBmaXJlc3RvcmUgY3J1ZFxuICAgIGdlbmVyaWNGaXJlc3RvcmVVcGRhdGU6ICh7XG4gICAgICAgIHNlcnZpY2VPcHRpb25zLFxuICAgICAgICBiZWZvcmVBY3Rpb25zLFxuICAgICAgICBzdWNjZXNzQWN0aW9ucyxcbiAgICAgICAgZmFpbHVyZUFjdGlvbnMsXG4gICAgICAgIGFmdGVyQWN0aW9ucyxcbiAgICB9KSA9PiAoe1xuICAgICAgICB0eXBlOiAnZmlyZXN0b3JlJyxcbiAgICAgICAgc2VydmljZU9wdGlvbnMsXG4gICAgICAgIGJlZm9yZUFjdGlvbnMsXG4gICAgICAgIHN1Y2Nlc3NBY3Rpb25zLFxuICAgICAgICBmYWlsdXJlQWN0aW9ucyxcbiAgICAgICAgYWZ0ZXJBY3Rpb25zLFxuICAgIH0pLFxuXG59XG4iXX0=