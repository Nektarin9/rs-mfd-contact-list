import {GET_CONTACT, GET_CONTACTS, GET_GROUP_CONTACT, GET_GROUP_CONTACTS} from "src/redux/actionType";
import {ApiContacts, ApiGetContactsType, ApiGetGroupContactsType} from "src/api/apiContacts";
import {ReducerState} from "src/redux/store";
import {AppDispatch, AppThunk} from "src/redux/appReducer/type";


// Определяем интерфейсы для действий
interface GetContactsAction {
    type: typeof GET_CONTACTS;
    payload: ApiGetContactsType[];
}

interface GetContactAction {
    type: typeof GET_CONTACT;
    payload: ApiGetContactsType | null;
}

interface GetGroupContactsAction {
    type: typeof GET_GROUP_CONTACTS;
    payload: ApiGetGroupContactsType[];
}

interface GetGroupContactAction {
    type: typeof GET_GROUP_CONTACT;
    payload: ApiGetGroupContactsType | null;
}


export type AppAction =
    | GetContactsAction
    | GetContactAction
    | GetGroupContactsAction
    | GetGroupContactAction

// Получаем контактs
export const actionGetContacts = (data: ApiGetContactsType[]): GetContactsAction => {
    return {
        type: GET_CONTACTS,
        payload: data
    };
};
// Получаем контакт
export const actionGetContact = (data: ApiGetContactsType): GetContactAction => {
    return {
        type: GET_CONTACT,
        payload: data
    };
};
// Получаем все группы контактов
export const actionGroupContacts = (data: ApiGetGroupContactsType[]): GetGroupContactsAction => {
    return {
        type: GET_GROUP_CONTACTS,
        payload: data
    };
};
// Получаем одну группу контактов
export const actionGroupContact = (data: ApiGetGroupContactsType): GetGroupContactAction => {
    return {
        type: GET_GROUP_CONTACT,
        payload: data
    };
};


export const getContacts = (): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await ApiContacts.getContacts();
            dispatch(actionGetContacts(response.data));
        } catch (e) {
            console.error("Ошибка:", e);
        }
    };
};

export const getContact = (id: string): AppThunk => {
    return async (dispatch: AppDispatch)  => {
        try {
            const response = await ApiContacts.getContact(id);
            dispatch(actionGetContact(response.data));
        } catch (e) {
            console.error("Ошибка:", e);
        }
    };
};

export const getGroupContacts = (): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await ApiContacts.getGroupContacts();
            dispatch(actionGroupContacts(response.data));
        } catch (e) {
            console.error("Ошибка:", e);
        }
    };
};

export const getGroupContact = (id : string): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await ApiContacts.getGroupContact(id);
            dispatch(actionGroupContact(response.data));
        } catch (e) {
            console.error("Ошибка:", e);
        }
    };
};


export const updateFavoriteContact = (isFavorit: boolean, id: string): AppThunk => {
    return async (dispatch: AppDispatch, getState: () => ReducerState) => {
        try {
            const contacts = getState().appReducer.contacts;
            const response = await ApiContacts.updateFavoriteContacts(isFavorit, id);
            contacts.forEach((item) => {
                if (item.id === id) {
                    item.isFavorit = response.data.isFavorit;
                }
            })
            dispatch(actionGetContact(response.data))
            console.log(response.data);
        } catch (e) {
            console.error("Ошибка:", e);
        }
    };
};