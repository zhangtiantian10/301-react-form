import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Checkout from 'antd/lib/checkbox'

import * as actions from './action'
import Sections from './Sections'
import DifficultyBox from './DifficultyBox'
import ButtonGroup from './ButtonGroup'

const FormItem = Form.Item;
const { TextArea } = Input;

const PAGE_NAME_LENGTH_MAX = 32;
const DESCRIPTION_LENGTH_MAX = 256;

class BasicInfo extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			disabled: true
		}
	}

	changeShowHomeworkQuiz() {
		this.setState({
			disabled: !this.state.disabled
		})
	}

	handleSubmit(e) {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const sections = [...this.props.sections];
				const {name, description} = values
				if (values.logicPuzzle) {
					const {easy, normal, hard} = values
					const quiz = {
						type: "logicPuzzle",
						definition: { easy, normal, hard },
						id: sections[sections.length - 1].id + 1
					}
					sections.push(quiz)
				}

				this.props.actions.addPaper({name, description, sections})
			}
		});
	}

	render() {
		const {form} = this.props
		const {getFieldDecorator} = form;

		const formItemLayout = {
			labelCol: {
				xs: {span: 24},
				sm: {span: 8},
			},
			wrapperCol: {
				xs: {span: 16},
				sm: {span: 8},
			},
		};

		const difficultyBoxLayout = {
			wrapperCol: {
				xs: {
					span: 16,
					offset: 24
				},
				sm: {
					span: 8,
					offset: 8
				}
			}
		}
		const {disabled} = this.state

		return (<div>
			<Form style={{marginTop: "30px"}} onSubmit={this.handleSubmit.bind(this)}>
				<FormItem
					{...formItemLayout}
					label="试卷名称"
				>
					{getFieldDecorator('name', {
						rules: [{
							max: PAGE_NAME_LENGTH_MAX,
							message: '试卷名称不能超过32个字符',
						}],
					})(
						<Input/>
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="试卷描述"
				>
					{getFieldDecorator('description', {
						rules: [{
							max: DESCRIPTION_LENGTH_MAX,
							message: '试卷描述不能超过256个字符',
						}],
					})(
						<TextArea/>
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="逻辑题"
				>
					{getFieldDecorator('logicPuzzle')(
						<Checkout onChange={this.changeShowHomeworkQuiz.bind(this)}/>
					)}
				</FormItem>
				<FormItem
					{...difficultyBoxLayout}
				>
					<DifficultyBox getFieldDecorator={getFieldDecorator} disabled={disabled}/>
				</FormItem>
				<FormItem>
					<Sections/>
				</FormItem>
				<FormItem>
					<ButtonGroup/>
				</FormItem>
			</Form>
		</div>)
	}
}

const mapStateToProps = (state) => {
	return {
        sections: state.sections
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(BasicInfo));