const LOADING_START = 'LOADING_START'
type LOADING_START = typeof LOADING_START

const LOADING_END = 'LOADING_END'
type LOADING_END = typeof LOADING_END

const LOADING_ERROR = 'LOADING_ERROR'
type LOADING_ERROR = typeof LOADING_ERROR

interface actionLoadingStart {
  type: LOADING_START
}

interface actionLoadingEnd {
  type: LOADING_END
}

interface actionLoadingError {
  type: LOADING_ERROR
}

const actionLoadingStart = () => {
  return {
    type: LOADING_START,
    loading: true,
  }
}

const actionLoadingEnd = () => {
  return {
    type: LOADING_END,
    loading: true,
  }
}
const actionLoadingError = () => {
  return {
    type: LOADING_END,
    loading: false,
  }
}

type LoadingAction = actionLoadingStart | actionLoadingEnd | actionLoadingError

export {
  LOADING_START,
  LOADING_END,
  LOADING_ERROR,
  actionLoadingStart,
  actionLoadingEnd,
  actionLoadingError,
}