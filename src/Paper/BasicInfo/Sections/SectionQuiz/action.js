export const addHomeworkQuizToSection = (quizzes, id) => {
	return {
		type: 'ADD_QUIZ_TO_SECTION',
		quizzes,
		id
	}
}

export const saveQuiz = (quiz, sectionType) => {
	return {
		type: 'SAVE_QUIZ',
		quiz,
		sectionType
	}
}

export const deleteQuiz = (id, sectionId) => {
	return {
		type: 'DELETE_QUIZ',
		id,
		sectionId
	}
}

export const modifyQuiz = (quiz, sectionType) => {
	return {
		type: 'MODIFY_QUIZ',
		quiz,
		sectionType
	}
}

export const modifyQuizToSection = (quiz, sectionId) => {
    return {
        type: 'MODIFY_QUIZ_TO_SECTION',
        quiz,
        sectionId
    }
}