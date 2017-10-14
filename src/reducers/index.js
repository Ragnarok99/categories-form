import { combineReducers } from 'redux';
import formAttribute from './form_reducer';
import  {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer,  
  formAttribute
});

export default rootReducer;
