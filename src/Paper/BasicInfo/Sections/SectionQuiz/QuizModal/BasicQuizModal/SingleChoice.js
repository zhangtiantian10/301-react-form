import React from 'react'
import Radio from 'antd/lib/radio';
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Input from 'antd/lib/input'

const RadioGroup = Radio.Group;

const MAP_RADIOS = ['first', 'second', 'third', 'fourth']

class SingleChoice extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: [],
            answer: ''
        }
    }

    componentDidMount() {
        if (this.props.isModify) {
            this.setState({
                options: this.props.quiz.options,
                answer: this.props.quiz.answer
            })
        }
    }

    changeInputValue(index, e) {
        let {options, answer} = this.state
        if (index === this.state.answer || this.state.answer === this.state.options[index]) {
            answer = e.target.value
        }
        options[index] = e.target.value

        this.setState({
            options,
            answer
        })
    }

    changeAnswer(e) {
        this.setState({
            answer: e.target.value
        })
    }

    render() {

        const {options, answer} = this.state
        return <div style={{paddingTop: '20px'}}>
            <Row>
                <Col offset={1} span={3}>
                    <label>选项</label>
                </Col>
            </Row>
            <Row>
                <Col offset={4} span={10}>
                    <RadioGroup value={answer} onChange={this.changeAnswer.bind(this)}>
                        {MAP_RADIOS.map((m, i) => {
                            return (<Radio key={i} value={options[i] || i} style={{paddingTop: '10px'}}>
                                <Input placeholder="选项描述" value={options[i]} onChange={this.changeInputValue.bind(this, i)}/>
                            </Radio>)
                        })}
                    </RadioGroup>
                </Col>
            </Row>
        </div>
    }
}

export default SingleChoice