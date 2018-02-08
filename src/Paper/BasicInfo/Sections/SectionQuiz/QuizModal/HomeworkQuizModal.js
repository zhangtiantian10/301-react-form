import React from 'react'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Input from 'antd/lib/input'
import Table from 'antd/lib/table'

class HomeworkQuizModal extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedRowKeys: [],
			isChecked: true
		}
	}

	onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys, isChecked: false });
	}

	render () {
		const columns = [{
			title: '题目名称',
			dataIndex: 'title',
			width: '24%',
		}, {
			title: '题目类型',
			dataIndex: 'stack',
			width: '24%',
		}, {
			title: '创建者',
			dataIndex: 'creator',
			width: '24%'
		}, {
			title: '创建时间',
			dataIndex: 'createTime',
			width: '24%'
		}];

		const {quizzes, selectedQuizzes} = this.props
		const {selectedRowKeys, isChecked} = this.state

		const newQuizzes = quizzes.map(quiz => Object.assign({}, quiz, {key: quiz.id}))

		const rowSelection = {
			selectedRowKeys: selectedRowKeys,
			onChange: this.onSelectChange.bind(this),
			hideDefaultSelections: false,
			type: this.props.isModify ? 'radio' : 'checkbox',
			getCheckboxProps: record => {

                return {
					defaultChecked: selectedQuizzes.includes(record.id) && isChecked,
					disabled: selectedQuizzes.includes(record.id)
				}
			}
		};
		return (<div>
			<Row>
				<Col span={2}><label style={{paddingTop: '3px'}}>搜索</label></Col>
				<Col span={12}><Input/></Col>
			</Row>
			<Table rowSelection={rowSelection} columns={columns} dataSource={newQuizzes} pagination={false} scroll={{ y: 240 }}/>
		</div>)
	}
}

export default HomeworkQuizModal