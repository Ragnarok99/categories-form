import * as types from "../constants/types";
import uuid from "uuid";
import _ from "lodash";

const INITIAL_STATE = {
  attributes: []
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
        attributes: state.attributes.concat({
          ...action.attribute,
          id: uuid.v4()
        })
      };

    case types.DELETE_ATTRIBUTE:
      return {
        ...state,
        attributes: state.attributes.filter(
          attribute => attribute.id !== action.id
        )
      };

    default:
      return state;
  }
}
