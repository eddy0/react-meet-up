import { ActionType, IEvent, Action } from '../model/model'

function handleActionFetchEvent(events: IEvent[]) {
  return (dispatch: Function, getState: Function) => {
    dispatch(actionFetchEvent(events))
  }
}

const actionFetchEvent = (events:IEvent[]): Action<IEvent[]> => {
  return {
    type: ActionType.FETCH_EVENT,
    payload: events
  }
}

const actionCreateEvent = (event: IEvent):Action<IEvent> => {
  return {
    type: ActionType.ADD_TODO,
    payload: event,
  }
}

const actionUpdateEvent = (event: IEvent): Action<IEvent> => {
  return  {
    type: ActionType.UPDATE_EVENT,
    payload: event,
  }
}

const actionDeleteEvent = (id:string): Action<string> => {
  return {
    type: ActionType.DELETE_EVENT,
    payload: id
  }
}


export {handleActionFetchEvent, actionFetchEvent, actionCreateEvent, actionUpdateEvent, actionDeleteEvent}
