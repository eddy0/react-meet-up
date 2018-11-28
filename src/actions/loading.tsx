const LOADING_START = 'LOADING_START'
type LOADING_START = typeof LOADING_START

const LOADING_END = 'LOADING_END'
type LOADING_END = typeof LOADING_END

const LOADING_ERROR = 'LOADING_ERROR'
type LOADING_ERROR = typeof LOADING_ERROR

interface actionLoadingStart  {
    type: LOADING_START
}

interface actionLoadingEnd {
  type: LOADING_END
}

interface actionLoadingError  {
  type: LOADING_ERROR
}

const handleLoadingStart = () => {
  return {
    type: LOADING_START,
    loading: true,
  }
}

const handleLoadingEnd = () => {
  return {
    type: LOADING_START,
    loading: true,
  }
}
const handleLoadingError = () => {
  return {
    type: LOADING_START,
    loading: false,
  }
}

type LoadingAction = actionLoadingStart | actionLoadingEnd | actionLoadingError

export {
  LoadingAction,
  LOADING_START,
  LOADING_END,
  LOADING_ERROR,
  handleLoadingStart,
  handleLoadingEnd,
  handleLoadingError,
}