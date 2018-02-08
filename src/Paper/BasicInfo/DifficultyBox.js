import React from 'react';
import InputNumber from 'antd/lib/input-number'

const MAP_DIFFICULTY = [
	{type: "easy", label: "简单"},
	{type: "normal", label: "一般"},
	{type: "hard", label: "困难"}
]

const renderDifficulty = (getFieldDecorator, disabled) => {
	return MAP_DIFFICULTY.map((item, i) => {
		return getFieldDecorator(item.type)(
				<span span={8} key={i}>
							<label>{item.label}</label>
							<InputNumber disabled={disabled} min={0}/>
			</span>
			)
	})
}

const DifficultyBox = ({getFieldDecorator, disabled}) => {
	return (<div>
		{renderDifficulty(getFieldDecorator, disabled)}
	</div>)
}

export default DifficultyBox