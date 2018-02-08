import {MAP_RADIOS} from '../../../constant'

let count = 1
export default (state = [], action) => {
	switch (action.type) {
		case 'ADD_SECTION':
			const radio = MAP_RADIOS.find(m => m.type === action.sectionType)
			state.push({
				sectionType: action.sectionType,
				title: radio.text,
				definition: {quizzes: []},
				id: count
			})

			count ++

			return [...state]

		case 'DELETE_SECTION':
			const section = state.find(s => s.id === action.sectionId)
			const index = state.indexOf(section)

			state.splice(index, 1)

			return [...state]

		case 'MODIFY_SECTION_TITLE':
			const modifySection = state.find(s => s.id === action.id)
			modifySection.title = action.title

			return [...state]
		case 'ADD_QUIZ_TO_SECTION':
			const addQuizeSection = state.find(s => s.id === action.id)
			const quizzes = addQuizeSection.definition.quizzes
			action.quizzes.forEach(quizId => {
				if (!quizzes.includes(quizId)) {
					quizzes.push(quizId)
				}
			})
			addQuizeSection.definition.quizzes = [...quizzes]
			return [...state]
		case 'DELETE_QUIZ':
			const deleteQuizSection = state.find(s => s.id === action.sectionId)
			const deleteQuizzes = deleteQuizSection.definition.quizzes
			const quizIndex = deleteQuizzes.indexOf(action.id)
            deleteQuizzes.splice(quizIndex, 1)

            deleteQuizSection.definition.quizzes = [...deleteQuizzes]
			return [...state]
		case 'MODIFY_QUIZ_TO_SECTION':
			const homeworkQuiz = state.find(s => s.id === action.sectionId)
			const deleteIndex = homeworkQuiz.definition.quizzes.indexOf(action.quiz.oldId)
			homeworkQuiz.definition.quizzes[deleteIndex] = action.quiz.id

            return [...state]
		default:
			return state
	}
}