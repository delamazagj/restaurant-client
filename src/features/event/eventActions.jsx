import { toastr } from 'react-redux-toastr'
import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENT } from './eventConstants'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions'
import { fetchSampleData } from '../../app/data/mockApi'
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION, WSAEINTR } from 'constants';







export const callHelp = (table) => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        table[0].help = true

        try{
            await firestore.update(`TableStatus/${table[0].id}`, table[0]);
            toastr.success('Success!', 'Help Called!')
        } catch (error) {
            toastr.error('Oops', 'Something went wrong')
        }
    }
}

export const callRefill = (table) => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        table[0].refill = true

        try{
            await firestore.update(`TableStatus/${table[0].id}`, table[0]);
            toastr.success('Success!', 'Waitstaff are notified!')
        } catch (error) {
            toastr.error('Oops', 'Something went wrong')
        }
    }
}

export const makeActive = (table) => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        table[0].active = true

        try{
            await firestore.update(`TableStatus/${table[0].id}`, table[0]);
            
        } catch (error) {
            toastr.error('Oops', 'Something went wrong')
        }
    }
}



export const fetchEvents = (events) => {
    return {
        type: FETCH_EVENT,
        payload : events
    }
}



export const createEvent = (event) => {
    return async dispatch => {
        try{
            dispatch({
                type: CREATE_EVENT,
                payload: {
                     event
                }
            })
            toastr.success('Success!', 'Item added to Cart!')
        } catch (error) {
            toastr.error('Oops', 'Something went wrong')
        }
    }
}

export const addToBill = (items, bills) => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        console.log(bills)
        
        bills.items = bills.items.concat(items)
        //console.log("new new bill", newBill)
        try{
           await firestore.update(`ActiveBill/${bills.id}`, bills);
            
        } catch (error) {
            console.log('error', error)
           // console.log("State of newBill", newBill)
            toastr.error('Oops', 'Something went wrong')
        }
    }
}

export const submitOrder = (events, notes) => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        console.log("notes before launch", notes)
        const newOrder = {
            TableID: 1,
            ready: false,
            orderNotes: notes,
            items: events
        }
        try{
            await firestore.add(`order`, newOrder);
            toastr.success('Success!', 'Order Submitted!')
        } catch (error) {
            toastr.error('Oops', 'Something went wrong')
        }
    }
}

export const updateEvent = (event) => {
    return async dispatch => {
        try{
            dispatch({
                type: UPDATE_EVENT,
                payload: {
                     event
                }
            })
            toastr.success('Success!', 'Event has been updated')
        } catch (error) {
            toastr.error('Oops', 'Something went wrong')
        }
    }
}

export const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVENT,
        payload : {
            eventId
        }
    }
}

export const loadEvents = () => {
    return async dispatch => {
        try {
            dispatch(asyncActionStart())
            let events = await fetchSampleData()
            dispatch(fetchEvents(events))
            dispatch(asyncActionFinish())
        } catch (error){
            console.log(error)
            dispatch(asyncActionError())
        }
    } 
    
}
