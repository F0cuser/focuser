import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './reducers/modal'
import urlsReducer from './reducers/urls'

const store = configureStore({
    reducer: {
      modal: modalReducer,
      urls: urlsReducer
    },
  })
  
export type RootState = ReturnType<typeof store.getState>

export default store

