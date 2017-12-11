module.exports = {
	initialStoreState: {
		todos: {},
	},
	updateSchemaCreators: {
		createTodo: function (todo) {
			return {
				type: 'store',
				actions: {
					addTodoToTodos: {
						locationFunction: function ({}) {
							return ['todos', '1']
						},
						operation: 'setIn',
						valueFunction: function ({}) {
							return todo
						}
					}
				}
			}
		},
		updateTodoStatus: function ({id, isComplete}) {
			return {
				type: 'store',
				actions: {
					updateTodo: {
						location: [ 'todos', id ],
						operation: 'updateIn',
						updateFunction: ({}, value) => {
							return value.set('complete', isComplete)
						}
					}
				}
			}
		},
		deleteTodo: function(id) {
			return {
				type: 'store',
				actions: {
					deleteTodo: {
						branch: 'testBranch_1',
						location: ['todos', id],
						operation: 'deleteIn'
					}
				}
			}
		},
	},
	firebaseConfig: {
		apiKey: "AIzaSyB9rUgwJWLmZ5MvaBhDG_1sXZNwuMsd5xw",
	    authDomain: "redux-mastermind-testing.firebaseapp.com",
	    databaseURL: "https://redux-mastermind-testing.firebaseio.com",
	    projectId: "redux-mastermind-testing",
	    storageBucket: "redux-mastermind-testing.appspot.com",
	    messagingSenderId: "294164823819"
	}
}
