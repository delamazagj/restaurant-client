import { createReducer } from '../../app/common/util/reducerUtil'
import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENT } from './eventConstants'

const initialState = []

export const createEvent = (state, payload) => {
      return [...state, Object.assign({}, payload.event)]
  }



export const updateEvent = (state, payload) => {
    return [...state.filter(event => event.id !== payload.event.id), //filters out current id, then we emplace new version of current id
            Object.assign({}, payload.event) //passing back in new version of id here 
    ]
}

export const deleteEvent = (state, payload) => {
    return [...state.filter(event => event.id !== payload.eventId)]
}

export const fetchEvents = (state, payload) =>{
  return payload.events
}


export default createReducer(initialState, {
    [CREATE_EVENT] : createEvent,
    [UPDATE_EVENT] : updateEvent,
    [DELETE_EVENT] : deleteEvent,
    [FETCH_EVENT] : fetchEvents
})
