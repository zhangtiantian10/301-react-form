import React from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Card from 'antd/lib/card'
import Radio from 'antd/lib/radio'
import {connect} from 'react-redux'

import SectionQuiz from './SectionQuiz'
import {MAP_RADIOS} from '../../../constant'
import * as action from './action'

const RadioGroup = Radio.Group;

class HomeworkQuiz extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sectionType: MAP_RADIOS[0].type,
		}
	}

	addSectionQuiz() {
		this.props.onAddSection(this.state.sectionType)
	}

	deleteSectionQuiz(section) {
		this.props.onDeleteSection(section.id)
	}

	modifyTitle(id, title) {
		this.props.onModifySectionTitle(id, title)
	}

	onChangeRadio(e) {
		this.setState({
			sectionType: e.target.value,
		});
	}

	render() {
		const {sections} = this.props

		return (<Row>
			<Col span={20} offset={2}>
				{sections.map( section => {
					return (<SectionQuiz
						quizzes={this.state[section.sectionType]}
						key={section.id}
						section={section}
						modifyTitle={this.modifyTitle.bind(this)}
						deleteSectionQuiz={this.deleteSectionQuiz.bind(this)}
					/>)
				})}
				<Card style={{marginTop: "20px"}}>
					<RadioGroup onChange={this.onChangeRadio.bind(this)} value={this.state.sectionType}>
						{MAP_RADIOS.map((radio, index) => {
							return <Radio key={index} value={radio.type}>{radio.text}</Radio>
						})}
					</RadioGroup>
					<div style={{textAlign: "center"}}>
						<img
							src="https://png.icons8.com/android/150/CCCCCC/plus.png"
							onClick={this.addSectionQuiz.bind(this)}/>
					</div>
				</Card>
			</Col>
		</Row>)
	}
}

const mapStateToProps = (state) => {
	return {
		sections: state.sections
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAddSection: (sectionType) => {
			dispatch(action.addSection(sectionType))
		},
		onDeleteSection: (sectionId) => {
			dispatch(action.deleteSection(sectionId))
		},
		onModifySectionTitle: (id, title) => {
			dispatch(action.modifySectionTitle(id, title))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeworkQuiz);