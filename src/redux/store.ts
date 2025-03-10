import { configureStore } from '@reduxjs/toolkit';
import { contactSlice } from "src/redux/contactSlice/contactSlice";
import { contactApi } from "src/api/apiContacts";

export const store = configureStore({
    reducer: {
        /* Слайсы формы */
        contact: contactSlice.reducer,
        /* Запросы на сервер с формы */
        [contactApi.reducerPath]: contactApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false }).concat(
            contactApi.middleware,
        );
    },
});

export type RootState = ReturnType<typeof store.getState>;
