import { MODAL_SET_VISIBLE } from '../reduxTypes';

export function setModalVisible(visible = true) {
  return { type: MODAL_SET_VISIBLE, payload: visible };
}
