import * as types from "../constants/types";
import uuid from 'uuid';
import _ from 'lodash';
const INITIAL_STATE = {
  attributes: [
    {id: uuid.v4(), name: "test1", description: "description 1", category: "device_info" },
    {id: uuid.v4(), name: "test2", description: "description 2", category: "device_info" },
    {id: uuid.v4(), name: "test3", description: "description 3", category: "sensors" }
    
  ]
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_ATTRIBUTES:
      return {
        ...state
      };

    case types.SAVE_ATTRIBUTE: 
      return {
        ...state,
        attributes: state.attributes.concat({...action.attribute, id: uuid.v4()})
      }
    
      case types.DELETE_ATTRIBUTE:

      return {
        ...state,
        attributes: state.attributes.filter(attribute => attribute.id !== action.id)
      }

    default:
      return state;
  }
}
