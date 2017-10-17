import * as types from "../constants/types";

export function getData() {
  return {
    type: types.GET_ATTRIBUTES
  };
}

export function saveAttribute(attribute) {
  return {
    type: types.SAVE_ATTRIBUTE,
    attribute
  };
}

export function deleteAttribute(id) {
  return {
    type: types.DELETE_ATTRIBUTE,
    id
  };
}
