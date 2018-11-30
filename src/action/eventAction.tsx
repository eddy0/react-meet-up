import { ActionType, IEvent, Action } from '../model/model'


// 这个函数返回的是 Action 类型, 其中的 payload 是 Ievent 类型的数组
const actionFetchEvent = (events:IEvent[]): Action<IEvent[]> => {
  return {
    type: ActionType.FETCH_EVENT,
    payload: events
  }
}

const actionCreateEvent = (event: IEvent):Action<IEvent> => {
  return {
    type: ActionType.CREATE_EVENT,
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





export { actionFetchEvent, actionCreateEvent, actionUpdateEvent, actionDeleteEvent}
