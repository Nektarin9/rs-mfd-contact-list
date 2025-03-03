import {combineReducers, createStore, applyMiddleware, Store} from 'redux';
import { thunk } from 'redux-thunk';
import {appReducer, AppReducerType} from './appReducer/appReducer';

export interface ReducerState {
    appReducer: AppReducerType
}

const rootReducer = combineReducers<RootState>({
    appReducer: appReducer,
});

export const store: Store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export type RootState = ReturnType<typeof store.getState>;
