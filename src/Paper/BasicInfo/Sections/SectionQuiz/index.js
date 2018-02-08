import React from 'react'
import {connect} from 'react-redux'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Card from 'antd/lib/card'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import {bindActionCreators} from 'redux'

import * as action from './action'
import QuizModal from './QuizModal'
import QuizContent from './QuizContent'

class SectionQuiz extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: "",
			isEdit: false,
			visible: false,
			selectedHomeWorkQuizzes: [],
			isModify: false,
			currentQuiz: {}
		}
	}

    componentWillReceiveProps(nextProps) {
		if(nextProps.sectionQuiz.isSaveSuccess || nextProps.sectionQuiz.isModifySuccess) {
            this.props.actions.getSectionQuiz(nextProps.section)
        }
	}

	showModal() {
		this.setState({
			visible: true
		})
	}

	closeModal() {
		this.setState({
			visible: false,
            isModify: false,
            currentQuiz: {}
		})
	}

	changeEdit() {
		this.setState({
			isEdit: !this.state.isEdit
		})

		const {section} = this.props

		this.props.modifyTitle(section.id, this.state.title);
	}

	changeInputValue(e) {
		this.setState({
			title: e.target.value
		})
	}

	onDeleteSectionQuiz() {
		this.props.deleteSectionQuiz(this.props.section)
	}

	componentDidMount() {
		console.log('-----------')
		const {title} = this.props.section
		this.setState({title})
		this.props.actions.getHomeworkQuiz()
    }

	onAddHomeworkQuiz(quizzes) {
		this.props.actions.addHomeworkQuizToSection(quizzes, this.props.section.id)
	}

	onDeleteQuiz(id) {
		this.props.actions.deleteQuiz(id, this.props.section)
	}

	modifyQuizStatus(quiz) {
		this.setState({
			isModify: true,
			currentQuiz: quiz,
			visible: true
		})
	}

    modifyQuizInSection(quiz, sectionType) {
		if(sectionType === 'homeworkQuiz') {
			this.props.actions.modifyQuizToSection(quiz, this.props.section.id)
		} else {
            this.props.actions.modifyQuiz(quiz, sectionType)
        }
	}

	render() {
		const {title, isEdit, visible, isModify, currentQuiz} = this.state
		const {section, sectionQuiz} = this.props

		return(<div style={{marginTop: "20px"}}>
			<Card>
				<Row>
					<Col span={3}>
						{isEdit
							? <Input id="inputValue" value={title} onChange={this.changeInputValue.bind(this)}/>
							: <span>{title}</span>}
					</Col>
					<Col span={1} onClick={this.changeEdit.bind(this)}>
						<Icon type="edit" />
					</Col>
					<Col span={1} offset={19} onClick={this.onDeleteSectionQuiz.bind(this)}>
						<img src="https://png.icons8.com/windows/20/000000/waste.png"/>
					</Col>
				</Row>
			</Card>
			<Card>
				<Row>
				{section.definition.quizzes.map((quizId, i) => {
					const quiz = sectionQuiz[section.sectionType].find(item => quizId === item.id);
					return quiz ?
						<Col span={3} key={i}>
							<QuizContent
								quiz={quiz}
								quizType={section.sectionType}
								deleteQuiz={this.onDeleteQuiz.bind(this)}
                                modifyQuizStatus={this.modifyQuizStatus.bind(this)}
							/>
						</Col>
						: null
				})}
				<Col span={3}>
					<Card
						onClick={this.showModal.bind(this)}
						style={{ height: "150px", margin: "0 10px", paddingTop: "10px"}}
						cover={<img src="https://png.icons8.com/android/100/CCCCCC/plus.png"/>}
					/>
				</Col>
				</Row>
			</Card>
			<QuizModal
				visible={visible}
				closeModal={this.closeModal.bind(this)}
				quizzes={sectionQuiz[[section.sectionType]]}
				sectionType={section.sectionType}
				selectedQuizzes={section.definition.quizzes}
				addQuiz={this.onAddHomeworkQuiz.bind(this)}
				saveQuiz={this.props.actions.saveQuiz}
				ref="quizModal"
				isModify={isModify}
				quiz={currentQuiz}
				sectionId={section.id}
				modifyQuiz={this.modifyQuizInSection.bind(this)}
			/>
		</div>)
	}
}

const mapStateToProps = (state) => {
	return {
		sectionQuiz: state.sectionQuiz
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
        actions: bindActionCreators(action, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionQuiz)