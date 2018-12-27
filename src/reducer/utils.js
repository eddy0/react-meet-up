const createReducer = (initialState={}, mapper={}) => {
  return (state=initialState, action) => {
    let key = action.type
    if (key in mapper) {
      return mapper[key](state, action)
    } else {
      return state
    }
  }
}

export default createReducer

