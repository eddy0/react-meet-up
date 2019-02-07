import { SubmissionError, reset } from 'redux-form'

const log = console.log.bind(console)

const errorMessage = (message) => {
  throw new SubmissionError({
    _error: message
  })
}

const resetForm = (name) => {
  reset(name)
}

const objectToArray = (object) => {
    return Object.entries(object).map((e) => {
      return Object.assign({}, e[1], {id: e[0]})
    })
  }


export {
  log,
  errorMessage,
  resetForm,
  objectToArray,
}