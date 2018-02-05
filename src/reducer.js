import {combineReducers} from 'redux'
import paperInfo from './Paper/BasicInfo/reducer'
import sections from './Paper/BasicInfo/Sections/reducer'
import sectionQuiz from './Paper/BasicInfo/Sections/SectionQuiz/reducer'

export default combineReducers({
	paperInfo,
	sections,
	sectionQuiz
})