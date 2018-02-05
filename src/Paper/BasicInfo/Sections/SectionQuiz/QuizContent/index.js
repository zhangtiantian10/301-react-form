import React from 'react'
import Tag from 'antd/lib/tag';
import Icon from 'antd/lib/icon'

const MAP_BASIC_QUIZ_TYPE = {
    blankQuiz: '填空题',
    singleChoice: '单选题',
    multipleChoice: '多选题'
}

class QuizContent extends React.Component{
    deleteQuiz() {
        this.props.deleteQuiz(this.props.quiz.id)
    }

    modifyQuiz() {
        this.props.modifyQuizStatus(this.props.quiz)
    }

	render() {
		const {quiz, quizType} = this.props
        const isHomeworkQuiz = quizType === 'homeworkQuiz';
        const isSubjective = quizType === 'subjective';

        const tag = isHomeworkQuiz ? quiz.stack : (isSubjective ? '主观题': MAP_BASIC_QUIZ_TYPE[quiz.basicType])

        return (<div style={{border: "1px solid #eee", height: "150px", margin: "0 10px", textAlign: "center"}}>
            <div style={{
                borderBottom: "1px solid #eee",
                textAlign: "center",
                padding: '5px 0px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
            }}>
                <label>{quiz.title}</label>
            </div>
            <Tag style={{marginTop: '20px'}}>{tag}</Tag>
            <div style={{marginTop: '40px', textAlign: 'right', paddingRight: '10px'}}>
                <Icon type="setting" onClick={this.modifyQuiz.bind(this)} style={{fontSize: '20px'}}/>
                <Icon type="delete" onClick={this.deleteQuiz.bind(this)} style={{fontSize: '20px'}}/>
            </div>
        </div>);
	}
}

export default QuizContent