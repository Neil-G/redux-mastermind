/***
	Selling Points
******************/




/*
Easy Set Up
***********/

import reduxMastermind from 'redux-mastermind'

// make a reducer config, aka the default state of the entire store
const exampleReducConfig = {
	todos: {

	},
	user: {
		name: 'Neil'
	}
}

// give mastermind branches to manage
let reducers = reduxMastermind.configureReducers(reducerConfig)

// add other branches here
// reducers.branchName = (state, action) => { ... }

// combine reducers, same as usual 
const combinedReducer = combineReducers(configuredReducers)


// create your store, same as usual
const store = createStore(combinedReducer)

// create a mastermind!
const mastermind = reduxMastermind.createMastermind({ store })

export default mastermind


import mastermind from './mastermind'

const todo = {
	title: 'Buy Supplies',
	body: 'Buy pencils and notebooks for school'
}

mastermind.('createATodo', { 
	updater: 'store',
	branch: 'todos',
	location: ['data', 'randomId'],
	operation: 'setIn',
	value: todo
})

// your redux store will now be
// {
// 	todos: {
// 		randomId: {
// 			title: 'Buy Supplies',
// 			body: 'Buy pencils and notebooks for school' 
// 		}
// 	},
// 	user: {
// 		name: 'Neil'
// 	}
// }


