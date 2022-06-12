import { combineReducers } from 'redux'
import auth from './auth.js'
import companys from './companys'
import users from './users'

export default combineReducers({auth, companys, users})