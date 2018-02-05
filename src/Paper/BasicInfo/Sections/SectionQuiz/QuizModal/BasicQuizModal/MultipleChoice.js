import React from 'react'
import Checkbox from 'antd/lib/checkbox';
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Input from 'antd/lib/input'

const MAP_CHECKBOXES = ['first', 'second', 'third', 'fourth']

class MultipleChoice extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: [],
            answers: []
        }
    }

    componentDidMount() {
        if (this.props.isModify) {
            this.setState({
                options: this.props.quiz.options,
                answers: this.props.quiz.answers
            })
        }
    }

    changeCheckbox(e) {
        const {answers} = this.state
        const value = e.target.value
        if(answers.includes(value)) {
            const index = answers.indexOf(value)
            answers.splice(index, 1)
        } else {
            answers.push(value)
        }

        this.setState({
            answers
        })
    }

    changeInputValue(index, e) {
        const {options, answers} = this.state
        const value = e.target.value
        if(answers.includes(index) || answers.includes(options[index])) {
            const answerIndex = answers.indexOf(index);
            const i = answerIndex === -1 ?  answers.indexOf(options[index]) : answerIndex
            answers[i] = value
        }
        options[index] = value
        this.setState({
            answers,
            options
        })
    }

    render() {
        const {options, answers} = this.state
        return <div style={{paddingTop: '20px'}}>
            <Row>
                <Col offset={1} span={3}>
                    <label>选项</label>
                </Col>
            </Row>
            <Row>
                <Col offset={4} span={10}>
                    {MAP_CHECKBOXES.map((m, i) => {
                        return <Row style={{paddingTop: '10px'}} key={i}>
                            <Col span={3}>
                                <Checkbox checked={answers.includes(options[i] || i)} value={options[i] || i} onChange={this.changeCheckbox.bind(this)}/>
                            </Col>
                            <Col span={21}><Input placeholder="选项描述" onChange={this.changeInputValue.bind(this, i)} value={options[i]}/></Col>
                        </Row>;
                    })}
                </Col>
            </Row>
        </div>
    }
}

export default MultipleChoice