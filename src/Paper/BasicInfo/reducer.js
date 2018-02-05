export default (state={papers: []}, action) => {
	switch (action.type) {
		case 'ADD_PAGE':
			const papers = state.papers
			papers.push(action.paper)

			return {
				papers: [...papers]
			}
		default:
			return state
	}
}