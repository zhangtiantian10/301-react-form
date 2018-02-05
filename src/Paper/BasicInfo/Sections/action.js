export const addSection = (sectionType) => {
	return {
		type: 'ADD_SECTION',
		sectionType
	}
}

export const deleteSection = (sectionId) => {
	return {
		type: 'DELETE_SECTION',
		sectionId
	}
}

export const modifySectionTitle = (id, title) => {
	return {
		type: 'MODIFY_SECTION_TITLE',
		id,
		title
	}
}