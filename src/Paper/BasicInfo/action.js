import request from 'superagent'

export const addPaper = (paper) => {
	return dispatch => {
		return request.post(`/api/paper`)
			.send(paper)
			.end((err, res) => {
				console.log(res, '!!!!!!!!!!!!')
				if(res.statusCode === 201) {
					alert('保存成功')
				}
			})
	}
	// return {
	// 	type: 'ADD_PAGE',
	// 	paper
	// }
}