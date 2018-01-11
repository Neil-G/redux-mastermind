const testData = require('./testData')
const createMastermind = require('./../lib/').createMastermind
const test = require('tape');
const tapSpec = require('tap-spec');
const helpers = require('./../lib/').helpers

// test options
const options = { test: true }

test('helpers', function(t) {
	const dataObject = {
		1: {
			name: 'Neil'
		},
		2: {
			name: 'Bob'
		}
	}

	const arrayFromObject = helpers.objectToArray(dataObject)

	t.deepEqual(
		arrayFromObject,
		[{id: '1', name: 'Neil'}, {id: '2', name: 'Bob'}],
		'helper objectToArray works correctly with defaults'
	)

	const objectFromArray = helpers.arrayToObject(arrayFromObject)

	t.deepEqual(
		objectFromArray,
		{ 1: {id: '1', name: 'Neil'}, 2: {id: '2', name: 'Bob'} },
		'helper arrayToObject works correctly with defaults'
	)

	t.end()

})

test('todo example: quickstart and built-in functionality', function (t) {

    // create mastermind
	const mastermind = createMastermind({ options })

    // check default store state
    t.deepEqual(
        mastermind.getState().appState.toJS(),
        { isFetching: {}, errors: {}, modals: {} },
        'appState branch default is correct'
    )

    t.deepEqual(
        mastermind.getState().auth.toJS(),
        { user: {} },
        'auth branch default is correct'
    )

    t.deepEqual(
        mastermind.getState().data.toJS(),
        {},
        'data branch default is correct'
    )

    // test synchronous crud using built-ins

    // create
    mastermind.update('genericStoreUpdate', {
        actions: {
            createTodo: {
                location: [ 'data', 'todos', '1' ],
                // operation: 'setIn',
                value: { title: 'test', complete: false }
            }
        }
    })

    t.deepEqual(
        mastermind.getState().data.toJS(),
        { todos: { '1': { title: 'test', complete: false }}},
        'genericStoreUpdate and default setIn operation work properly'
    )

    // update
    mastermind.update('genericStoreUpdate', {
        actions: {
            updateTodo: {
                location: [ 'data', 'todos', '1' ],
                operation: 'updateIn',
                updateFunction: ({}, value) => {
                    return value.set('complete', true)
                }
            }
        }
    })

    t.deepEqual(
        mastermind.getState().data.toJS(),
        { todos: { '1': { title: 'test', complete: true }}},
        'updateIn works properly'
    )

    // delete
    mastermind.update('genericStoreUpdate', {
        actions: {
            updateTodo: {
                location: [ 'data', 'todos', '1' ],
                operation: 'deleteIn',
            }
        }
    })

    t.deepEqual(
        mastermind.getState().data.toJS(),
        { todos: {}},
        'deleteIn works properly'
    )


    t.end()
});

test('todo example: custom storeState and updateSchemaCreators', function (t) {

    const { initialStoreState, updateSchemaCreators } = testData

    // create mastermind
	const mastermind = createMastermind({ options, initialStoreState, updateSchemaCreators })

    t.deepEqual(
        mastermind.getState().todos.toJS(),
        {},
        'custom store branch created successfully'
    )

    t.deepEqual(
        mastermind.getState().appState.toJS(),
        { isFetching: {}, errors: {}, modals: {} },
        'store default branches default is correct'
    )

    // test async crud using built-ins

    // create
    mastermind.update('createTodo', { title: 'test', complete: false })

    t.deepEqual(
        mastermind.getState().todos.toJS(),
        { '1': { title: 'test', complete: false }},
        'create custom updateSchemaCreator, valueFunction, and locationFunction work properly'
    )

    // update
    mastermind.update('updateTodoStatus', { id: '1', isComplete: true })

    t.deepEqual(
        mastermind.getState().todos.toJS(),
        { '1': { title: 'test', complete: true }},
        'custom updateIn works properly'
    )

    // delete
    mastermind.update('deleteTodo', '1')

    t.deepEqual(
        mastermind.getState().todos.toJS(),
        { },
        'custom deleteIn works properly'
    )

    t.end()
})

test('firebase auth and firestore crud', function(t) {

    const { firebaseConfig } = testData

    const mastermind = createMastermind({ options, firebaseConfig })

    // signin
    return mastermind.update('firebaseSignInWithEmail', { email: 'test@test.com', password: 'password123' })
        .then(() => {
            t.deepEqual(
                mastermind.getState().auth.toJS(),
                {
                    user: {
                        id: 'BamJ5PEFYIObSimAUmQ05116jvQ2',
                        email: 'test@test.com',
                        userName: ''
                    }
                },
                'firebase config initializes firebase object and built-in firebaseSignInWithEmail updateSchemaCreator adds user information to auth.user'
            )

            // signout
            return mastermind.update('firebaseSignOut')
        })
        .then(() => {
            t.deepEqual(
                mastermind.getState().auth.toJS(),
                { user: {} },
                'firebase logout works and removes content from auth.user'
            )

            // firestore add
            return mastermind.update('genericFirestoreUpdate', {
                serviceOptions: {
                    refType: 'collection',
                    refArray: ['todos'],
                    operation: 'add',
                    args: { title: 'test', complete: false }
                },
                successActions: {
                    addTodoToStore: {
                        locationFunction: ({ res }) => {
                            return ['data', 'todos', res.id]
                        },
                        // operation: 'setIn',
                        valueFunction: ({ res }) => {
                            return { id: res.id, title: 'test', complete: false }
                        }
                    }
                }
            })
        })
        .then((res) => {
            t.deepEqual(
                mastermind.getState().data.toJS().todos[res.id],
                { id: res.id, title: 'test', complete: false },
                'firestore add operation adds data to db and updates store properly'
            )

            // firestore set
            return mastermind.update('genericFirestoreUpdate', {
                serviceOptions: {
                    refType: 'doc',
                    refArray: ['todos', '1'],
                    operation: 'set',
                    args: { title: 'test', complete: false }
                },
            })
        })
        .then(() => {
            t.ok(true, 'firestore set operation updates db properly')

            // firestore update
            return mastermind.update('genericFirestoreUpdate', {
                serviceOptions: {
                    refType: 'doc',
                    refArray: ['todos', '1'],
                    operation: 'update',
                    args: { complete: true }
                },
            })
        })
        .then(() => {
            t.ok(true, 'firestore update operation updates db properly')

            // firestore get
            return mastermind.update('genericFirestoreUpdate', {
                serviceOptions: {
                    refType: 'doc',
                    refArray: ['todos', '1'],
                    operation: 'get',
                },
                successActions: {
                    addTodoToStore: {
                        location: ['data', 'todos', '1'],
                        operation: 'setIn',
                        valueFunction: ({ res }) => {
                            return res.data()
                        }
                    }
                }
            })

        })
        .then((res) => {
            t.deepEqual(
                mastermind.getState().data.toJS().todos['1'],
                { title: 'test', complete: true },
                'firestore get operation fetches (doc) data properly'
            )

            // firestore delete
            return mastermind.update('genericFirestoreUpdate', {
                serviceOptions: {
                    refType: 'doc',
                    refArray: ['todos', '1'],
                    operation: 'delete',
                },
            })
        })
        .then(() => {
            t.ok(true, 'firestore delete operation updates db properly')
            t.end()
            process.exit()
        })

})
