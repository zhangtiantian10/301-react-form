import React from 'react';
import {connect} from 'react-redux'

import Layout from 'antd/lib/layout'
import BasicInfo from "./BasicInfo";

const { Header, Content, Footer } = Layout
class Paper extends React.Component {

	render() {
		return (
			<div>
				<Layout>
					<Header style={{color: '#fff'}}>
						<p>新增试卷</p>
					</Header>
					<Content>
						<BasicInfo/>
					</Content>
				</Layout>
			</div>
		)
	}
}

export default connect()(Paper);