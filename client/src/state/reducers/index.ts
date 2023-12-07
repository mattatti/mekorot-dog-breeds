import {combineReducers} from "redux";
import dogReducer from '../reducers/dog.ts'

const rootReducer = combineReducers({
    dog: dogReducer,
});

export default rootReducer

export type IRootState = ReturnType<typeof rootReducer>;
