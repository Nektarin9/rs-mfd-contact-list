import {CONTACTS, GROUP_CONTACTS} from "src/api/path";
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


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


export const contactApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: window.config?.api?.backendApi}),
    reducerPath: 'contactApi',
    tagTypes: ['Contact'],
    endpoints: (build) => ({
        //Получаем контакты
        getContacts: build.query<ApiGetContactsType[], void>({
            query: () => CONTACTS,
            providesTags: ['Contact'],
        }),
        getContact: build.query<ApiGetContactsType, string>({
            query: (id) => `${CONTACTS}/${id}`,
            providesTags: ['Contact'],
        }),
        getGroupContacts: build.query<ApiGetGroupContactsType[], void>({
            query: () => GROUP_CONTACTS,
            providesTags: ['Contact'],
        }),
        getGroupContact: build.query<ApiGetGroupContactsType, string>({
            query: (id) => `${GROUP_CONTACTS}/${id}`,
            providesTags: ['Contact'],
        }),

        // Изменяем контакты
        changeFavorit: build.mutation<ApiGetContactsType, Partial<{id: string | number; data: { isFavorit: boolean}}>>({
            query: ({id, data}) => ({
                url: `${CONTACTS}/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Contact'],
        }),
    }),
});

export const {
    useGetContactsQuery,
    useGetContactQuery,
    useGetGroupContactsQuery,
    useGetGroupContactQuery,
    useChangeFavoritMutation,
} = contactApi;
