import request from 'superagent'

export const addHomeworkQuizToSection = (quizzes, id) => {
	return {
		type: 'ADD_QUIZ_TO_SECTION',
		quizzes,
		id
	}
}

export const saveQuiz = (quiz, sectionType, sectionId) => {
	let uri = '/api/' + sectionType
	return dispatch => {
		return request.post(uri)
			.send(quiz)
			.end((err, res) => {
                if (res.statusCode === 201) {
                	dispatch(addHomeworkQuizToSection([res.body], sectionId))
                	dispatch({
						type: 'SAVE_QUIZ_SUCCESS'
					})
                }
			})
	}
}

export const deleteQuiz = (id, section) => {
	if (section.sectionType === 'homeworkQuiz') {
        return {
            type: 'DELETE_QUIZ',
            id,
            sectionId: section.id
        }
    } else {
		return dispatch => {
			return request.delete(`/api/${section.sectionType}/${id}`)
				.end((err, res) => {
					dispatch({
                        type: 'DELETE_QUIZ',
                        id,
                        sectionId: section.id
                    })
				})
		}
	}
}

export const modifyQuiz = (quiz, sectionType) => {

	return dispatch => {
		return request.put(`/api/${sectionType}/${quiz.id}`)
			.send(quiz)
			.end((err, res) => {
				console.log(res, '+++++++++++++++++')
				if (res.statusCode === 204) {
                    dispatch({
						type: 'MODIFY_QUIZ_SUCCESS'
                    })
                }
			})
	}
}

export const modifyQuizToSection = (quiz, sectionId) => {
    return {
        type: 'MODIFY_QUIZ_TO_SECTION',
        quiz,
        sectionId
    }
}

export const getSectionQuiz = ({sectionType, definition}) => {
	const uri = `/api/${sectionType}/all/${definition.quizzes.join(',')}`

	return dispatch => {
		return request.get(uri)
			.end((err, res) => {
				if(res.statusCode === 200) {
					dispatch({
						type: 'GET_SECTION_QUIZ_SUCCESS',
						sectionType,
						quizzes: res.body
					})
				}
			})
	}
}

export const getHomeworkQuiz = () => {
	return dispatch => {
		return request.get('/api/homeworkQuiz')
			.end((err, res) => {
				if (res.statusCode === 200) {
					dispatch({
						type: 'GET_HOMEWORK_QUIZ_SUCCESS',
						homeworkQuiz: res.body
					})
				}
			})
	}
}