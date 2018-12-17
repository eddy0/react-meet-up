const LOADING_START = 'LOADING_START'
const LOADING_END = 'LOADING_END'


const actionLoadingStart = () => {
  return {
    type: LOADING_START,
    loading: true
  }
}

const actionLoadingEnd = () => {
  return {
    type: LOADING_END,
    loading: false
  }
}


export {
  LOADING_START,
  LOADING_END,
  actionLoadingStart,
  actionLoadingEnd,
}