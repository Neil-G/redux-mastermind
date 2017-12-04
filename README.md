# Redux-Mastermind
Clean State Management for Your Redux Store

## Installation

```bash
npm i --save redux-mastermind
```

## Quickstart

### Set Your Store Structure and  Initial State 

```javascript

import { combineReducers, createStore } from 'redux'
import { configureReducers, createMastermind } from 'redux-mastermind'


// make a reducer configuration object
// aka the default state of the redux store

const reducersConfig = {
	todos: {},
	user: { name: 'Neil' }
}


// NEW: configure your reducers using redux-mastermind
let reducers = configureReducers(reducersConfig)


// you can add other branches here, same as usual
// reducers.branchName = (state, action) => { ... }


// combine the reducers, same as usual 
const combinedReducer = combineReducers(configuredReducers)


// create the store, same as usual
const store = createStore(combinedReducer)


// NEW: create a mastermind!
const mastermind = createMastermind({ store })


// create a new todo to add to the store

const newTodo = {
	id: 'randomId',
	title: 'Buy Supplies',
	body: 'Buy pencils and notebooks for school',
	complete: 'false'
}


// let mastermind use genericStoreUpdate, a built-in updateSchemaCreator, 
// to update the store with the new todo

mastermind.update('genericStoreUpdate', { 
	actions: {
		createTodo: {
			branch: 'todos',
			location: ['data', 'randomId'],
			operation: 'setIn',
			value: newTodo
		}
	}
})


console.log(store.getState())

// output to the console:
//	{
//		todos: {
//			data: {
//				randomId: {
//					id: randomId,
//					title: 'Buy Supplies',
//					body: 'Buy pencils and notebooks for school'
//				}
//				
//			}
//		},
//		user: { name: 'Neil' }
//	}
```


