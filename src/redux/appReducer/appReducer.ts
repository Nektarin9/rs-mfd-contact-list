import {GET_CONTACT, GET_CONTACTS, GET_GROUP_CONTACT, GET_GROUP_CONTACTS} from '../actionType';
import {ApiGetContactsType, ApiGetGroupContactsType} from "src/api/apiContacts";
import {AppAction} from "src/redux/appReducer/appAction";

export interface AppReducerType {
    contacts: ApiGetContactsType[]
    contact: ApiGetContactsType | null
    groupContacts: ApiGetGroupContactsType[]
    groupContact: ApiGetGroupContactsType | null
}

// Начальное состояние
const initialState: AppReducerType = {
    contacts: [],
    contact: null,
    groupContacts: [],
    groupContact: null,
};

export const appReducer = (state = initialState, action: AppAction): AppReducerType => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
            };
        case GET_CONTACT:
            return {
                ...state,
                contact: action.payload,
            };
        case GET_GROUP_CONTACTS:
            return {
                ...state,
                groupContacts: action.payload,
            };
        case GET_GROUP_CONTACT:
            return {
                ...state,
                groupContact: action.payload,
            };
        default:
            return state;
    }
};