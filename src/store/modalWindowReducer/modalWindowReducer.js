import { MODAL_SET_VISIBLE } from '../reduxTypes';

const initialState = {
  modalVisible: false,
};

export const modalWindowReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_SET_VISIBLE:
      return { ...state, modalVisible: action.payload };
    default:
      return state;
  }
};
