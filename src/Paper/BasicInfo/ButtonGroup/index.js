import React from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'

const ButtonGroup = () => {
	return(<Row style={{marginTop: "30px", textAlign: "center"}}>
		<Col offset={8} span={4}>
			<Button type="primary" htmlType="submit">保存</Button>
		</Col>
		<Col span={4}>
			<Button type="primary">发布</Button>
		</Col>
	</Row>)
}

export default ButtonGroup