import { makeAutoObservable, action } from "mobx";
import { ApiContacts, ApiGetContactsType, ApiGetGroupContactsType } from "src/api/apiContacts";

interface AppStoreType {
    contacts: ApiGetContactsType[];
    contact: ApiGetContactsType | null;
    groupContacts: ApiGetGroupContactsType[];
    groupContact: ApiGetGroupContactsType | null;
    setContacts: () => Promise<void>;
    setGroupContacts: () => Promise<void>;
    setContactById: (id: string) => Promise<void>;
    setGroupContactsById: (id: string) => Promise<void>;
    updateFavoriteContacts: (isFavorit: boolean, id: string) => Promise<void>;
}

const appStore: AppStoreType = {
    contacts: [],
    contact: null,
    groupContacts: [],
    groupContact: null,

    setContacts: action(async () => {
        try {
            const response = await ApiContacts.getContacts();
            appStore.contacts = response.data;
        } catch (error) {
            console.error(error);
        }
    }),
    setGroupContacts: action(async () => {
        try {
            const response = await ApiContacts.getGroupContacts();
            appStore.groupContacts = response.data;
        }
        catch (error) {
            console.error(error);
        }
    }),

    setContactById: action(async (id: string) => {
        try {
            const response = await ApiContacts.getContactById(id)
            appStore.contact = response.data;
        }
        catch (error) {
            console.error(error);
        }
    }),

    setGroupContactsById: action(async (id: string) => {
        try {
            const response = await ApiContacts.getGroupContactById(id)
            appStore.groupContact = response.data;
        }
        catch (error) {
            console.error(error);
        }
    }),
    updateFavoriteContacts: action(async (isFavorit: boolean, id: string) => {
        try {
            const response = await ApiContacts.patchFavoriteContacts(isFavorit, id)
            appStore.contacts = appStore.contacts.map(item => {
                if (item.id === id) {
                    return { ...item, isFavorit: response.data.isFavorit };
                }
                return item;
            });
        }
        catch (error) {
            console.error(error);
        }
    })
};

makeAutoObservable(appStore);
export default appStore;