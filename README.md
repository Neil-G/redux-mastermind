# Redux-Mastermind
Clean State Management for Your Redux Store

## Installation

```bash
npm i --save redux-mastermind
```

## Quickstart

### Set Your Store Structure and  Initial State 

```javascript

import { configureReducers, createMastermind } from 'redux-mastermind'
import { combineReducers, createStore } from 'redux'


// make a reducer configuration object
// aka the default state of the redux store
const reducerConfig = {
	todos: {},
	user: { name: 'Neil' }
}


// configure your reducers using redux-mastermind
let reducers = configureReducers(reducerConfig)


// you can add other branches here, same as usual
// reducers.branchName = (state, action) => { ... }


// combine reducers, same as usual 
const combinedReducer = combineReducers(configuredReducers)


// create the store, same as usual
const store = createStore(combinedReducer)


// create a mastermind!
const mastermind = createMastermind({ store })


// export the mastermind for use throughout the app
export default mastermind
```

### Update Your Store Using Mastermind

Let's add a todo to our redux store

```javascript
import mastermind from './path/to/mastermind'
import store from './path/to/mastermind'


// create a new todo
const newTodo = {
	id: 'randomId',
	title: 'Buy Supplies',
	body: 'Buy pencils and notebooks for school'
}


// let mastermind use genericStoreUpdate, a built-in updateSchemaCreator, 
// to update the store with the new todo
mastermind('genericStoreUpdate', { 
	branch: 'todos',
	location: ['data', 'randomId'],
	operation: 'setIn',
	value: newTodo
})

console.log(store.getState())
// output to the console:
//	{
//		todos: {
//			randomId: {
//				id: randomId,
//				title: 'Buy Supplies',
//				body: 'Buy pencils and notebooks for school'
//			}
//		},
//		user: { name: 'Neil' }
//	}
```


That's all you need to get started, and to go quite a long way even,
but you can find out more at the [Redux Mastermind website](https://redux-mastermind.firebaseapp.com/)








