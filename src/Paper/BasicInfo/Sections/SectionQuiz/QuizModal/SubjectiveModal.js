import React from 'react'
import Input from 'antd/lib/input'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

const { TextArea } = Input;

class SubjectiveModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    componentDidMount() {
        if (this.props.isModify) {
            this.setState({
                value: this.props.quiz.title
            })
        }
    }

    changeValue(e) {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        return (<Row>
            <Col span={3} offset={2}><label>描述</label></Col>
            <Col span={17}><TextArea placeholder="描述" value={this.state.value} onChange={this.changeValue.bind(this)}/></Col>
        </Row>)
    }
}

export default SubjectiveModal