import { SubmissionError } from 'redux-form'

const log = console.log.bind(console)

const errorMessage = (message) => {
  throw new SubmissionError({
    _error: message
  })
}

export {
  log as default,
  errorMessage,
}