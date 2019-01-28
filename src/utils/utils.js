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

export {
  log as default,
  errorMessage,
  resetForm,
}