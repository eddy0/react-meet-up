import { fetchEvent } from '../utils/DATA';
import { actionFetchEvent } from './eventAction';
import { actionLoadingStart, actionLoadingEnd } from './loadingAction';
import { IEvent } from '../model/model'


function handleActionFetchEvent() {
  return (dispatch: Function, getState: Function) => {
    dispatch(actionLoadingStart())
    fetchEvent().then((events:IEvent[]) => {
      dispatch(actionFetchEvent(events))
      dispatch(actionLoadingEnd())
    })
  }
}

export {
  handleActionFetchEvent,
}