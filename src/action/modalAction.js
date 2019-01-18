const MODAL_OPEN = 'MODAL_OPEN'
const MODAL_CLOSE = 'MODAL_CLOSE'


const actionOpenModal = (modalType, modalProps) => {
  return {
    type: MODAL_OPEN,
    payload: {
      modalType,
      modalProps,
    }
  }
}


const actionCloseModal = () => {
  return {
    type: MODAL_CLOSE,
    payload: {}
  }
}


export {
  MODAL_OPEN,
  MODAL_CLOSE,
  actionOpenModal,
  actionCloseModal,
}
