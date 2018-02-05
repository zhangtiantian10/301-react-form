import React from 'react'
import Radio from 'antd/lib/radio';
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Input from 'antd/lib/input'

import BlankQuiz from './BlankQuiz'
import MultipleChoice from './MultipleChoice'
import SingleChoice from './SingleChoice'

const RadioGroup = Radio.Group;
const { TextArea } = Input;

const MAP_QUIZ_TYPE = {
    blankQuiz: BlankQuiz,
    singleChoice: SingleChoice,
    multipleChoice: MultipleChoice
}

class BasicQuizModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            basicType: 'blankQuiz',
            title: '',
        }
    }

    componentDidMount() {
        if (this.props.isModify) {
            this.setState({
                title: this.props.quiz.title,
                basicType: this.props.quiz.basicType
            })
        }
    }

    onChange(e) {
        this.setState({
            basicType: e.target.value,
        });
    }

    changeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    render() {

        const {isModify, quiz} = this.props
        const RenderComponent = MAP_QUIZ_TYPE[this.state.basicType]
        return (<div>
            <RadioGroup onChange={this.onChange.bind(this)} value={this.state.basicType}>
                <Radio value="blankQuiz">填空题</Radio>
                <Radio value="singleChoice">单选题</Radio>
                <Radio value="multipleChoice">多选题</Radio>
            </RadioGroup>
            <Row style={{paddingTop: '20px'}}>
                <Col span={3} offset={1}><label>描述</label></Col>
                <Col span={17}><TextArea placeholder="描述" value={this.state.title} onChange={this.changeTitle.bind(this)}/></Col>
            </Row>
            <RenderComponent ref="quiz" isModify={isModify} quiz={quiz}/>
        </div>)
	}
}

export default BasicQuizModal