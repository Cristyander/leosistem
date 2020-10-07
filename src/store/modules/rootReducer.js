import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/redurcer';

export default combineReducers({
  auth,
  user,
});
