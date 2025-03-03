import {backendApiAxios} from "src/api/axiosConfig";
import {AxiosResponse} from "axios";
import {CONTACTS, GROUP_CONTACTS} from "src/api/path";


export interface ApiGetContactsType {
    id: string;
    address: string;
    birthday: string;
    name: string;
    phone: string;
    photo: string;
    isFavorit: boolean;
}
export interface ApiGetGroupContactsType {
    id: string;
    name: string;
    address: string;
    description: string;
    photo: string;
    contactIds: string[];
}

export class ApiContacts {
    public static getContacts() : Promise<AxiosResponse<ApiGetContactsType[]>> {
        return backendApiAxios.get(CONTACTS);
    }
    public static getContact(id: string) : Promise<AxiosResponse<ApiGetContactsType>> {
        return backendApiAxios.get(`${CONTACTS}/${id}`);
    }
    public static getGroupContacts() : Promise<AxiosResponse<ApiGetGroupContactsType[]>> {
        return backendApiAxios.get(GROUP_CONTACTS);
    }
    public static getGroupContact(id: string) : Promise<AxiosResponse<ApiGetGroupContactsType>> {
        return backendApiAxios.get(`${GROUP_CONTACTS}/${id}`);
    }
    public static updateFavoriteContacts(isFavorit: boolean, id: string) : Promise<AxiosResponse<ApiGetContactsType>> {
        return backendApiAxios.patch(`${CONTACTS}/${id}`, {isFavorit});
    }

}