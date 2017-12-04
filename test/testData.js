module.exports = {
	reducerConfig: {
		testBranch_1: {},
		testBranch_2: {
			key: 'value'
		}
	},
	newTodo: {
		id: 'randomId',
		title: 'Buy Supplies',
		body: 'Buy pencils and notebooks for school',
		complete: false
	},
	updaateSchemaCreators: {
		deleteTodo: function(todoId) {
			return {
				type: 'store',
				actions: {
					deleteTodo: {
						branch: 'testBranch_1',
						location: ['todos', todoId],
						operation: 'deleteIn'
					}
				}
			}
		}
	}
}