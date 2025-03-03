import {ReducerState} from "src/redux/store";



export const selectContacts = (state: ReducerState) => state.appReducer.contacts;
export const selectContact  = (state: ReducerState) => state.appReducer.contact;
export const selectGroupContacts  = (state: ReducerState) => state.appReducer.groupContacts;
export const selectGroupContact  = (state: ReducerState) => state.appReducer.groupContact;
