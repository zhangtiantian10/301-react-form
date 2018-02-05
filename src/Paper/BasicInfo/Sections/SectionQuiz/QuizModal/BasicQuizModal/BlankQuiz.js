import React from 'react'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Input from 'antd/lib/input'

const { TextArea } = Input;

class BlankQuiz extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            answer: ''
        }
    }

    componentDidMount() {
        if (this.props.isModify) {
            this.setState({
                answer: this.props.quiz.answer,
            })
        }
    }

    changeAnswer(e) {
        this.setState({
            answer: e.target.value
        })
    }

    render() {
        return <Row style={{paddingTop: '20px'}}>
            <Col span={3} offset={1}><label>答案</label></Col>
            <Col span={17}><Input placeholder="答案" value={this.state.answer} onChange={this.changeAnswer.bind(this)}/></Col>
        </Row>
    }
}

export default BlankQuiz