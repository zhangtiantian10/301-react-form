const initState = {
	homeworkQuiz: [],
	basicQuiz: [],
	subjective: [],
	isModifySuccess: false,
	isSaveSuccess: false,
}
export default (state = initState, action) => {
	switch (action.type) {
		case 'GET_QUIZ_INFO':
			const getQuiz = state[action.quizType]
			return Object.assign({}, state, {quizInfo: getQuiz.items.find(item => item.id === action.id)})
		case 'MODIFY_QUIZ_SUCCESS':
            return Object.assign({}, state, {isModifySuccess: true})
		case 'GET_SECTION_QUIZ_SUCCESS':
			state[action.sectionType] = action.quizzes.map(quiz => Object.assign({}, quiz, {id: quiz._id}))

			return Object.assign({}, state, {isModifySuccess: false, isSaveSuccess: false})
		case 'GET_HOMEWORK_QUIZ_SUCCESS':
			return Object.assign({}, state, {homeworkQuiz: action.homeworkQuiz.map(quiz => Object.assign({}, quiz, {id: quiz._id}))})
		case 'SAVE_QUIZ_SUCCESS':
			return Object.assign({}, state, {isSaveSuccess: true})
		default:
			return state
	}
}