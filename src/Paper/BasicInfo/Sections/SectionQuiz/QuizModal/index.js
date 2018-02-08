import React from 'react'
import Modal from 'antd/lib/modal'

import HomeworkQuizModal from './HomeworkQuizModal'
import BasicQuizModal from './BasicQuizModal'
import SubjectiveModal from './SubjectiveModal'

const MAP_QUIZ_TYPE = {
	homeworkQuiz: {title: '试题列表', component: HomeworkQuizModal},
	basicQuiz: {title: '新建简单客观题', component: BasicQuizModal},
	subjective: {title: '新建主观题', component: SubjectiveModal}
}

class QuizModal extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			key: 1
		}
	}

    modifyQuiz(quiz, sectionType) {
		this.props.modifyQuiz(quiz, sectionType)
	}

	addQuiz(quiz, sectionType) {
        this.props.saveQuiz(quiz, sectionType, this.props.sectionId)
	}

	onSure() {
		const {isModify, sectionType} = this.props

        const renderComponent = this.refs.renderComponent;
        if(sectionType === 'homeworkQuiz') {
        	isModify ? this.modifyQuiz({id: renderComponent.state.selectedRowKeys[0], oldId: this.props.quiz.id}, sectionType)
				: this.props.addQuiz(renderComponent.state.selectedRowKeys)
        } else if (sectionType === 'subjective'){
			const {value} = renderComponent.state
			isModify ? this.modifyQuiz({title: value, id: this.props.quiz.id}, sectionType)
				: this.addQuiz({title: value}, sectionType)
        } else {
			const {basicType, title} = renderComponent.state
			let quiz = {basicType, title}

            const quizState = renderComponent.refs.quiz.state;
			let options = [];
			let answer = ''
            if(basicType === 'blankQuiz') {
				answer = quizState.answer
			} else if(basicType === 'singleChoice') {
                answer = quizState.answer
                options = quizState.options
			} else {
                answer = quizState.answers.join(',')
                options = quizState.options
			}

            quiz = Object.assign({}, quiz, {answer, options})

            isModify ? this.modifyQuiz(Object.assign({}, quiz, {id: this.props.quiz.id}), sectionType)
				: this.addQuiz(quiz, sectionType)
		}
		this.props.closeModal();
	}

	render() {
		const {visible, closeModal, sectionType, quizzes, selectedQuizzes, quiz, isModify} = this.props

		const displayModal = MAP_QUIZ_TYPE[sectionType]
		const RenderComponent = displayModal.component
		if (visible) {
			this.state.key = parseInt(Math.random() * 10000)
		}
		return (<Modal
			key={this.state.key}
			title={displayModal.title}
			visible={visible}
			onCancel={closeModal}
			okText="确定"
			onOk={this.onSure.bind(this)}
			cancelText="取消"
		>
			<RenderComponent
				selectedQuizzes={selectedQuizzes}
				quizzes={quizzes}
				ref="renderComponent"
				quiz={quiz}
				isModify={isModify}
			/>
		</Modal>)
	}
}

export default QuizModal