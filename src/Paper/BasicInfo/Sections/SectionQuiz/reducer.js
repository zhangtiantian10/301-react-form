const initState = {
	homeworkQuiz: {
		items: [
			{
				id: 1,
				title: "react",
				stack: "Javascript",
			},
			{
				id: 2,
				title: "jersey",
				stack: "Java+Gradle",
			},
            {
                id: 3,
                title: "jersey1",
                stack: "Java+Gradle",
            }
		],
		totalCount: 4
	},
	basicQuiz: {
		items: [],
		totalCount: 1
	},
	subjective: {
		items: [],
		totalCount: 1
	}
}
export default (state = initState, action) => {
	switch (action.type) {
		case 'GET_ALL_QUIZZES':
			return Object.assign({}, state, {})
		case 'SAVE_QUIZ':
            const quiz = state[action.sectionType]
            action.quiz = Object.assign({}, action.quiz, {id: quiz.totalCount})
            quiz.totalCount ++
            quiz.items.push(action.quiz)
			if (action.sectionType === 'subjective') {
                return Object.assign({}, state, {subjective: quiz})
            } else {
            	return Object.assign({}, state, {basicQuiz: quiz})
			}
		case 'GET_QUIZ_INFO':
			const getQuiz = state[action.quizType]
			return Object.assign({}, state, {quizInfo: getQuiz.items.find(item => item.id === action.id)})
		case 'MODIFY_QUIZ':
			const modifyQuiz = state[action.sectionType]
			let items = modifyQuiz.items
			let item = items.find(quiz => quiz.id === action.quiz.id)
			const i = items.indexOf(item)
			items[i] = action.quiz

			modifyQuiz.items = [...items]

			if (action.sectionType === 'subjective') {
				const newState = Object.assign({}, state, {subjective: modifyQuiz})
                return newState
            } else {
                const newState = Object.assign({}, state, {basicQuiz: modifyQuiz})
                return newState
            }
		default:
			return state
	}
}