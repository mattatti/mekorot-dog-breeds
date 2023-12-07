import {configureStore} from '@reduxjs/toolkit'
import dogReducer from '../state/reducers/dog.ts'
import rootReducer from '../state/reducers'

export default configureStore({
    reducer: {
        rootReducer,
        dog: dogReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        //serializableCheck: false,
    })
})