That's all you need to get started, and to go quite a long way even,
but you can find out more at the [Redux Mastermind website](https://redux-mastermind.firebaseapp.com/)



## Usage

Continuing with the todo example, let's go over a couple common operations

### updating

Let's update the todo to being completed.  There are two ways to make updates, and using either will depend on the nature of the update and user preference.


Method 1. using ```operation: 'setIn'``` 

```javascript
mastermind.update('genericStoreUpdate', { 
	actions: {
		completeTodo: {
			branch: 'todos',
			location: ['data', 'randomId', 'complete'],
			operation: 'setIn',
			value: true
		}
	}
})
```


Method 2. using ```operation: 'updateIn'```

```javascript
mastermind.update('genericStoreUpdate', { 
	actions: {
		completeTodo: {
			branch: 'todos',
			location: ['data', 'randomId'],
			operation: 'updateIn',
			updateFunction: ({ fromJS }, value) => {
				let todo = value.toJS()
				todo.complete = true
				return fromJS(todo)
				// also vaild without converting to JS:
				// const todo = value
				// return todo.setIn(['complete'], true)
			}
		}
	}
})
```

The above are equivalent. The first updates by resetting a value, while the second modifies an existing value.  Some things to note are:
1. the operation ```updateIn``` uses ```updateFunction```.
2. ```updateFunction``` takes 2 arguments. The first is an object, from which you can use ```fromJS``` (and api responses and errors). The second argument is the value found at the branch location. 
3. If you are not comfortable or familiar working with Immutable objects, the first thing you should do is turn value into a js object using ```.toJS()```, and the last thing you should do is turn it back into an Immutable object using ```fromJS```.  (If you can just use immutable, the api is really simple and basically the same api that the actions themselves use, ie ```setIn```, ```updateIn```, ```deleteIn```).


## deleting

Let's delete our todo.  To do this you must use ```operation: 'deleteIn'``` and give the location of the element to be deleted.

```javascript

mastermind.update('genericStoreUpdate', { 
	actions: {
		deleteTodo: {
			branch: 'todos',
			location: ['data', 'randomId'],
			operation: 'deleteIn',
		}
	}
})

```

99% of the time, operation will equale either setIn, updateIn, deleteIn. They all require a location, but some main differences are:
1. ```setIn``` requires a ```value``` or ```valueFunction``` key in your action
2. ```updateIn``` requires an ```updateFunction``` key in your action
3. ```deleteIn``` only requires a ```location```


### Api calls

Along with ```genericStoreUpdate```, the mastermind also comes with a ```genericApiUpdate``` updateSchemaCreator, which can be used for updates involving api calls.  This works similarly enough to ```genericStoreUpdate```, but the returned updateSchema has different keys. Let's create a todo in our remote database.

```javascript

mastermind.update('genericApiUpdate', { 

	// these actions run before the api call is made
	// you can do things like alert the ui of fetching states
	beforeActions: {
		alertFetchingStart: {
			branch: 'todos',
			location: ['isFetching'],
			operation: 'setIn',
			value: true
		}
	},

	// serviceOptions contains axios parameters, and holds all information needed for network communication
	serviceOptions: {
		url: '/api/v1/todo/create',
		method: 'POST'
		data: { userId: 'YOUR_USER_ID', todo: newTodo }
	},

	// successActions run on successful api call  
	// The user will have access to the server response in locationFunction, valueFunction, and updateFunction
	successActions: {
		addTodoToStore: {
			branch: 'todos',
			locationFunction: ({ res }) => {
				const todoId = res.data.todo.id
				return ['data', todoId]
			},
			operation: 'setIn',
			valueFunction: ({ res }) => {
				const todo = res.data.todo
				return todo
			}
		}
	},

	// failureActions run when any error is thrown. 
	// Similar to the response, the user will have access to the error
	failureActions: {
		recordFailure: {
			branch: 'todos',
			location: ['errors', 'loadingNewTodo'],
			operation: 'setIn',
			valueFunction: ({ error }) => {
				return error
			}
		}
	},

	// afterActions run no matter what, after all other actions
	afterActions: {
		alertFetchEnd: {
			branch: 'todos',
			location: ['isFetching'],
			operation: 'setIn',
			value: false
		}
	}
})
```

The actionGroups beforeActions, successActions, failureActions, and afterActions all contain actions, with the only difference being that their actions are dispatched under different conditions/at different times

### updateSchemaCreators

Although mastermind comes with built-in updateSchemaCreators, optimal use of the package requires the user to create his/her own updateSchemaCreators.  To do this, let's go over 
1. What an updateSchemaCreator is 
2. How to add them to the mastermind

Let's revisit the todo example, this time updating our todo on the remote server, but *not* using the built-in genericApiUpdate.  Let's make an ```updateSchemaCreators.js``` file for our custom updateSchemaCreators.

```updateSchemaCreators.js```

```javascript

export default {
	editTodo: function(updatedTodo) {
		return {
			type: 'api', // required
			beforeActions: {
				alertFetchingStart: {
					branch: 'todos',
					location: ['isFetching'],
					operation: 'setIn',
					value: true
				}
			},
			serviceOptions: {
				url: `/api/v1/todo/${todo.id}/edit`,
				method: 'POST'
				data: { todo: updatedTodo }
			},
			successActions: {
				updateTodoToStore: {
					branch: 'todos',
					locationFunction: ({ res }) => {
						const todoId = res.data.todo.id
						return ['data', todoId]
					},
					operation: 'setIn',
					valueFunction: ({ res }) => {
						const todo = res.data.todo
						return todo
					}
				}
			},
			failureActions: {
				recordFailure: {
					branch: 'todos',
					location: ['errors', 'updatingTodo'],
					operation: 'setIn',
					valueFunction: ({ error }) => {
						return error
					}
				}
			},
			afterActions: {
				alertFetchEnd: {
					branch: 'todos',
					location: ['isFetching'],
					operation: 'setIn',
					value: false
				}
			}
		}
	}
}
```

Our editTodo ```updateSchemaCreator``` looks very similar to the object in our create todo example  (we're essentially recreating a new todo on update).  This is because the built-in ```updateSchemCreators``` require all the arguments for an ```updateSchemaCreator``` from the mastermind. Now that we have some (well, one at which can now use it natively. Let's revisit our first snippet of code when we created the mastermind since updateSchemaCreators are given to the mastermind when it is created. This code would look the same as before except except for two altered lines.


```javascript

...

// import the updateSchemaCreators object
import updateSchemaCreators from './path/to/updateSchemaCreators'

...

// create the mastermind, this time adding updateSchemaCreators as a second argument 
const mastermind = createMastermind({ store, updateSchemaCreators })

...

```

Now that we've registered our updateSchemaCreator with the mastermind, here is how we would use it natively to update a todo:


```javascript

const updatedTodo = {
	id: 'randomId',
	title: 'Buy Supplies',
	body: 'Buy pencils and notebooks for school',
	complete: 'true'
} 

mastermind.update('updateTodo', updatedTodo)

```

That's it! The mastermind can use the names of custom updateSchemaCreators as the first argument (required), and the updateSchemaCreator's arguments as the second argument (optional).  Also updateSchemaCreators must have a type.  This is a string enum that will 'store' or 'api' 99% of the time, unless your application heavily uses some other network service such as firebase or websockets. You still have access to the built-in updateSchemaCreators, but you really should make a library of your own custom updateSchemaCreators.  It is similary a good idea to abstract actions, especially the ones used over and over again.


### multiple API calls

The mastermind update function returns a Promise, and this Promise gives you access to the response from an api call, if the update is asynchronous. You can chain updates together both to avoid race conditions and to use the response from one api call in arguments for another update.

Here's an example of a user logging into a todo app, and then fetching his/her todos in a second update requiring a second api call.

```javascript

mastermind.update('login', { email, password })
	.then((res) => {
		const userId = res.data.user.id
		mastermind.update('fetchUserTodos', userId)
	})

``` 










