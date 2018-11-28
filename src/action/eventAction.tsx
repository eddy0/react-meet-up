import { ActionType, IEvent, Action } from '../model/model'

const actionCreateEvent = (event: IEvent):Action<IEvent> => {
  return {
    type: ActionType.ADD_TODO,
    event: event,
  }
}

const actionUpdateEvent = (event: IEvent): Action<IEvent> => {
  return  {
    type: ActionType.UPDATE_EVENT,
    event: event,
  }
}

const actionDeleteEvent = (id:string): Action<string> => {
  return {
    type: ActionType.DELETE_EVENT,
    id: id
  }
}


export { actionCreateEvent, actionUpdateEvent, actionDeleteEvent}
