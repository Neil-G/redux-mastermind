const testData = require('./testData')
const configureReducers = require('./../lib/').configureReducers
const createMastermind = require('./../lib/').createMastermind
const createStore = require('redux').createStore
const combineReducers = require('redux').combineReducers
var test = require('tape');
var tapSpec = require('tap-spec');
const I = require('immutable')

test('quick start test', function (t) {
    t.plan(8);
    
	t.equal(
		typeof configureReducers, 
		'function', 
		'configureReducers is a function and imports properly'
	)

	t.equal(
		typeof createMastermind, 
		'function', 
		'createMastermind is a function and imports properly'
	)

	let configuredReducers = configureReducers(testData.reducerConfig)

	t.equal(
		typeof configuredReducers.testBranch_1, 
		'function', 
		'configureReducers takes an objects and creates an object of reducer functions'
	)

	// TODO: test that you can add a reducer branch

	const combinedReducer = combineReducers(configuredReducers)

	const store = createStore(combinedReducer)

	// check that store branches are immutable
	t.ok( I.Map.isMap(store.getState().testBranch_1) )

	t.deepEqual(
		store.getState().testBranch_1.toJS(),
		{},
		'configuredReducers sets the default store state from given config' 
	)

	t.deepEqual(
		store.getState().testBranch_2.toJS(),
		{ key: 'value'},
		'configuredReducers sets the default store state from given config' 
	)

	const mastermind = createMastermind({ store })

	t.equal(
		typeof mastermind,
		'function',
		'createMastermind creates a mastermind function'
	)

	// test mastermind default capabilites
	mastermind('genericStoreUpdate', {
		actions: {
			createTodo: {
				branch: 'testBranch_1',
				location: ['todos', 'randomId'],
				operation: 'setIn',
				value: testData.newTodo

			}
		}
	})


	t.deepEqual(
		store.getState().testBranch_1.toJS(),
		{ todos: { randomId: testData.newTodo }},
		'built-in genericStoreUpdate updateSchemaCreator is initialized with createMastermind and updates the store properly'
	)

	// TODO: test genericApiUpdate

    
});


test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);




