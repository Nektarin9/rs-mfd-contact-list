import {RootState} from "src/redux/store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppAction} from "src/redux/appReducer/appAction";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppAction>;


export type AppDispatch = ThunkDispatch<RootState, unknown, AppAction>;